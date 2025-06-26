import { 
  Heart, 
  Plane, 
  Moon, 
  Lightbulb, 
  PartyPopper, 
  Leaf, 
  Dumbbell,
  Briefcase,
  Home,
  Camera,
  Book,
  Music,
  Palette,
  Coffee,
  MapPin,
  Users,
  Sparkles,
  Target
} from 'lucide-react';

export interface Category {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  gradient: string;
  prompts: string[];
  isActive: boolean;
  isComingSoon?: boolean;
}

export const categories: Category[] = [
  {
    id: 'emociones',
    name: 'Emociones',
    title: 'Ideas para conectar contigo',
    description: 'Explora tus sentimientos y pensamientos',
    icon: Heart,
    color: 'rose',
    gradient: 'from-slate-700 to-slate-800',
    isActive: true,
    prompts: [
      '¿Qué emoción necesitas procesar hoy?',
      '¿Cómo te sientes en este momento?',
      '¿Qué te haría sentir más en paz?',
      '¿Qué mensaje necesitas escuchar hoy?'
    ]
  },
  {
    id: 'viajar',
    name: 'Viajar',
    title: 'Ideas para explorar el mundo',
    description: 'Planifica aventuras y descubre lugares',
    icon: Plane,
    color: 'slate',
    gradient: 'from-gray-700 to-gray-800',
    isActive: true,
    prompts: [
      '¿Qué destino te llama la atención?',
      '¿Qué tipo de experiencia buscas?',
      '¿Con quién quieres viajar?',
      '¿Qué actividad nueva quieres probar?'
    ]
  },
  {
    id: 'dormir',
    name: 'Dormir Mejor',
    title: 'Ideas para descansar profundo',
    description: 'Mejora tu sueño y rutinas nocturnas',
    icon: Moon,
    color: 'slate',
    gradient: 'from-slate-600 to-slate-800',
    isActive: true,
    prompts: [
      '¿Qué ritual nocturno te relajaría?',
      '¿Qué está interfiriendo con tu sueño?',
      '¿Cómo quieres sentirte al despertar?',
      '¿Qué ambiente necesitas para descansar?'
    ]
  },
  {
    id: 'creatividad',
    name: 'Creatividad',
    title: 'Ideas para crear y expresarte',
    description: 'Desbloquea tu potencial creativo',
    icon: Palette,
    color: 'gray',
    gradient: 'from-gray-600 to-slate-700',
    isActive: true,
    prompts: [
      '¿Qué quieres crear hoy?',
      '¿Qué medium artístico te atrae?',
      '¿Qué historia quieres contar?',
      '¿Cómo quieres expresar tu creatividad?'
    ]
  },
  {
    id: 'fiestas',
    name: 'Celebrar',
    title: 'Ideas para conectar y festejar',
    description: 'Planifica momentos especiales',
    icon: PartyPopper,
    color: 'stone',
    gradient: 'from-stone-600 to-slate-700',
    isActive: true,
    prompts: [
      '¿Qué ocasión quieres celebrar?',
      '¿Cómo quieres que se sientan tus invitados?',
      '¿Qué actividad sería divertida?',
      '¿Qué recuerdo quieres crear?'
    ]
  },
  {
    id: 'salud',
    name: 'Bienestar',
    title: 'Ideas para cuidar tu cuerpo y mente',
    description: 'Cultiva hábitos saludables',
    icon: Leaf,
    color: 'zinc',
    gradient: 'from-zinc-600 to-slate-700',
    isActive: true,
    prompts: [
      '¿Qué hábito saludable quieres desarrollar?',
      '¿Cómo quieres sentirte físicamente?',
      '¿Qué actividad te daría energía?',
      '¿Qué necesita tu cuerpo hoy?'
    ]
  },
  // Próximamente
  {
    id: 'trabajo',
    name: 'Productividad',
    title: 'Ideas para trabajar mejor',
    description: 'Optimiza tu rendimiento profesional',
    icon: Briefcase,
    color: 'gray',
    gradient: 'from-gray-500 to-slate-600',
    isActive: false,
    isComingSoon: true,
    prompts: []
  },
  {
    id: 'hogar',
    name: 'Hogar',
    title: 'Ideas para tu espacio personal',
    description: 'Crea el ambiente perfecto',
    icon: Home,
    color: 'stone',
    gradient: 'from-stone-500 to-slate-600',
    isActive: false,
    isComingSoon: true,
    prompts: []
  }
];

export const getActiveCategories = () => categories.filter(cat => cat.isActive);
export const getCategoryById = (id: string) => categories.find(cat => cat.id === id);
export const getCategoryPrompts = (id: string) => getCategoryById(id)?.prompts || []; 