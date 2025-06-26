import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DiaryEntry, Emotion, WritingPrompt, Quote, LiberationSession, UserProgress, ChatMessage, ConciencIASettings, User, CommunityPost, AuthorPrompt, CommunitySettings } from '../types/index';
import { emotions } from '../data/emotions';
import { writingPrompts } from '../data/prompts';
import { getRandomQuote } from '../data/quotes';
import { dailyQuotes } from '../data/quotes';
import { getCategoryPrompts } from '../data/categories';
import { initializeMockData } from '../data/mockData';

interface AppStore {
  // State
  currentEmotion: Emotion | null;
  currentPrompt: WritingPrompt | null;
  diaryEntries: DiaryEntry[];
  liberationSessions: LiberationSession[];
  dailyQuote: Quote | null;
  userProgress: UserProgress;
  isWriting: boolean;
  writingContent: string;
  showPrivateEntries: boolean;
  currentCategory: string | null;
  categoryProgress: Record<string, number>;
  
  // ConciencIA State
  chatMessages: ChatMessage[];
  concienciaSettings: ConciencIASettings;
  
  // Community/Social State
  currentUser: User | null;
  communityPosts: CommunityPost[];
  followedUsers: string[]; // IDs de usuarios seguidos
  communitySettings: CommunitySettings;

  // Actions
  setCurrentEmotion: (emotion: Emotion | null) => void;
  setCurrentPrompt: (prompt: WritingPrompt | null) => void;
  getRandomPrompt: (category?: string) => WritingPrompt | null;
  saveEntry: (entry: Omit<DiaryEntry, 'id' | 'date' | 'category' | 'promptId' | 'promptText' | 'entryType'>) => void;
  saveLiberationSession: (session: Omit<LiberationSession, 'id' | 'date'>) => void;
  setWritingContent: (content: string) => void;
  setIsWriting: (isWriting: boolean) => void;
  togglePrivateEntries: () => void;
  deleteEntry: (id: string) => void;
  updateEntry: (id: string, updates: Partial<DiaryEntry>) => void;
  setDailyQuote: () => void;
  getEntriesByEmotion: (emotion: string) => DiaryEntry[];
  getStreakDays: () => number;
  updateProgress: () => void;
  setCurrentCategory: (category: string) => void;
  incrementProgress: (type: 'entry' | 'liberation', category?: string) => void;
  updateStreakIfNeeded: () => void;
  initializeStore: () => void;
  
  // ConciencIA Actions
  addChatMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearChatHistory: () => void;
  updateConcienciaSettings: (settings: Partial<ConciencIASettings>) => void;
  getAllIdeasForContext: () => string;
  getContextWithReferences: () => { 
    context: string; 
    references: { 
      diaryEntries: { id: string; title: string; date: Date; emotion: string }[]; 
      liberationSessions: { id: string; emotion: string; action: string; date: Date }[] 
    } 
  };
  
  // Community Actions
  setCurrentUser: (user: User | null) => void;
  createPost: (post: Omit<CommunityPost, 'id' | 'author' | 'createdAt' | 'updatedAt' | 'likes' | 'comments' | 'shares' | 'hasLiked'>) => void;
  likePost: (postId: string) => void;
  unlikePost: (postId: string) => void;
  followUser: (userId: string) => void;
  unfollowUser: (userId: string) => void;
  updateCommunitySettings: (settings: Partial<CommunitySettings>) => void;
  getPublicFeed: () => CommunityPost[];
  getFollowingFeed: () => CommunityPost[];
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currentEmotion: null,
      currentPrompt: null,
      diaryEntries: [],
      liberationSessions: [],
      dailyQuote: null,
      userProgress: {
        totalEntries: 0,
        consecutiveDays: 0,
        favoriteEmotion: '',
        completedPrompts: [],
        liberationSessions: 0,
        lastActiveDate: '',
        categoriesExplored: []
      },
      categoryProgress: {},
      isWriting: false,
      writingContent: '',
      showPrivateEntries: false,
      currentCategory: null,
      
      // ConciencIA initial state
      chatMessages: [],
      concienciaSettings: {
        personality: 'empathetic',
        responseStyle: 'detailed',
        includeEmotionalSupport: true
      },
      
      // Community initial state
      currentUser: null,
      communityPosts: [],
      followedUsers: [],
      communitySettings: {
        allowPublicPosts: true,
        allowComments: true,
        allowFollowers: true,
        showRealName: false,
        notifyOnLikes: true,
        notifyOnComments: true,
        notifyOnFollows: true
      },

      // Actions
      setCurrentEmotion: (emotion) => set({ currentEmotion: emotion }),
      
      setCurrentPrompt: (prompt) => set({ currentPrompt: prompt }),
      
      getRandomPrompt: (category?: string) => {
        let availablePrompts: WritingPrompt[] = [];
        
        if (category) {
          const categoryData = writingPrompts.find(p => p.category === category);
          availablePrompts = categoryData ? categoryData.prompts : [];
        } else {
          availablePrompts = writingPrompts.reduce((acc, cat) => [...acc, ...cat.prompts], [] as WritingPrompt[]);
        }
        
        if (availablePrompts.length > 0) {
          const randomPrompt = availablePrompts[Math.floor(Math.random() * availablePrompts.length)];
          set({ currentPrompt: randomPrompt });
          return randomPrompt;
        }
        return null;
      },

      saveEntry: (entryData) => {
        console.log('💾 Guardando entrada:', entryData);
        
        const currentState = get();
        
        const newEntry: DiaryEntry = {
          ...entryData,
          id: `entry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          date: new Date(),
          // Información de origen
          category: currentState.currentCategory || undefined,
          promptId: currentState.currentPrompt?.id || undefined,
          promptText: currentState.currentPrompt?.text || undefined,
          entryType: currentState.currentPrompt 
            ? (currentState.currentCategory ? 'category' : 'random')
            : 'free'
        };
        
        console.log('📝 Nueva entrada creada:', newEntry);
        
        set(state => {
          const updatedEntries = [newEntry, ...state.diaryEntries];
          console.log('📚 Total entradas después de agregar:', updatedEntries.length);
          
          return {
            diaryEntries: updatedEntries,
            writingContent: '',
            isWriting: false,
            // Limpiar el estado después de guardar
            currentPrompt: null,
            currentCategory: null
          };
        });
        
        // Verificar que se guardó
        setTimeout(() => {
          const currentState = get();
          console.log('✅ Verificación - Entradas en store:', currentState.diaryEntries.length);
          
          // Verificar localStorage
          try {
            const stored = localStorage.getItem('ideas-para-app-storage');
            if (stored) {
              const parsed = JSON.parse(stored);
              console.log('💽 Entradas en localStorage:', parsed.state?.diaryEntries?.length || 0);
            }
          } catch (error) {
            console.error('❌ Error verificando localStorage:', error);
          }
          
          get().updateProgress();
        }, 100);
      },

      saveLiberationSession: (sessionData) => {
        const newSession: LiberationSession = {
          ...sessionData,
          id: Date.now().toString(),
          date: new Date()
        };
        
        set(state => ({
          liberationSessions: [newSession, ...state.liberationSessions]
        }));
        
        get().updateProgress();
      },

      setWritingContent: (content) => set({ writingContent: content }),
      
      setIsWriting: (isWriting) => set({ isWriting }),
      
      togglePrivateEntries: () => set(state => ({ 
        showPrivateEntries: !state.showPrivateEntries 
      })),

      deleteEntry: (id) => set(state => ({
        diaryEntries: state.diaryEntries.filter(entry => entry.id !== id)
      })),

      updateEntry: (id, updates) => set(state => ({
        diaryEntries: state.diaryEntries.map(entry =>
          entry.id === id ? { ...entry, ...updates } : entry
        )
      })),

      setDailyQuote: () => {
        const today = new Date().toDateString();
        const currentQuote = get().dailyQuote;
        
        if (!currentQuote || currentQuote.date !== today) {
          const randomQuote = dailyQuotes[Math.floor(Math.random() * dailyQuotes.length)];
          set({
            dailyQuote: {
              ...randomQuote,
              date: today
            }
          });
        }
      },

      getEntriesByEmotion: (emotion) => {
        const { diaryEntries } = get();
        return diaryEntries.filter(entry => entry.emotion === emotion);
      },

      getStreakDays: () => {
        const { diaryEntries } = get();
        if (diaryEntries.length === 0) return 0;

        let streak = 0;
        const today = new Date();
        const sortedEntries = [...diaryEntries].sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        for (let i = 0; i < sortedEntries.length; i++) {
          const entryDate = new Date(sortedEntries[i].date);
          const daysDiff = Math.floor(
            (today.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24)
          );

          if (daysDiff === streak) {
            streak++;
          } else {
            break;
          }
        }

        return streak;
      },

      updateProgress: () => {
        const { diaryEntries, liberationSessions } = get();
        
        // Calculate favorite emotion
        const emotionCounts: { [key: string]: number } = {};
        diaryEntries.forEach(entry => {
          emotionCounts[entry.emotion] = (emotionCounts[entry.emotion] || 0) + 1;
        });
        
        const favoriteEmotion = Object.keys(emotionCounts).reduce((a, b) =>
          emotionCounts[a] > emotionCounts[b] ? a : b, ''
        );

        set(state => ({
          userProgress: {
            ...state.userProgress,
            totalEntries: diaryEntries.length,
            consecutiveDays: get().getStreakDays(),
            favoriteEmotion,
            liberationSessions: liberationSessions.length,
            lastActiveDate: new Date().toDateString(),
            categoriesExplored: state.categoryProgress ? Object.keys(state.categoryProgress) : []
          },
          categoryProgress: state.categoryProgress ? {
            ...state.categoryProgress,
            [favoriteEmotion]: (state.categoryProgress[favoriteEmotion] || 0) + 1
          } : {}
        }));
      },

      setCurrentCategory: (category: string) => {
        set({ currentCategory: category });
      },

      incrementProgress: (type: 'entry' | 'liberation', category?: string) => {
        const current = get();
        const today = new Date().toDateString();
        
        set({
          userProgress: {
            ...current.userProgress,
            totalEntries: type === 'entry' ? current.userProgress.totalEntries + 1 : current.userProgress.totalEntries,
            liberationSessions: type === 'liberation' ? current.userProgress.liberationSessions + 1 : current.userProgress.liberationSessions,
            lastActiveDate: today,
            categoriesExplored: category && !current.userProgress.categoriesExplored.includes(category) 
              ? [...current.userProgress.categoriesExplored, category]
              : current.userProgress.categoriesExplored
          },
          categoryProgress: category ? {
            ...current.categoryProgress,
            [category]: (current.categoryProgress[category] || 0) + 1
          } : current.categoryProgress
        });
        
        get().updateStreakIfNeeded();
      },

      updateStreakIfNeeded: () => {
        const state = get();
        const today = new Date().toDateString();
        
        if (state.userProgress.lastActiveDate !== today) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const wasActiveYesterday = state.userProgress.lastActiveDate === yesterday.toDateString();
          
          set(currentState => ({
            userProgress: {
              ...currentState.userProgress,
              consecutiveDays: wasActiveYesterday ? currentState.userProgress.consecutiveDays + 1 : 1,
              lastActiveDate: today
            }
          }));
        }
      },

      initializeStore: () => {
        const state = get();
        
        // Solo inicializar si no hay datos
        if (state.diaryEntries.length === 0 && state.communityPosts.length === 0) {
          console.log('🚀 Inicializando store por primera vez...');
          initializeMockData();
          
          // Cargar datos de mock en el store
          const mockData = initializeMockData();
          
          set({
            communityPosts: mockData.posts,
            currentUser: mockData.users[0] // Usuario por defecto
          });
          
          // Configurar quote diario si no existe
          if (!state.dailyQuote) {
            get().setDailyQuote();
          }
        }
      },

      // ConciencIA Actions
      addChatMessage: (messageData) => {
        const newMessage: ChatMessage = {
          ...messageData,
          id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: new Date()
        };
        
        set(state => ({
          chatMessages: [...state.chatMessages, newMessage]
        }));
      },

      clearChatHistory: () => set({ chatMessages: [] }),

      updateConcienciaSettings: (settings) => set(state => ({
        concienciaSettings: { ...state.concienciaSettings, ...settings }
      })),

      getAllIdeasForContext: () => {
        const { diaryEntries, liberationSessions } = get();
        
        let context = "Estas son todas las ideas y pensamientos del usuario:\n\n";
        
        // Agregar entradas de diario
        if (diaryEntries.length > 0) {
          context += "=== ENTRADAS DE DIARIO ===\n";
          diaryEntries.forEach(entry => {
            context += `[ID: ${entry.id}] Fecha: ${new Date(entry.date).toLocaleDateString()}\n`;
            context += `Título: ${entry.title}\n`;
            context += `Emoción: ${entry.emotion}\n`;
            context += `Contenido: ${entry.content}\n`;
            if (entry.tags.length > 0) {
              context += `Etiquetas: ${entry.tags.join(', ')}\n`;
            }
            context += `---\n`;
          });
        }
        
        // Agregar sesiones de liberación
        if (liberationSessions.length > 0) {
          context += "\n=== SESIONES DE LIBERACIÓN ===\n";
          liberationSessions.forEach(session => {
            context += `[ID: ${session.id}] Fecha: ${new Date(session.date).toLocaleDateString()}\n`;
            context += `Emoción: ${session.emotion}\n`;
            context += `Acción: ${session.action}\n`;
            context += `Contenido: ${session.content}\n`;
            context += `---\n`;
          });
        }
        
        return context;
      },

      // Nuevo método para obtener contexto con metadatos
      getContextWithReferences: () => {
        const { diaryEntries, liberationSessions } = get();
        
        return {
          context: get().getAllIdeasForContext(),
          references: {
            diaryEntries: diaryEntries.map(entry => ({
              id: entry.id,
              title: entry.title,
              date: entry.date,
              emotion: entry.emotion
            })),
            liberationSessions: liberationSessions.map(session => ({
              id: session.id,
              emotion: session.emotion,
              action: session.action,
              date: session.date
            }))
          }
        };
      },

      // Community Actions
      setCurrentUser: (user) => set({ currentUser: user }),

      createPost: (postData) => {
        const { currentUser } = get();
        if (!currentUser) return;

        const newPost: CommunityPost = {
          ...postData,
          id: `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          authorId: currentUser.id,
          author: currentUser,
          likes: 0,
          comments: 0,
          shares: 0,
          hasLiked: false,
          hasBookmarked: false,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        set(state => ({
          communityPosts: [newPost, ...state.communityPosts]
        }));
      },

      likePost: (postId) => {
        set(state => ({
          communityPosts: state.communityPosts.map(post => 
            post.id === postId 
              ? { 
                  ...post, 
                  likes: post.hasLiked ? post.likes - 1 : post.likes + 1,
                  hasLiked: !post.hasLiked 
                }
              : post
          )
        }));
      },

      unlikePost: (postId) => {
        set(state => ({
          communityPosts: state.communityPosts.map(post => 
            post.id === postId && post.hasLiked
              ? { 
                  ...post, 
                  likes: post.likes - 1,
                  hasLiked: false 
                }
              : post
          )
        }));
      },

      followUser: (userId) => {
        set(state => ({
          followedUsers: [...state.followedUsers, userId]
        }));
      },

      unfollowUser: (userId) => {
        set(state => ({
          followedUsers: state.followedUsers.filter(id => id !== userId)
        }));
      },

      updateCommunitySettings: (settings) => set(state => ({
        communitySettings: { ...state.communitySettings, ...settings }
      })),

      getPublicFeed: () => {
        const { communityPosts } = get();
        return communityPosts
          .filter(post => post.isPublic)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      },

      getFollowingFeed: () => {
        const { communityPosts, followedUsers, currentUser } = get();
        return communityPosts
          .filter(post => 
            post.isPublic && 
            (followedUsers.includes(post.authorId) || post.authorId === currentUser?.id)
          )
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
    }),
    {
      name: 'ideas-para-app-storage',
      version: 5, // Incrementado para forzar rehidratación
      onRehydrateStorage: () => (state) => {
        console.log('🔄 Hidratando store desde localStorage');
        if (state) {
          console.log('📊 Entradas cargadas:', state.diaryEntries?.length || 0);
          console.log('🧠 ConciencIA settings:', state.concienciaSettings);
        }
      },
      // Migración para mantener datos existentes
      migrate: (persistedState: any, version: number) => {
        console.log('🔄 Migrando store desde versión', version);
        
        if (version < 5) {
          // Asegurar que concienciaSettings y communitySettings existen
          return {
            ...persistedState,
            concienciaSettings: persistedState.concienciaSettings || {
              personality: 'empathetic',
              responseStyle: 'detailed',
              includeEmotionalSupport: true
            },
            chatMessages: persistedState.chatMessages || [],
            // Community state
            currentUser: persistedState.currentUser || null,
            communityPosts: persistedState.communityPosts || [],
            followedUsers: persistedState.followedUsers || [],
            communitySettings: persistedState.communitySettings || {
              allowPublicPosts: true,
              allowComments: true,
              allowFollowers: true,
              showRealName: false,
              notifyOnLikes: true,
              notifyOnComments: true,
              notifyOnFollows: true
            }
          };
        }
        
        return persistedState;
      }
    }
  )
); 