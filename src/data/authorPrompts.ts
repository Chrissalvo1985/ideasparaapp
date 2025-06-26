import type { AuthorPrompt } from '../types/index';

export const authorPrompts: AuthorPrompt[] = [
  // Galletas de la Fortuna Creativas
  {
    id: 'fortune_001',
    title: 'Galleta de la Fortuna Personal',
    content: 'Escribe una galleta de la fortuna para tu yo del futuro. ¿Qué mensaje necesitarías escuchar en 6 meses?',
    type: 'fortune_cookie',
    category: 'Autoconocimiento',
    difficulty: 'easy',
    estimatedTime: '5 min',
    tags: ['futuro', 'autoconocimiento', 'esperanza'],
    isActive: true,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'fortune_002',
    title: 'Galleta de la Fortuna para un Extraño',
    content: 'Imagina que puedes enviar una galleta de la fortuna a alguien que nunca conocerás. ¿Qué sabiduría le compartirías?',
    type: 'fortune_cookie',
    category: 'Empatía',
    difficulty: 'easy',
    estimatedTime: '5 min',
    tags: ['empatía', 'sabiduría', 'conexión'],
    isActive: true,
    createdAt: new Date('2024-01-02')
  },
  {
    id: 'fortune_003',
    title: 'Galleta de la Fortuna del Corazón Roto',
    content: 'Escribe una galleta de la fortuna que hubieras querido recibir en tu momento más difícil. Que sea sanadora.',
    type: 'fortune_cookie',
    category: 'Sanación',
    difficulty: 'medium',
    estimatedTime: '10 min',
    tags: ['sanación', 'dolor', 'esperanza', 'fortaleza'],
    isActive: true,
    createdAt: new Date('2024-01-03')
  },

  // Chispas Creativas
  {
    id: 'spark_001',
    title: 'El Objeto Mágico',
    content: 'Describe un objeto común de tu casa como si fuera mágico. ¿Qué poderes secretos tiene? ¿Cómo cambiaría tu día?',
    type: 'creative_spark',
    category: 'Imaginación',
    difficulty: 'easy',
    estimatedTime: '10 min',
    tags: ['magia', 'imaginación', 'cotidiano'],
    isActive: true,
    createdAt: new Date('2024-01-04')
  },
  {
    id: 'spark_002',
    title: 'Conversación con tu Planta',
    content: 'Si las plantas pudieran hablar, ¿qué te diría esa que tienes en casa? Escribe el diálogo completo.',
    type: 'creative_spark',
    category: 'Naturaleza',
    difficulty: 'medium',
    estimatedTime: '15 min',
    tags: ['naturaleza', 'diálogo', 'perspectiva'],
    isActive: true,
    createdAt: new Date('2024-01-05')
  },

  // Reflexiones Diarias
  {
    id: 'reflect_001',
    title: 'Tu Superpoder Secreto',
    content: 'Hoy descubriste que tienes un superpoder, pero solo funciona cuando nadie te ve. ¿Cuál es y cómo lo usarías?',
    type: 'daily_reflection',
    category: 'Autodescubrimiento',
    difficulty: 'medium',
    estimatedTime: '10 min',
    tags: ['superpoderes', 'secretos', 'autodescubrimiento'],
    isActive: true,
    createdAt: new Date('2024-01-06')
  },
  {
    id: 'reflect_002',
    title: 'La Pregunta del Espejo',
    content: 'Esta mañana tu reflejo en el espejo te hace una pregunta inesperada. ¿Qué te pregunta y cómo respondes?',
    type: 'daily_reflection',
    category: 'Introspección',
    difficulty: 'medium',
    estimatedTime: '15 min',
    tags: ['introspección', 'preguntas', 'autoconocimiento'],
    isActive: true,
    createdAt: new Date('2024-01-07')
  },

  // Iniciadores de Historia
  {
    id: 'story_001',
    title: 'El Mensaje en el Café',
    content: 'Al fondo de tu taza de café aparece un mensaje escrito en los granos. No está en ningún idioma que conozcas, pero de alguna manera lo entiendes...',
    type: 'story_starter',
    category: 'Misterio',
    difficulty: 'hard',
    estimatedTime: '20 min',
    tags: ['misterio', 'mensajes', 'café', 'historia'],
    isActive: true,
    createdAt: new Date('2024-01-08')
  },
  {
    id: 'story_002',
    title: 'La Librería de Medianoche',
    content: 'Hay una librería que solo aparece a medianoche y vende libros que aún no han sido escritos. Esta noche decides entrar...',
    type: 'story_starter',
    category: 'Fantasía',
    difficulty: 'hard',
    estimatedTime: '25 min',
    tags: ['fantasía', 'libros', 'medianoche', 'misterio'],
    isActive: true,
    createdAt: new Date('2024-01-09')
  },

  // Exploradores de Emociones
  {
    id: 'emotion_001',
    title: 'El Color de la Nostalgia',
    content: 'Si la nostalgia fuera un color, ¿cuál sería el tuyo? Describe cómo se ve, se siente y dónde vive en tu cuerpo.',
    type: 'emotion_explorer',
    category: 'Emociones',
    difficulty: 'medium',
    estimatedTime: '10 min',
    tags: ['nostalgia', 'colores', 'emociones', 'sinestesia'],
    isActive: true,
    createdAt: new Date('2024-01-10')
  },
  {
    id: 'emotion_002',
    title: 'Carta a tu Ansiedad',
    content: 'Escribe una carta a tu ansiedad como si fuera una persona. ¿Qué le dirías? ¿Qué necesitas que sepa?',
    type: 'emotion_explorer',
    category: 'Autocompasión',
    difficulty: 'hard',
    estimatedTime: '20 min',
    tags: ['ansiedad', 'autocompasión', 'carta', 'sanación'],
    isActive: true,
    createdAt: new Date('2024-01-11')
  },

  // Galletas de la Fortuna Especiales
  {
    id: 'fortune_004',
    title: 'Galleta de la Fortuna Rebelde',
    content: 'Escribe una galleta de la fortuna que rompa todas las reglas. Que sea honesta, real, tal vez un poco sarcástica.',
    type: 'fortune_cookie',
    category: 'Humor',
    difficulty: 'medium',
    estimatedTime: '5 min',
    tags: ['humor', 'rebeldía', 'honestidad', 'sarcasmo'],
    isActive: true,
    createdAt: new Date('2024-01-12')
  },
  {
    id: 'fortune_005',
    title: 'Galleta de la Fortuna Temporal',
    content: 'Esta galleta de la fortuna solo es válida por 24 horas. ¿Qué mensaje urgente contiene?',
    type: 'fortune_cookie',
    category: 'Urgencia',
    difficulty: 'medium',
    estimatedTime: '5 min',
    tags: ['urgencia', 'tiempo', 'acción', 'oportunidad'],
    isActive: true,
    createdAt: new Date('2024-01-13')
  }
];

export const getRandomAuthorPrompt = (type?: AuthorPrompt['type']): AuthorPrompt => {
  const filteredPrompts = type 
    ? authorPrompts.filter(p => p.type === type && p.isActive)
    : authorPrompts.filter(p => p.isActive);
  
  return filteredPrompts[Math.floor(Math.random() * filteredPrompts.length)];
};

export const getPromptsByCategory = (category: string): AuthorPrompt[] => {
  return authorPrompts.filter(p => p.category === category && p.isActive);
};

export const getPromptsByType = (type: AuthorPrompt['type']): AuthorPrompt[] => {
  return authorPrompts.filter(p => p.type === type && p.isActive);
};

export const getFortuneCookiePrompts = (): AuthorPrompt[] => {
  return getPromptsByType('fortune_cookie');
}; 