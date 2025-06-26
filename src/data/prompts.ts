import type { WritingPrompt } from '../types/index';

export const writingPrompts: WritingPrompt[] = [
  // Prompts de Alegría
  {
    id: 'joy1',
    text: 'Describe un momento en el que te sentiste completamente vivo/a. ¿Qué colores, sonidos y sensaciones recuerdas?',
    category: 'emotional',
    emotion: 'alegria',
    difficulty: 'easy'
  },
  {
    id: 'joy2',
    text: 'Escribe una carta de agradecimiento a tu yo de hace cinco años por todas las decisiones que te trajeron aquí.',
    category: 'creative',
    emotion: 'alegria',
    difficulty: 'medium'
  },
  {
    id: 'joy3',
    text: 'Imagina que puedes materializar tu felicidad en un objeto. ¿Cómo sería? ¿Qué poderes tendría?',
    category: 'creative',
    emotion: 'alegria',
    difficulty: 'medium'
  },

  // Prompts de Tristeza
  {
    id: 'sad1',
    text: 'Escribe sobre algo que perdiste. No necesariamente una persona, puede ser un sueño, una época, una versión de ti.',
    category: 'emotional',
    emotion: 'tristeza',
    difficulty: 'medium'
  },
  {
    id: 'sad2',
    text: 'Si tu tristeza fuera una lluvia, ¿sería torrencial o llovizna? Describe el paisaje emocional que crea.',
    category: 'creative',
    emotion: 'tristeza',
    difficulty: 'medium'
  },
  {
    id: 'sad3',
    text: 'Escribe una conversación con tu tristeza. ¿Qué te está tratando de enseñar?',
    category: 'guided',
    emotion: 'tristeza',
    difficulty: 'hard'
  },

  // Prompts de Rabia
  {
    id: 'anger1',
    text: 'Describe tu rabia como si fuera un animal. ¿Qué especie sería? ¿Cómo se mueve? ¿Qué necesita para calmarse?',
    category: 'creative',
    emotion: 'rabia',
    difficulty: 'medium'
  },
  {
    id: 'anger2',
    text: 'Escribe una carta furiosa que nunca enviarás. Deja que las palabras fluyan sin censura.',
    category: 'liberation',
    emotion: 'rabia',
    difficulty: 'easy'
  },
  {
    id: 'anger3',
    text: 'Si pudieras cambiar una injusticia en el mundo con tus palabras, ¿cuál sería y cómo lo harías?',
    category: 'emotional',
    emotion: 'rabia',
    difficulty: 'hard'
  },

  // Prompts de Nostalgia
  {
    id: 'nostalgia1',
    text: 'Escribe sobre un lugar de tu infancia. ¿Qué olores, texturas y secretos guardaba?',
    category: 'emotional',
    emotion: 'nostalgia',
    difficulty: 'easy'
  },
  {
    id: 'nostalgia2',
    text: 'Describe una canción que te transporta a otro tiempo. ¿Qué historia cuenta tu cuerpo cuando la escucha?',
    category: 'creative',
    emotion: 'nostalgia',
    difficulty: 'medium'
  },
  {
    id: 'nostalgia3',
    text: 'Escribe una carta a alguien que ya no está en tu vida, contándole quién eres ahora.',
    category: 'emotional',
    emotion: 'nostalgia',
    difficulty: 'hard'
  },

  // Prompts de Vacío
  {
    id: 'empty1',
    text: 'Describe el vacío como un espacio. ¿Es un desierto, una habitación, un océano? ¿Qué encuentras allí?',
    category: 'creative',
    emotion: 'vacio',
    difficulty: 'medium'
  },
  {
    id: 'empty2',
    text: 'Escribe sobre las cosas pequeñas que aún te conectan con la vida, aunque sean mínimas.',
    category: 'guided',
    emotion: 'vacio',
    difficulty: 'easy'
  },
  {
    id: 'empty3',
    text: 'Si tu vacío fuera un lienzo en blanco, ¿qué sería lo primero que dibujarías en él?',
    category: 'creative',
    emotion: 'vacio',
    difficulty: 'medium'
  },

  // Prompts de Ansiedad
  {
    id: 'anxiety1',
    text: 'Describe cómo se siente la ansiedad en tu cuerpo. ¿Dónde vive? ¿Cómo se mueve?',
    category: 'emotional',
    emotion: 'ansiedad',
    difficulty: 'easy'
  },
  {
    id: 'anxiety2',
    text: 'Escribe una lista de todos tus miedos sobre el futuro, luego escribe una versión alternativa donde todo sale bien.',
    category: 'guided',
    emotion: 'ansiedad',
    difficulty: 'medium'
  },
  {
    id: 'anxiety3',
    text: 'Imagina que puedes hablar con tu ansiedad como si fuera una persona preocupada. ¿Qué le dirías para calmarla?',
    category: 'guided',
    emotion: 'ansiedad',
    difficulty: 'hard'
  },

  // Prompts de Paz
  {
    id: 'peace1',
    text: 'Describe un momento de paz perfecta. ¿Dónde estabas? ¿Qué sensaciones recuerdas?',
    category: 'emotional',
    emotion: 'paz',
    difficulty: 'easy'
  },
  {
    id: 'peace2',
    text: 'Escribe una meditación personal usando solo palabras que te traigan calma.',
    category: 'creative',
    emotion: 'paz',
    difficulty: 'medium'
  },
  {
    id: 'peace3',
    text: 'Si pudieras envolver tu paz en un regalo para alguien que lo necesita, ¿cómo sería?',
    category: 'creative',
    emotion: 'paz',
    difficulty: 'medium'
  },

  // Prompts generales creativos
  {
    id: 'creative1',
    text: 'Escribe la biografía de un objeto que te acompaña todos los días.',
    category: 'creative',
    difficulty: 'easy'
  },
  {
    id: 'creative2',
    text: 'Describe un color que no existe y explica qué emociones provocaría.',
    category: 'creative',
    difficulty: 'medium'
  },
  {
    id: 'creative3',
    text: 'Imagina que puedes tener una conversación con tu reflejo en el espejo. ¿Qué se dirían?',
    category: 'creative',
    difficulty: 'medium'
  },

  // Prompts de liberación
  {
    id: 'liberation1',
    text: 'Escribe sobre algo que necesitas soltar. Dale forma con palabras y luego déjalo ir.',
    category: 'liberation',
    difficulty: 'medium'
  },
  {
    id: 'liberation2',
    text: 'Describe una versión de ti que ya no quieres ser. Agrádecele por lo que te enseñó y despídete.',
    category: 'liberation',
    difficulty: 'hard'
  },
  {
    id: 'liberation3',
    text: 'Escribe todas las palabras que no te atreves a decir en voz alta.',
    category: 'liberation',
    difficulty: 'easy'
  }
]; 