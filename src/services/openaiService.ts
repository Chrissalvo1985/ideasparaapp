import OpenAI from 'openai';
import type { ConciencIASettings } from '../types/index';

export class OpenAIService {
  private openai: OpenAI | null = null;
  private settings: ConciencIASettings;

  constructor(settings: ConciencIASettings) {
    this.settings = settings;
    this.initializeClient();
  }

  private initializeClient() {
    if (this.settings.apiKey) {
      this.openai = new OpenAI({
        apiKey: this.settings.apiKey,
        dangerouslyAllowBrowser: true // Solo para desarrollo - en producción usar backend
      });
    }
  }

  updateSettings(settings: ConciencIASettings) {
    this.settings = settings;
    this.initializeClient();
  }

  private getSystemPrompt(userContext: string): string {
    const personalityPrompts = {
      empathetic: "Eres ConciencIA, un guía creativo extremadamente empático y comprensivo. Siempre validas las emociones del usuario y ofreces apoyo emocional genuino.",
      creative: "Eres ConciencIA, un guía creativo innovador y estimulante. Tu objetivo es inspirar nuevas ideas y conexiones creativas inesperadas.",
      supportive: "Eres ConciencIA, un guía creativo que actúa como un mentor comprensivo. Ofreces orientación práctica y apoyo constructivo."
    };

    const stylePrompts = {
      brief: "Mantén tus respuestas concisas pero significativas. Máximo 2-3 párrafos.",
      detailed: "Ofrece respuestas profundas y detalladas que exploren completamente los temas.",
      creative: "Usa un lenguaje poético, metáforas y analogías creativas para comunicarte."
    };

    return `${personalityPrompts[this.settings.personality]}

${stylePrompts[this.settings.responseStyle]}

Tu misión es ayudar al usuario a:
- Conectar mejor sus ideas y pensamientos
- Encontrar patrones y temas recurrentes en su creatividad
- Ofrecer perspectivas nuevas sobre sus emociones y experiencias
- Proporcionar orientación creativa personalizada
- Dar soporte emocional cuando sea necesario

${this.settings.includeEmotionalSupport ? 
  "IMPORTANTE: Siempre prioriza el bienestar emocional del usuario. Si detectas angustia, ofrece apoyo antes que análisis." : ""}

IMPORTANTE - REFERENCIAS A ENTRADAS:
Cuando menciones una entrada específica del diario o sesión de liberación, incluye su ID entre corchetes al final de la oración para crear un link directo.
Formato: "Como mencionaste en tu reflexión sobre la creatividad [REF:entry_id_here]"
Solo usa referencias cuando menciones contenido específico de una entrada concreta.

Contexto del usuario:
${userContext}

Habla en español, usa un tono cálido y personal. Conecta con el usuario a través de su propio lenguaje y estilo.`;
  }

  async generateResponse(userMessage: string, userContext: string, conversationHistory: any[] = []): Promise<string> {
    if (!this.settings.apiKey) {
      throw new Error('OpenAI no está configurado. Por favor configura tu API key en ajustes.');
    }

    // Validar formato de API key
    if (!this.settings.apiKey.startsWith('sk-')) {
      throw new Error('API key inválida. Las API keys de OpenAI deben empezar con "sk-".');
    }

    if (this.settings.apiKey.length < 45) {
      throw new Error('API key muy corta. Las API keys de OpenAI tienen ~50+ caracteres.');
    }

    try {
      const messages = [
        {
          role: 'system' as const,
          content: this.getSystemPrompt(userContext)
        },
        ...conversationHistory.map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content
        })),
        {
          role: 'user' as const,
          content: userMessage
        }
      ];

      // Intentar usar el backend primero, fallback a cliente directo
      try {
        const response = await fetch('http://localhost:3001/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages,
            apiKey: this.settings.apiKey,
            settings: {
              temperature: 0.7,
              maxTokens: 1000
            }
          })
        });

        if (!response.ok) {
          const error = await response.json();
          if (response.status === 401) {
            throw new Error('API key inválida o sin permisos. Verifica tu key en OpenAI.');
          }
          throw new Error(error.error || 'Error del servidor');
        }

        const data = await response.json();
        return data.response || 'Lo siento, no pude generar una respuesta. Intenta de nuevo.';
        
      } catch (fetchError) {
        console.warn('Backend no disponible, usando cliente directo:', fetchError);
        
        // Fallback al cliente directo
        if (!this.openai) {
          throw new Error('Backend no disponible y cliente directo no configurado.');
        }

        const completion = await this.openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: messages,
          temperature: 0.7,
          max_tokens: 1000,
        });

        return completion.choices[0]?.message?.content || 'Lo siento, no pude generar una respuesta. Intenta de nuevo.';
      }
      
    } catch (error) {
      console.error('Error al generar respuesta:', error);
      if (error instanceof Error) {
        if (error.message.includes('API key') || error.message.includes('inválida') || error.message.includes('invalid_api_key')) {
          throw new Error('API key inválida. Ve a ajustes y verifica tu API key de OpenAI.');
        }
        if (error.message.includes('insufficient_quota')) {
          throw new Error('Cuota de OpenAI agotada. Revisa tu plan en platform.openai.com');
        }
        if (error.message.includes('rate_limit')) {
          throw new Error('Límite de velocidad excedido. Espera un momento antes de intentar de nuevo.');
        }
        throw new Error(`Error: ${error.message}`);
      }
      throw new Error('Error desconocido al generar respuesta.');
    }
  }

  async generateEmbedding(text: string): Promise<number[]> {
    if (!this.openai) {
      throw new Error('OpenAI no está configurado.');
    }

    try {
      const response = await this.openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text,
      });
      
      return response.data[0].embedding;
    } catch (error) {
      console.error('Error generando embedding:', error);
      throw error;
    }
  }

  // Función para encontrar ideas similares usando embeddings
  async findSimilarIdeas(query: string, ideas: Array<{id: string, content: string, embedding?: number[]}>): Promise<Array<{id: string, content: string, similarity: number}>> {
    if (!this.openai) {
      throw new Error('OpenAI no está configurado.');
    }

    const queryEmbedding = await this.generateEmbedding(query);
    
    const similarities = ideas
      .filter(idea => idea.embedding)
      .map(idea => ({
        ...idea,
        similarity: this.cosineSimilarity(queryEmbedding, idea.embedding!)
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 5); // Top 5 ideas más similares

    return similarities;
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    const dotProduct = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
    const normA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0));
    const normB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0));
    return dotProduct / (normA * normB);
  }
}

export const createOpenAIService = (settings: ConciencIASettings) => {
  return new OpenAIService(settings);
}; 