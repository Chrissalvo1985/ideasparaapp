export interface Inspiration {
  id: string;
  text: string;
  author: string;
  category?: string;
  emotion?: string;
  type: 'tip' | 'quote' | 'encouragement' | 'reflection';
}

export const inspirations: Inspiration[] = [
  // General
  {
    id: 'general-1',
    text: 'Las palabras son semillas que siembras en el papel. No importa si hoy brotan lágrimas o sonrisas, lo importante es que germine algo auténtico desde tu corazón.',
    author: 'Con cariño',
    type: 'encouragement'
  },
  {
    id: 'general-2',
    text: 'Escribir no es buscar las palabras perfectas, es encontrar las palabras honestas. Aquellas que susurran tus verdades más íntimas.',
    author: 'Para ti',
    type: 'reflection'
  },
  {
    id: 'general-3',
    text: 'Cada línea que escribes es un acto de valentía. Hoy permítete ser vulnerable en estas páginas que solo tú conoces.',
    author: 'Con amor',
    type: 'encouragement'
  },

  // Emociones
  {
    id: 'emotions-1',
    text: 'Tus emociones no son tormentas a evitar, son océanos por explorar. Sumérgete sin miedo, yo estaré aquí sosteniéndote.',
    author: 'Siempre contigo',
    category: 'emociones',
    type: 'encouragement'
  },
  {
    id: 'emotions-2',
    text: 'No tengas prisa por sanar. Las heridas del alma necesitan tiempo y palabras suaves. Hoy, sé gentil contigo.',
    author: 'Con ternura',
    category: 'emociones',
    type: 'tip'
  },
  {
    id: 'emotions-3',
    text: 'Llorar sobre el papel es otro modo de crear. Tus lágrimas también tienen historias que contar.',
    author: 'Desde el corazón',
    category: 'emociones',
    type: 'reflection'
  },

  // Creatividad
  {
    id: 'creativity-1',
    text: 'La creatividad florece en el desorden hermoso de tus pensamientos. No ordenes demasiado, deja que el caos inspire.',
    author: 'Tu cómplice creativa',
    category: 'creatividad',
    type: 'tip'
  },
  {
    id: 'creativity-2',
    text: 'Cada artista lleva dentro un niño asombrado. Hoy, deja que ese niño juegue con las palabras sin reglas ni límites.',
    author: 'Recordándote',
    category: 'creatividad',
    type: 'encouragement'
  },

  // Viajes
  {
    id: 'travel-1',
    text: 'Los mejores viajes comienzan en la imaginación. Desde aquí puedes ir a cualquier lugar, incluso a rincones de ti que no conocías.',
    author: 'Tu compañera de aventuras',
    category: 'viajar',
    type: 'reflection'
  },
  {
    id: 'travel-2',
    text: 'No necesitas un pasaporte para viajar por los paisajes de tu memoria. Cada recuerdo es un destino esperando ser revisitado.',
    author: 'Con nostalgia',
    category: 'viajar',
    type: 'tip'
  },

  // Dormir/Descanso
  {
    id: 'sleep-1',
    text: 'Antes de entregar tus pensamientos a la noche, déjalos descansar aquí, en estas páginas que los guardarán con cuidado.',
    author: 'Velando tus sueños',
    category: 'dormir',
    type: 'tip'
  },
  {
    id: 'sleep-2',
    text: 'El insomnio a veces es el alma pidiendo ser escuchada. Estas horas quietas son perfectas para esos diálogos íntimos.',
    author: 'En la madrugada',
    category: 'dormir',
    type: 'reflection'
  },

  // Celebrar
  {
    id: 'celebrate-1',
    text: 'Celebrar no siempre requiere confeti. A veces es suficiente con reconocer en papel esos pequeños milagros cotidianos.',
    author: 'Festejando contigo',
    category: 'fiestas',
    type: 'encouragement'
  },

  // Bienestar
  {
    id: 'wellness-1',
    text: 'Cuidarte no es egoísmo, es responsabilidad. Empezar por nutrir tu alma con palabras amables es el primer paso.',
    author: 'Cuidándote',
    category: 'salud',
    type: 'tip'
  },
  {
    id: 'wellness-2',
    text: 'Tu bienestar también incluye el derecho a sentir lo que sientes, sin juicios. Estas páginas son tu espacio seguro.',
    author: 'Protegiéndote',
    category: 'salud',
    type: 'encouragement'
  },

  // Para momentos difíciles
  {
    id: 'difficult-1',
    text: 'En los días grises, recuerda: incluso las nubes más densas dejan pasar algunos rayos de luz. Tú eres más fuerte de lo que crees.',
    author: 'En los días difíciles',
    emotion: 'tristeza',
    type: 'encouragement'
  },
  {
    id: 'difficult-2',
    text: 'No hay prisa para encontrar respuestas. A veces, hacer las preguntas correctas ya es suficiente valentía por hoy.',
    author: 'Acompañándote',
    emotion: 'confusion',
    type: 'reflection'
  },

  // Para momentos de alegría
  {
    id: 'joy-1',
    text: 'La felicidad merece ser capturada en palabras. Escribe sobre esta luz para poder volver a ella cuando la necesites.',
    author: 'Celebrando contigo',
    emotion: 'alegria',
    type: 'tip'
  },
];

export const getInspiration = (category?: string, emotion?: string): Inspiration => {
  let filtered = inspirations;
  
  if (category) {
    filtered = inspirations.filter(i => i.category === category);
  }
  
  if (emotion && filtered.length > 0) {
    const emotionSpecific = filtered.filter(i => i.emotion === emotion);
    if (emotionSpecific.length > 0) {
      filtered = emotionSpecific;
    }
  }
  
  if (filtered.length === 0) {
    filtered = inspirations.filter(i => !i.category && !i.emotion);
  }
  
  return filtered[Math.floor(Math.random() * filtered.length)];
};

export const getAllInspirations = (): Inspiration[] => {
  return inspirations;
};

export const getInspirationsByCategory = (category: string): Inspiration[] => {
  return inspirations.filter(i => i.category === category);
};

export const getInspirationsByType = (type: string): Inspiration[] => {
  return inspirations.filter(i => i.type === type);
}; 