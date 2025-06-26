export interface Emotion {
  id: string;
  name: string;
  color: string;
  icon: string;
  description: string;
}

export interface WritingPrompt {
  id: string;
  text: string;
  category: 'creative' | 'emotional' | 'guided' | 'liberation';
  emotion?: string;
  theme?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  emotion: string;
  date: Date;
  isPrivate: boolean;
  tags: string[];
  mood?: number; // 1-10 scale
  category?: string; // Categoría de origen si viene de explorar
  promptId?: string; // ID del prompt específico usado
  entryType: 'category' | 'random' | 'free' | 'inspiration'; // Tipo de entrada
  promptText?: string; // Texto del prompt para referencia
}

export interface Quote {
  id: string;
  text: string;
  author?: string;
  category: string;
  emotion?: string;
}

export interface FanzineContent {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'illustration' | 'exercise';
  images?: string[];
  isInteractive: boolean;
}

export interface LiberationSession {
  id: string;
  content: string;
  emotion: string;
  action: 'burn' | 'tear' | 'bury' | 'release';
  date: Date;
  isDestroyed: boolean;
}

export interface UserProgress {
  totalEntries: number;
  consecutiveDays: number;
  favoriteEmotion: string;
  completedPrompts: string[];
  liberationSessions: number;
  lastActiveDate: string;
  categoriesExplored: string[];
}

// ConciencIA Types
export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  context?: string; // ID de la idea/entrada relacionada
}

export interface ConciencIASettings {
  apiKey?: string;
  personality: 'empathetic' | 'creative' | 'supportive';
  responseStyle: 'brief' | 'detailed' | 'creative';
  includeEmotionalSupport: boolean;
}

export interface IdeaContext {
  id: string;
  type: 'diary' | 'liberation' | 'emotion' | 'inspiration';
  content: string;
  metadata: Record<string, any>;
  embedding?: number[];
}

// Sistema Social/Comunidad
export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  joinDate: Date;
  isVerified?: boolean;
}

export interface AuthorPrompt {
  id: string;
  title: string;
  content: string;
  type: 'fortune_cookie' | 'creative_spark' | 'daily_reflection' | 'story_starter' | 'emotion_explorer';
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string; // "5 min", "15 min", etc.
  tags: string[];
  isActive: boolean;
  createdAt: Date;
}

export interface CommunityPost {
  id: string;
  authorId: string;
  author: User;
  promptId?: string; // Si viene de un prompt de la autora
  prompt?: AuthorPrompt;
  content: string;
  title?: string;
  type: 'original' | 'prompt_response' | 'fortune_cookie' | 'creative_share';
  isPublic: boolean;
  tags: string[]; // Tags privados del usuario
  publicCategories: string[]; // Categorías públicas sin revelar tags específicos
  likes: number;
  comments: number;
  shares: number;
  hasLiked?: boolean; // Para el usuario actual
  hasBookmarked?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostInteraction {
  id: string;
  postId: string;
  userId: string;
  type: 'like' | 'comment' | 'share' | 'bookmark';
  createdAt: Date;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  author: User;
  content: string;
  parentId?: string; // Para respuestas
  likes: number;
  hasLiked?: boolean;
  createdAt: Date;
}

export interface UserFollow {
  id: string;
  followerId: string; // Quien sigue
  followingId: string; // A quien sigue
  createdAt: Date;
}

export interface CommunitySettings {
  allowPublicPosts: boolean;
  allowComments: boolean;
  allowFollowers: boolean;
  showRealName: boolean;
  notifyOnLikes: boolean;
  notifyOnComments: boolean;
  notifyOnFollows: boolean;
} 