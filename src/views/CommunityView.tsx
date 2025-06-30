import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  Star,
  Coffee,
  Globe,
  Lock,
  Sparkles,
  Users,
  Gamepad2,
  Trophy,
  Zap,
  Target,
  CreditCard,
  Gift,
  Shuffle,
  Award,
  Crown,
  Timer
} from 'lucide-react';
import { useAppStore } from '../stores/appStore';
import { getFortuneCookiePrompts } from '../data/authorPrompts';
import type { AuthorPrompt, CommunityPost } from '../types/index';

// Datos de minijuegos
const socialCards = [
  {
    category: 'Primera Cita',
    icon: '💕',
    color: 'from-pink-500 to-rose-500',
    cards: [
      '¿Cuál fue el último libro que realmente te emocionó?',
      '¿Qué harías si tuvieras un día libre perfecto?',
      '¿Cuál es tu lugar favorito para desconectar?',
      'Cuéntame sobre algo que aprendiste recientemente',
      '¿Qué te hace reír hasta llorar?',
      '¿Cuál es tu tradición familiar favorita?',
      '¿Qué aventura te gustaría vivir?',
      '¿Cuál es tu forma favorita de expresar creatividad?'
    ]
  },
  {
    category: 'Nuevo Amigo',
    icon: '🤝',
    color: 'from-blue-500 to-cyan-500',
    cards: [
      '¿Qué te apasiona hacer en tu tiempo libre?',
      '¿Cuál es tu serie o película favorita actualmente?',
      '¿Tienes algún hobby poco común?',
      '¿Cuál es el mejor consejo que te han dado?',
      '¿Qué te motiva por las mañanas?',
      '¿Cuál es tu comida de confort favorita?',
      '¿Practicas algún deporte o actividad física?',
      '¿Tienes algún talento oculto?'
    ]
  },
  {
    category: 'Romper Hielo',
    icon: '❄️',
    color: 'from-indigo-500 to-purple-500',
    cards: [
      '¿Cuál es la cosa más extraña que has comido?',
      '¿Qué superpoder elegirías y por qué?',
      '¿Cuál es tu emoji favorito?',
      '¿Prefieres el café o el té? ¿Por qué?',
      '¿Cuál es tu animal favorito?',
      '¿Qué canción te pone de buen humor?',
      '¿Eres más de mar o montaña?',
      '¿Cuál es tu estación del año favorita?'
    ]
  },
  {
    category: 'Trabajo/Networking',
    icon: '💼',
    color: 'from-emerald-500 to-teal-500',
    cards: [
      '¿Qué te llevó a tu área profesional actual?',
      '¿Cuál es el proyecto del que te sientes más orgulloso?',
      '¿Qué habilidad te gustaría desarrollar?',
      '¿Cómo prefieres trabajar: en equipo o individualmente?',
      '¿Qué te inspira en tu trabajo?',
      '¿Cuál ha sido tu mayor aprendizaje profesional?',
      '¿Tienes algún mentor o referente?',
      '¿Qué tendencia ves en tu industria?'
    ]
  }
];

const fortuneCookies = [
  'La creatividad florece cuando liberas el miedo al juicio',
  'Tus palabras tienen el poder de sanar tu alma',
  'Cada idea que escribes planta una semilla de transformación',
  'La vulnerabilidad en la escritura es tu mayor fortaleza',
  'Hoy es el día perfecto para escribir tu verdad',
  'Las emociones difíciles también merecen ser honradas en papel',
  'Tu voz única es exactamente lo que el mundo necesita escuchar',
  'Escribir es un acto de amor propio y autodescubrimiento',
  'Las historias más poderosas nacen de experiencias auténticas',
  'Permítete explorar sin juzgar el resultado'
];

const CommunityView: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMinigame, setSelectedMinigame] = useState<string | null>(null);
  const [currentCard, setCurrentCard] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [showFortune, setShowFortune] = useState(false);
  const [currentFortune, setCurrentFortune] = useState('');
  const [gameStats, setGameStats] = useState({
    fortunesOpened: 0,
    cardsDrawn: 0,
    streak: 0,
    points: 0
  });

  const { 
    currentUser,
    communityPosts,
    setCurrentUser,
    createPost,
    likePost,
    getPublicFeed
  } = useAppStore();

  // Simular usuario actual si no existe
  useEffect(() => {
    if (!currentUser) {
      const mockUser = {
        id: 'user_' + Date.now(),
        username: 'creativosoñador',
        displayName: 'Creativo Soñador',
        bio: 'Explorando ideas y emociones a través de las palabras',
        joinDate: new Date(),
        isVerified: false
      };
      setCurrentUser(mockUser);
    }
  }, [currentUser, setCurrentUser]);

  const handleCreatePost = (content: string, isPublic: boolean = true, prompt?: AuthorPrompt) => {
    createPost({
      content,
      title: prompt?.title || 'Nueva publicación',
      type: 'prompt_response',
      authorId: 'anonymous', // TODO: Replace with actual user ID when auth is implemented
      isPublic,
      tags: [],
      publicCategories: [],
      promptId: prompt?.id || '',
      prompt
    });

    setSelectedMinigame(null);
    setSelectedCategory(null);
  };

  const openFortuneCookie = () => {
    const randomFortune = fortuneCookies[Math.floor(Math.random() * fortuneCookies.length)];
    setCurrentFortune(randomFortune);
    setShowFortune(true);
    setGameStats(prev => ({
      ...prev,
      fortunesOpened: prev.fortunesOpened + 1,
      points: prev.points + 10,
      streak: prev.streak + 1
    }));
  };

  const drawSocialCard = (category: any) => {
    const randomCard = category.cards[Math.floor(Math.random() * category.cards.length)];
    setCurrentCard(randomCard);
    setSelectedCategory(category);
    setSelectedMinigame('social-cards');
    setGameStats(prev => ({
      ...prev,
      cardsDrawn: prev.cardsDrawn + 1,
      points: prev.points + 5,
      streak: prev.streak + 1
    }));
  };

  const PostCard: React.FC<{ post: CommunityPost }> = ({ post }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-slate-600 shadow-sm hover:shadow-md dark:hover:shadow-slate-900/20 transition-all p-6 mb-4"
    >
      {/* Header del post */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 dark:from-slate-500 dark:to-slate-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {post.author.displayName[0].toUpperCase()}
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="font-semibold text-gray-800 dark:text-slate-200">{post.author.displayName}</h4>
              {post.author.isVerified && (
                <Star size={16} className="text-amber-500 fill-current" />
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-slate-400">@{post.author.username}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {post.isPublic ? (
            <Globe size={16} className="text-green-500 dark:text-green-400" />
          ) : (
            <Lock size={16} className="text-gray-400 dark:text-slate-500" />
          )}
          <span className="text-xs text-gray-500 dark:text-slate-400">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Prompt origen si existe */}
      {post.prompt && (
        <div className="mb-4 p-3 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-700/50 dark:to-slate-600/50 rounded-lg border border-slate-200 dark:border-slate-600">
          <div className="flex items-center space-x-2 mb-2">
            <Coffee size={16} className="text-slate-600 dark:text-slate-300" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Inspirado por: {post.prompt.title}
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 italic">
            "{post.prompt.content}"
          </p>
        </div>
      )}

      {/* Contenido del post */}
      <div className="mb-4">
        {post.title && (
          <h3 className="font-semibold text-lg text-gray-800 dark:text-slate-200 mb-2">{post.title}</h3>
        )}
        <p className="text-gray-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>
      </div>

      {/* Categorías públicas */}
      {post.publicCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.publicCategories.map((category, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 text-xs rounded-full"
            >
              {category}
            </span>
          ))}
        </div>
      )}

      {/* Acciones */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-600">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => likePost(post.id)}
            className={`flex items-center space-x-1 transition-colors ${
              post.hasLiked 
                ? 'text-red-500 hover:text-red-600' 
                : 'text-gray-500 dark:text-slate-400 hover:text-red-500'
            }`}
          >
            <Heart 
              size={18} 
              className={post.hasLiked ? 'fill-current' : ''} 
            />
            <span className="text-sm font-medium">{post.likes}</span>
          </button>

          <button className="flex items-center space-x-1 text-gray-500 dark:text-slate-400 hover:text-blue-500 transition-colors">
            <MessageCircle size={18} />
            <span className="text-sm font-medium">{post.comments}</span>
          </button>

          <button className="flex items-center space-x-1 text-gray-500 dark:text-slate-400 hover:text-green-500 transition-colors">
            <Share size={18} />
            <span className="text-sm font-medium">{post.shares}</span>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button className="text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 transition-colors">
            <Bookmark size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );

  const PromptCard: React.FC<{ prompt: AuthorPrompt }> = ({ prompt }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-slate-600 shadow-sm hover:shadow-md dark:hover:shadow-slate-900/20 transition-all p-6 mb-4"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Coffee size={20} className="text-slate-600 dark:text-slate-300" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{prompt.category}</span>
            <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">
              {prompt.difficulty}
            </span>
          </div>
          <h3 className="font-semibold text-lg text-gray-800 dark:text-slate-200 mb-2">{prompt.title}</h3>
          <p className="text-gray-600 dark:text-slate-300 leading-relaxed mb-4">{prompt.content}</p>
          
          {prompt.emotionalSupport && (
            <div className="mb-4 p-3 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-700/50 dark:to-slate-600/50 rounded-lg border border-slate-200 dark:border-slate-600">
              <p className="text-sm text-slate-700 dark:text-slate-200">💝 {prompt.emotionalSupport}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-slate-400">
          <span>✨ {prompt.category}</span>
          <span>🎯 {prompt.difficulty}</span>
        </div>
        
        <button
          onClick={() => {
            setSelectedMinigame(null);
            setSelectedCategory(prompt);
          }}
          className="px-4 py-2 bg-gradient-to-r from-slate-600 to-slate-700 dark:from-slate-600 dark:to-slate-700 text-white rounded-lg hover:from-slate-700 hover:to-slate-800 dark:hover:from-slate-500 dark:hover:to-slate-600 transition-all"
        >
          Responder
        </button>
      </div>
    </motion.div>
  );

  const MinigameCard: React.FC<{ 
    title: string; 
    description: string; 
    icon: React.ReactNode; 
    color: string;
    onClick: () => void;
    stats?: string;
  }> = ({ title, description, icon, color, onClick, stats }) => (
    <motion.button
      onClick={onClick}
      className={`relative overflow-hidden bg-gradient-to-br ${color} rounded-xl p-6 text-white text-left shadow-lg hover:shadow-xl dark:hover:shadow-slate-900/20 transition-all group`}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            {icon}
          </div>
          <Gamepad2 size={20} className="opacity-60" />
        </div>
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-white/90 text-sm mb-3">{description}</p>
        {stats && (
          <div className="text-xs text-white/80 bg-white/10 rounded-full px-2 py-1 inline-block">
            {stats}
          </div>
        )}
      </div>
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.button>
  );

  const SocialCardGame: React.FC = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={() => setSelectedMinigame(null)}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {!currentCard ? (
          <div>
            <div className="text-center mb-6">
              <CreditCard size={48} className="mx-auto text-slate-600 dark:text-slate-300 mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-200 mb-2">Tarjetas Sociales</h2>
              <p className="text-gray-600 dark:text-slate-300">Elige una categoría para obtener una pregunta que rompa el hielo</p>
            </div>
            
            <div className="space-y-3">
              {socialCards.map((category, index) => (
                <motion.button
                  key={index}
                  onClick={() => drawSocialCard(category)}
                  className={`w-full p-4 bg-gradient-to-r ${category.color} text-white rounded-xl text-left hover:shadow-lg dark:hover:shadow-slate-900/20 transition-all`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{category.icon}</span>
                    <div>
                      <h3 className="font-semibold">{category.category}</h3>
                      <p className="text-white/80 text-sm">{category.cards.length} tarjetas</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${selectedCategory.color} rounded-full flex items-center justify-center text-2xl`}>
              {selectedCategory.icon}
            </div>
            <h3 className="font-bold text-gray-800 dark:text-slate-200 mb-2">{selectedCategory.category}</h3>
            <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6 mb-6">
              <p className="text-gray-800 dark:text-slate-200 text-lg leading-relaxed">"{currentCard}"</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => drawSocialCard(selectedCategory)}
                className="flex-1 px-4 py-2 bg-slate-600 dark:bg-slate-600 text-white rounded-lg hover:bg-slate-700 dark:hover:bg-slate-500 transition-colors flex items-center justify-center space-x-2"
              >
                <Shuffle size={16} />
                <span>Otra carta</span>
              </button>
              <button
                onClick={() => {
                  setCurrentCard('');
                  setSelectedCategory(null);
                }}
                className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 transition-colors"
              >
                Cambiar categoría
              </button>
            </div>
          </div>
        )}
        
        <button
          onClick={() => {
            setSelectedMinigame(null);
            setCurrentCard('');
            setSelectedCategory(null);
          }}
          className="absolute top-4 right-4 p-2 text-gray-400 dark:text-slate-400 hover:text-gray-600 dark:hover:text-slate-200 transition-colors"
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );

  const FortuneCookieGame: React.FC = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={() => setShowFortune(false)}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-6xl mb-4">🥠</div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-200 mb-4">Tu Galleta de la Fortuna</h2>
        
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-700/50 dark:to-slate-600/50 rounded-xl p-6 mb-6 border border-amber-200 dark:border-slate-600">
          <p className="text-gray-800 dark:text-slate-200 text-lg italic leading-relaxed">"{currentFortune}"</p>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={openFortuneCookie}
            className="flex-1 px-4 py-2 bg-amber-500 dark:bg-amber-600 text-white rounded-lg hover:bg-amber-600 dark:hover:bg-amber-500 transition-colors flex items-center justify-center space-x-2"
          >
            <Gift size={16} />
            <span>Otra galleta</span>
          </button>
          <button
            onClick={() => setShowFortune(false)}
            className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 transition-colors"
          >
            Cerrar
          </button>
        </div>
        
        <button
          onClick={() => setShowFortune(false)}
          className="absolute top-4 right-4 p-2 text-gray-400 dark:text-slate-400 hover:text-gray-600 dark:hover:text-slate-200 transition-colors"
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );

  const publicFeed = getPublicFeed().filter(post => post.type === 'prompt_response'); // Solo respuestas a prompts
  const fortunePrompts = getFortuneCookiePrompts();

  return (
    <div className="lg:min-h-screen px-6 lg:px-8 pt-6 lg:pt-8 pb-4 lg:pb-8 max-w-6xl lg:mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-4"
        >
          <motion.button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-white/60 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} className="text-slate-600 dark:text-slate-300" />
          </motion.button>
          <div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-slate-200">Zona de Juegos</h1>
            <p className="text-sm text-gray-600 dark:text-slate-400">
              Minijuegos creativos para inspirarte y conectar
            </p>
          </div>
        </motion.div>

        {/* Estadísticas de gamificación */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-slate-600 to-slate-700 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Trophy className="text-yellow-400" size={24} />
              <h2 className="font-bold text-lg">Tu Progreso</h2>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="text-yellow-400 fill-current" size={16} />
              <span className="font-bold">{gameStats.points}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{gameStats.fortunesOpened}</div>
              <div className="text-white/80 text-xs">Galletas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{gameStats.cardsDrawn}</div>
              <div className="text-white/80 text-xs">Cartas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{gameStats.streak}</div>
              <div className="text-white/80 text-xs">Racha</div>
            </div>
          </div>
        </motion.div>

        {/* Minijuegos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-200 mb-4 flex items-center">
            <Gamepad2 className="mr-2 text-slate-600 dark:text-slate-300" />
            Minijuegos Disponibles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MinigameCard
              title="Galletas de la Fortuna"
              description="Mensajes inspiradores de la autora para acompañar tu jornada creativa"
              icon={<Gift size={24} />}
              color="from-amber-500 to-orange-500"
              onClick={openFortuneCookie}
              stats={`${gameStats.fortunesOpened} galletas abiertas`}
            />
            
            <MinigameCard
              title="Tarjetas Sociales"
              description="Preguntas perfectas para primera cita, nuevos amigos y romper el hielo"
              icon={<CreditCard size={24} />}
              color="from-indigo-500 to-purple-500"
              onClick={() => setSelectedMinigame('social-cards')}
              stats={`${gameStats.cardsDrawn} cartas reveladas`}
            />
          </div>
        </motion.div>

        {/* Próximamente */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-200 mb-4 flex items-center">
            <Timer className="mr-2 text-slate-600 dark:text-slate-300" />
            Próximamente
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200 dark:border-slate-600 rounded-xl p-6 opacity-50">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
                  <Target size={24} className="text-slate-500 dark:text-slate-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-slate-200">Desafíos Diarios</h3>
                  <p className="text-gray-600 dark:text-slate-400 text-sm">Retos creativos personalizados</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200 dark:border-slate-600 rounded-xl p-6 opacity-50">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
                  <Crown size={24} className="text-slate-500 dark:text-slate-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-slate-200">Torneos Creativos</h3>
                  <p className="text-gray-600 dark:text-slate-400 text-sm">Compite con otros creativos</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Modales de juegos */}
        <AnimatePresence>
          {selectedMinigame === 'social-cards' && <SocialCardGame />}
          {showFortune && <FortuneCookieGame />}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default CommunityView; 