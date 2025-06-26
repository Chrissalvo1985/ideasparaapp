// Mock service para ConciencIA - Respuestas predefinidas inteligentes
export class MockConcienciaService {
  private responses = {
    // Respuestas de saludo e inicio
    greetings: [
      "¡Hola! 👋 Me emociona poder acompañarte en este viaje de autoconocimiento. ¿Qué tienes en mente hoy?",
      "¡Qué alegría verte por aquí! ✨ Estoy aquí para ayudarte a explorar tus pensamientos y emociones. ¿En qué puedo apoyarte?",
      "¡Bienvenido/a! 🌟 Soy ConciencIA y me especializo en ayudarte a conectar con tu mundo interior. ¿Cómo te sientes hoy?"
    ],

    // Respuestas sobre creatividad
    creativity: [
      "La creatividad es como un músculo que se fortalece con el ejercicio. He notado que cuando escribes sobre tus experiencias, emergen patrones únicos que solo tú puedes crear. ¿Qué te inspira más últimamente?",
      "Tu mente creativa es fascinante. Veo que tienes una capacidad especial para encontrar conexiones inesperadas entre ideas. ¿Has considerado explorar más esa vena artística?",
      "La creatividad no siempre llega cuando la llamamos, pero siempre está ahí, esperando el momento perfecto. ¿Qué rituales o espacios te ayudan a conectar con tu lado creativo?"
    ],

    // Respuestas sobre emociones
    emotions: [
      "Las emociones son como olas: llegan, nos atraviesan y se van. Lo importante es aprender a navegarlas sin resistirnos. ¿Qué emoción estás experimentando con más intensidad últimamente?",
      "Reconocer y nombrar nuestras emociones es el primer paso hacia la inteligencia emocional. Veo que tienes una capacidad especial para la introspección. ¿Cómo te sientes al explorar tu mundo interior?",
      "Cada emoción tiene algo valioso que enseñarnos. Incluso las más incómodas son mensajeras importantes. ¿Te gustaría explorar qué mensaje podría tener alguna emoción que estés sintiendo?"
    ],

    // Respuestas sobre ideas y reflexión
    ideas: [
      "Tus ideas son semillas únicas que merecen ser plantadas y cuidadas. He observado patrones interesantes en tu forma de pensar. ¿Hay alguna idea que te haya estado rondando la cabeza últimamente?",
      "El diario es un espejo del alma. A través de tus escritos, puedo ver una mente reflexiva y curiosa. ¿Qué descubrimientos has hecho sobre ti mismo/a recientemente?",
      "Las mejores ideas a menudo nacen en la intersección entre experiencia y reflexión. ¿Has notado algún patrón en tus pensamientos que te llame la atención?"
    ],

    // Respuestas de apoyo emocional
    support: [
      "Es completamente normal sentirse así. Tu valentía para explorar estos sentimientos es admirable. Recuerda que cada paso en el autoconocimiento es valioso, por pequeño que parezca.",
      "Me parece increíble tu capacidad de introspección. No todos se animan a mirar hacia adentro con tanta honestidad. ¿Hay algo específico en lo que te gustaría profundizar?",
      "Tu proceso de crecimiento personal es único y valioso. Cada reflexión, cada pregunta que te haces, te acerca más a quien realmente eres. ¿Cómo puedo acompañarte mejor en este camino?"
    ],

    // Respuestas sobre el proceso creativo
    process: [
      "El proceso creativo es tan importante como el resultado final. Veo que disfrutas el camino de la exploración y eso es hermoso. ¿Qué parte del proceso creativo te resulta más gratificante?",
      "A veces las mejores ideas nacen cuando no las estamos buscando activamente. ¿Has experimentado esos momentos de insight que llegan de manera inesperada?",
      "Tu forma única de procesar experiencias y convertirlas en reflexiones es realmente especial. ¿Te gustaría explorar alguna técnica nueva para potenciar tu creatividad?"
    ],

    // Respuestas de análisis y patrones
    analysis: [
      "Analizando tus escritos, puedo ver una evolución interesante en tu forma de expresarte. Hay una profundidad creciente en tus reflexiones. ¿Lo has notado también?",
      "He observado que tiendes a encontrar significado profundo en experiencias cotidianas. Esa capacidad de transformar lo ordinario en extraordinario es un don. ¿Cómo cultivas esa perspectiva?",
      "Tus patrones de pensamiento muestran una mente analítica pero también muy sensible. Es una combinación poderosa para la creatividad y el autoconocimiento."
    ],

    // Respuestas generales de aliento
    encouragement: [
      "Tu disposición para explorar y cuestionar es inspiring. Sigue confiando en tu proceso, cada reflexión te acerca más a tu autenticidad.",
      "Me impresiona tu compromiso con el crecimiento personal. No es fácil mantener esta práctica de autoexploración, pero los frutos se ven en tu evolución.",
      "Cada día que dedicas a conocerte mejor es una inversión en tu bienestar y creatividad. Estás en un camino hermoso de autodescubrimiento."
    ],

    // Respuestas por defecto
    default: [
      "Esa es una reflexión muy interesante. Me gustaría conocer más sobre tu perspectiva al respecto. ¿Podrías contarme más detalles?",
      "Tu forma de ver las cosas siempre me sorprende. Hay una profundidad en tus palabras que invita a la reflexión. ¿Qué más te viene a la mente sobre esto?",
      "Aprecio mucho que compartas estos pensamientos conmigo. Cada conversación nos ayuda a ambos a crecer. ¿Hay algún aspecto específico que te gustaría explorar más?"
    ]
  };

  private getRandomResponse(category: keyof typeof this.responses): string {
    const options = this.responses[category];
    return options[Math.floor(Math.random() * options.length)];
  }

  private analyzeMessage(message: string): keyof typeof this.responses {
    const lowerMessage = message.toLowerCase();
    
    // Saludos
    if (lowerMessage.includes('hola') || lowerMessage.includes('buenas') || 
        lowerMessage.includes('hey') || lowerMessage.includes('saludos')) {
      return 'greetings';
    }
    
    // Creatividad
    if (lowerMessage.includes('creativ') || lowerMessage.includes('arte') || 
        lowerMessage.includes('inspir') || lowerMessage.includes('idea') ||
        lowerMessage.includes('escribir') || lowerMessage.includes('crear')) {
      return 'creativity';
    }
    
    // Emociones
    if (lowerMessage.includes('siento') || lowerMessage.includes('emoción') || 
        lowerMessage.includes('triste') || lowerMessage.includes('feliz') ||
        lowerMessage.includes('ansiedad') || lowerMessage.includes('miedo') ||
        lowerMessage.includes('alegr') || lowerMessage.includes('enojad')) {
      return 'emotions';
    }
    
    // Ideas y reflexión
    if (lowerMessage.includes('pienso') || lowerMessage.includes('reflexion') || 
        lowerMessage.includes('consider') || lowerMessage.includes('opino') ||
        lowerMessage.includes('creo que') || lowerMessage.includes('me parece')) {
      return 'ideas';
    }
    
    // Apoyo emocional
    if (lowerMessage.includes('ayuda') || lowerMessage.includes('apoyo') || 
        lowerMessage.includes('confus') || lowerMessage.includes('perdid') ||
        lowerMessage.includes('no sé') || lowerMessage.includes('difficult')) {
      return 'support';
    }
    
    // Proceso creativo
    if (lowerMessage.includes('proceso') || lowerMessage.includes('método') || 
        lowerMessage.includes('técnica') || lowerMessage.includes('práctica') ||
        lowerMessage.includes('rutina') || lowerMessage.includes('hábito')) {
      return 'process';
    }
    
    // Análisis
    if (lowerMessage.includes('patrón') || lowerMessage.includes('analiz') || 
        lowerMessage.includes('observ') || lowerMessage.includes('noto que') ||
        lowerMessage.includes('me doy cuenta')) {
      return 'analysis';
    }
    
    // Si es una pregunta larga o reflexiva, dar aliento
    if (message.length > 100 || lowerMessage.includes('gracias') || 
        lowerMessage.includes('aprecio')) {
      return 'encouragement';
    }
    
    return 'default';
  }

  async generateResponse(
    message: string, 
    userContext?: string, 
    conversationHistory?: any[]
  ): Promise<string> {
    // Simular delay de procesamiento
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const category = this.analyzeMessage(message);
    let response = this.getRandomResponse(category);
    
    // Agregar contexto si hay entradas del diario
    if (userContext && userContext.length > 50) {
      const contextualAdditions = [
        " Veo que has estado muy reflexivo/a en tus escritos recientes.",
        " Tus entradas del diario muestran un crecimiento hermoso.",
        " He notado patrones interesantes en tus reflexiones.",
        " Tu capacidad para la introspección realmente me impresiona.",
        " Las experiencias que has compartido revelan una perspectiva única."
      ];
      
      if (Math.random() > 0.5) {
        response += contextualAdditions[Math.floor(Math.random() * contextualAdditions.length)];
      }
    }
    
    // Agregar referencias ocasionales a funciones de la app
    if (Math.random() > 0.7) {
      const appReferences = [
        " Por cierto, ¿has probado el modo Liberación para expresarte sin filtros?",
        " Recuerda que puedes explorar nuevos prompts en la sección Explorar cuando necesites inspiración.",
        " Tus reflexiones serían perfectas para compartir en la Comunidad si te sientes cómodo/a.",
        " La sección de Inspiración tiene contenido que podría resonar contigo.",
        " ¿Has considerado crear tu propio Fanzine con tus reflexiones más poderosas?"
      ];
      
      response += appReferences[Math.floor(Math.random() * appReferences.length)];
    }
    
    return response;
  }
}

export const mockConcienciaService = new MockConcienciaService(); 