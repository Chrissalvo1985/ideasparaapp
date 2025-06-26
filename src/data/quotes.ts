import type { Quote } from '../types/index';

export const dailyQuotes: Quote[] = [
  {
    id: 'quote1',
    text: 'Escribir es la forma más profunda de leer la vida.',
    author: 'Francisco Umbral',
    category: 'inspirational'
  },
  {
    id: 'quote2',
    text: 'Las emociones no son buenas o malas, simplemente son información.',
    category: 'emotional',
    emotion: 'todas'
  },
  {
    id: 'quote3',
    text: 'Tu historia merece ser contada, especialmente por ti.',
    category: 'creative'
  },
  {
    id: 'quote4',
    text: 'En cada página en blanco vive la posibilidad de descubrir quién eres.',
    category: 'inspirational'
  },
  {
    id: 'quote5',
    text: 'Permite que tus palabras sean el puente entre tu corazón y el mundo.',
    category: 'emotional'
  },
  {
    id: 'quote6',
    text: 'Soltar no es rendirse, es hacer espacio para lo nuevo.',
    category: 'liberation',
    emotion: 'vacio'
  },
  {
    id: 'quote7',
    text: 'Tu vulnerabilidad es tu superpoder más grande.',
    category: 'emotional',
    emotion: 'miedo'
  },
  {
    id: 'quote8',
    text: 'Cada emoción es una maestra disfrazada.',
    category: 'wisdom'
  },
  {
    id: 'quote9',
    text: 'Escribir es respirar a través de las palabras.',
    category: 'creative'
  },
  {
    id: 'quote10',
    text: 'No hay palabras correctas o incorrectas, solo tuyas.',
    category: 'liberation'
  },
  {
    id: 'quote11',
    text: 'La creatividad es la inteligencia divirtiéndose.',
    author: 'Albert Einstein',
    category: 'creative'
  },
  {
    id: 'quote12',
    text: 'Tu dolor puede convertirse en tu propósito.',
    category: 'emotional',
    emotion: 'tristeza'
  },
  {
    id: 'quote13',
    text: 'Honra tu proceso, no solo el resultado.',
    category: 'wisdom'
  },
  {
    id: 'quote14',
    text: 'La rabia es energía pidiendo dirección.',
    category: 'emotional',
    emotion: 'rabia'
  },
  {
    id: 'quote15',
    text: 'Eres tanto el autor como el protagonista de tu historia.',
    category: 'empowerment'
  },
  {
    id: 'quote16',
    text: 'La nostalgia es el perfume de la memoria.',
    category: 'emotional',
    emotion: 'nostalgia'
  },
  {
    id: 'quote17',
    text: 'Cada día tienes 86,400 segundos para escribir tu historia.',
    category: 'inspirational'
  },
  {
    id: 'quote18',
    text: 'Tu autenticidad es tu regalo al mundo.',
    category: 'empowerment'
  },
  {
    id: 'quote19',
    text: 'El vacío no es la ausencia de algo, es el espacio para todo.',
    category: 'wisdom',
    emotion: 'vacio'
  },
  {
    id: 'quote20',
    text: 'Escribir es el arte de descubrir lo que piensas.',
    category: 'creative'
  }
];

export const getRandomQuote = (): Quote => {
  const randomIndex = Math.floor(Math.random() * dailyQuotes.length);
  return dailyQuotes[randomIndex];
};

export const getQuoteByEmotion = (emotion: string): Quote | undefined => {
  const emotionQuotes = dailyQuotes.filter(quote => quote.emotion === emotion);
  if (emotionQuotes.length === 0) return undefined;
  const randomIndex = Math.floor(Math.random() * emotionQuotes.length);
  return emotionQuotes[randomIndex];
}; 