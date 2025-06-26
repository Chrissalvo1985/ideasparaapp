const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Rate limiting simple (en producción usar redis o algo más robusto)
const rateLimitMap = new Map();

const rateLimit = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  const windowTime = 60 * 1000; // 1 minuto
  const maxRequests = 20; // 20 requests por minuto
  
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, []);
  }
  
  const requests = rateLimitMap.get(ip);
  const recentRequests = requests.filter(time => now - time < windowTime);
  
  if (recentRequests.length >= maxRequests) {
    return res.status(429).json({ error: 'Demasiadas peticiones. Intenta en un minuto.' });
  }
  
  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);
  
  next();
};

// Endpoint para chat
app.post('/api/chat', rateLimit, async (req, res) => {
  try {
    const { messages, apiKey, settings = {} } = req.body;
    
    if (!apiKey) {
      return res.status(400).json({ error: 'API key requerida' });
    }
    
    // Validar formato de API key
    if (!apiKey.startsWith('sk-')) {
      return res.status(400).json({ error: 'API key inválida. Debe empezar con "sk-"' });
    }
    
    if (apiKey.length < 45) {
      return res.status(400).json({ error: 'API key muy corta. Debe tener ~50+ caracteres' });
    }
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Mensajes requeridos' });
    }
    
    // Validar estructura de mensajes
    const validMessages = messages.every(msg => 
      msg.role && msg.content && ['user', 'assistant', 'system'].includes(msg.role)
    );
    
    if (!validMessages) {
      return res.status(400).json({ error: 'Formato de mensajes inválido' });
    }
    
    const openai = new OpenAI({
      apiKey: apiKey
    });
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages,
      temperature: settings.temperature || 0.7,
      max_tokens: settings.maxTokens || 1000,
    });
    
    const response = completion.choices[0]?.message?.content;
    
    if (!response) {
      return res.status(500).json({ error: 'No se pudo generar respuesta' });
    }
    
    res.json({ 
      response,
      usage: completion.usage
    });
    
  } catch (error) {
    console.error('Error en chat:', error);
    
    if (error.code === 'invalid_api_key') {
      return res.status(401).json({ 
        error: 'API key inválida. Verifica tu key en https://platform.openai.com/api-keys' 
      });
    }
    
    if (error.code === 'insufficient_quota') {
      return res.status(402).json({ 
        error: 'Cuota de OpenAI agotada. Revisa tu plan en https://platform.openai.com/usage' 
      });
    }
    
    if (error.code === 'rate_limit_exceeded') {
      return res.status(429).json({ error: 'Límite de rate de OpenAI excedido' });
    }
    
    // Error de autenticación genérico
    if (error.status === 401) {
      return res.status(401).json({ 
        error: 'Credenciales inválidas. Verifica tu API key de OpenAI.' 
      });
    }
    
    res.status(500).json({ 
      error: 'Error interno del servidor',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Endpoint para embeddings
app.post('/api/embeddings', rateLimit, async (req, res) => {
  try {
    const { text, apiKey } = req.body;
    
    if (!apiKey) {
      return res.status(400).json({ error: 'API key requerida' });
    }
    
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Texto requerido' });
    }
    
    const openai = new OpenAI({
      apiKey: apiKey
    });
    
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });
    
    res.json({ 
      embedding: response.data[0].embedding,
      usage: response.usage
    });
    
  } catch (error) {
    console.error('Error en embeddings:', error);
    
    if (error.code === 'invalid_api_key') {
      return res.status(401).json({ error: 'API key inválida' });
    }
    
    res.status(500).json({ 
      error: 'Error interno del servidor',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🤖 ConciencIA Backend ejecutándose en puerto ${PORT}`);
  console.log(`🌍 CORS habilitado para: http://localhost:5173, http://localhost:3000`);
}); 