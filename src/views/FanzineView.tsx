import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Heart, 
  MessageCircle,
  Share2,
  BookOpen,
  Sparkles,
  User,
  Crown,
  MessageSquare,
  TrendingUp,
  Clock,
  Users,
  Feather,
  Send
} from 'lucide-react';

interface AuthorPrompt {
  id: string;
  content: string;
  type: 'dream' | 'memory' | 'feeling' | 'story' | 'reflection' | 'challenge';
  emoji: string;
  timestamp: Date;
  responses: UserResponse[];
  totalLikes: number;
}

interface UserResponse {
  id: string;
  promptId: string;
  content: string;
  username: string;
  displayName: string;
  timestamp: Date;
  likes: number;
  comments: Comment[];
  isLiked: boolean;
  avatar: string;
}

interface Comment {
  id: string;
  username: string;
  content: string;
  timestamp: Date;
}

const FanzineView: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [newResponse, setNewResponse] = useState('');
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [activePrompt, setActivePrompt] = useState<AuthorPrompt | null>(null);

  // Mock data - Prompts de la autora
  const authorPrompts: AuthorPrompt[] = [
    {
      id: 'prompt-1',
      content: 'Describe un sueño reciente que aún te persigue. ¿Qué emociones te despertó?',
      type: 'dream',
      emoji: '🌙',
      timestamp: new Date('2024-01-15T08:30:00'),
      totalLikes: 45,
      responses: [
        {
          id: 'resp-1',
          promptId: 'prompt-1',
          content: 'Soñé que volaba sobre mi ciudad natal, pero todo estaba cubierto de agua cristalina. Sentí una mezcla de nostalgia y libertad que no puedo explicar.',
          username: '@soñadora_nocturna',
          displayName: 'Luna M.',
          timestamp: new Date('2024-01-15T14:20:00'),
          likes: 12,
          comments: [],
          isLiked: false,
          avatar: '🌙'
        },
        {
          id: 'resp-2',
          promptId: 'prompt-1',
          content: 'Mi abuela apareció en mi sueño después de 3 años. Me dijo "todo está bien, mi amor". Desperté llorando pero con una paz inmensa.',
          username: '@cartas_al_cielo',
          displayName: 'María S.',
          timestamp: new Date('2024-01-15T16:45:00'),
          likes: 28,
          comments: [],
          isLiked: true,
          avatar: '💫'
        }
      ]
    },
    {
      id: 'prompt-2', 
      content: 'Escribe sobre un objeto que guardas por razones que van más allá de su valor material.',
      type: 'memory',
      emoji: '📦',
      timestamp: new Date('2024-01-14T10:15:00'),
      totalLikes: 67,
      responses: [
        {
          id: 'resp-3',
          promptId: 'prompt-2',
          content: 'Tengo una cuchara de madera que usaba mi mamá para hacer sopa. Cada vez que la toco, huelo a laurel y escucho su risa en la cocina.',
          username: '@recetas_del_alma',
          displayName: 'Ana L.',
          timestamp: new Date('2024-01-14T15:30:00'),
          likes: 19,
          comments: [],
          isLiked: false,
          avatar: '🍲'
        },
        {
          id: 'resp-4',
          promptId: 'prompt-2',
          content: 'Una piedra que recogí en la playa donde me declaré a mi esposa. Parece una piedra común, pero es el testimonio de nuestro amor.',
          username: '@amor_eterno',
          displayName: 'Carlos R.',
          timestamp: new Date('2024-01-14T18:20:00'),
          likes: 31,
          comments: [],
          isLiked: true,
          avatar: '💍'
        }
      ]
    },
    {
      id: 'prompt-3',
      content: 'Si pudieras enviar una carta a tu yo de hace 10 años, ¿qué le dirías en una sola frase?',
      type: 'reflection',
      emoji: '✉️',
      timestamp: new Date('2024-01-13T16:00:00'),
      totalLikes: 89,
      responses: [
        {
          id: 'resp-5',
          promptId: 'prompt-3',
          content: '"Confía en ti, el camino que parece equivocado te llevará exactamente donde necesitas estar."',
          username: '@caminos_inesperados',
          displayName: 'Sofia V.',
          timestamp: new Date('2024-01-13T19:15:00'),
          likes: 42,
          comments: [],
          isLiked: true,
          avatar: '🛤️'
        }
      ]
    }
  ];

  const handleLikeResponse = (responseId: string) => {
    // Aquí se implementaría la lógica de likes
    console.log('Liked response:', responseId);
  };

  const handleOpenResponseModal = (prompt: AuthorPrompt) => {
    setActivePrompt(prompt);
    setShowResponseModal(true);
  };

  const handleSubmitResponse = () => {
    if (!newResponse.trim() || !activePrompt) return;
    
    // Aquí se enviaría la respuesta
    console.log('New response:', {
      promptId: activePrompt.id,
      content: newResponse,
      timestamp: new Date()
    });
    
    setNewResponse('');
    setShowResponseModal(false);
    setActivePrompt(null);
  };

  const getPromptTypeLabel = (type: string) => {
    const labels = {
      dream: 'Sueños',
      memory: 'Recuerdos', 
      feeling: 'Emociones',
      story: 'Historias',
      reflection: 'Reflexiones',
      challenge: 'Desafíos'
    };
    return labels[type as keyof typeof labels] || 'Prompt';
  };

  const PromptCard: React.FC<{ prompt: AuthorPrompt }> = ({ prompt }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-600 rounded-2xl p-6 mb-6 shadow-lg"
    >
      {/* Header de la autora */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
          <Crown size={20} className="text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-bold text-gray-800 dark:text-gray-100">La Autora</h3>
            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {prompt.timestamp.toLocaleDateString()} • {getPromptTypeLabel(prompt.type)}
          </p>
        </div>
        <span className="text-2xl">{prompt.emoji}</span>
      </div>

      {/* Contenido del prompt */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl p-4 mb-4 border border-amber-200 dark:border-amber-700">
        <p className="text-gray-800 dark:text-gray-100 text-lg leading-relaxed font-medium">
          "{prompt.content}"
        </p>
      </div>

      {/* Estadísticas y acciones */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
          <span className="flex items-center space-x-1">
            <MessageCircle size={16} />
            <span>{prompt.responses.length} respuestas</span>
          </span>
          <span className="flex items-center space-x-1">
            <Heart size={16} />
            <span>{prompt.totalLikes} likes</span>
          </span>
        </div>
        
        <button
          onClick={() => handleOpenResponseModal(prompt)}
          className="px-4 py-2 bg-gradient-to-r from-slate-600 to-slate-700 dark:from-slate-700 dark:to-slate-800 text-white rounded-lg hover:from-slate-700 hover:to-slate-800 dark:hover:from-slate-600 dark:hover:to-slate-700 transition-all flex items-center space-x-2"
        >
          <Feather size={16} />
          <span>Responder</span>
        </button>
      </div>

      {/* Respuestas destacadas */}
      {prompt.responses.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
            <Sparkles size={16} className="mr-2" />
            Respuestas destacadas
          </h4>
          <div className="space-y-3">
            {prompt.responses.slice(0, 2).map((response) => (
              <ResponseCard key={response.id} response={response} compact />
            ))}
          </div>
          {prompt.responses.length > 2 && (
            <button className="text-slate-600 dark:text-slate-400 text-sm mt-3 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
              Ver todas las respuestas ({prompt.responses.length})
            </button>
          )}
        </div>
      )}
    </motion.div>
  );

  const ResponseCard: React.FC<{ response: UserResponse; compact?: boolean }> = ({ response, compact = false }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`${compact ? 'bg-slate-50 dark:bg-slate-700/50 p-3' : 'bg-white/60 dark:bg-slate-700/60 p-4'} rounded-xl border border-slate-200 dark:border-slate-600`}
    >
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-slate-400 to-slate-500 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm">{response.avatar}</span>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <h4 className={`font-medium text-gray-800 dark:text-gray-100 ${compact ? 'text-sm' : ''}`}>
              {response.displayName}
            </h4>
            <span className={`text-slate-500 dark:text-slate-400 ${compact ? 'text-xs' : 'text-sm'}`}>
              {response.username}
            </span>
            <span className={`text-gray-400 dark:text-gray-500 ${compact ? 'text-xs' : 'text-sm'}`}>•</span>
            <span className={`text-gray-400 dark:text-gray-500 ${compact ? 'text-xs' : 'text-sm'}`}>
              {response.timestamp.toLocaleDateString()}
            </span>
          </div>
          
          <p className={`text-gray-700 dark:text-gray-300 leading-relaxed mb-3 ${compact ? 'text-sm' : ''}`}>
            {response.content}
          </p>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleLikeResponse(response.id)}
              className={`flex items-center space-x-1 text-sm transition-colors ${
                response.isLiked 
                  ? 'text-red-500' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-red-500'
              }`}
            >
              <Heart size={16} className={response.isLiked ? 'fill-current' : ''} />
              <span>{response.likes}</span>
            </button>
            
            <button className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
              <MessageCircle size={16} />
              <span>{response.comments.length}</span>
            </button>
            
            <button className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
              <Share2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const ResponseModal: React.FC = () => (
    <AnimatePresence>
      {showResponseModal && activePrompt && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowResponseModal(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Responder al Prompt
              </h2>
              
              <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/30 rounded-xl border border-amber-200 dark:border-amber-700">
                <p className="text-sm text-amber-800 dark:text-amber-200 font-medium">
                  "{activePrompt.content}"
                </p>
              </div>
              
              <textarea
                value={newResponse}
                onChange={(e) => setNewResponse(e.target.value)}
                placeholder="Comparte tu respuesta..."
                className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-slate-500 dark:focus:ring-slate-400 dark:focus:border-slate-400 resize-none bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
              
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {newResponse.length}/500 caracteres
                </span>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowResponseModal(false)}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSubmitResponse}
                    disabled={!newResponse.trim()}
                    className="px-4 py-2 bg-slate-600 dark:bg-slate-700 text-white rounded-lg hover:bg-slate-700 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                  >
                    <Send size={16} />
                    <span>Publicar</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="lg:min-h-screen px-6 lg:px-8 pt-6 lg:pt-8 pb-4 lg:pb-8 bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50 dark:from-slate-900 dark:via-slate-800 dark:to-gray-900 max-w-4xl lg:mx-auto">
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
            className="p-2 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200 dark:border-slate-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} className="text-slate-600 dark:text-slate-300" />
          </motion.button>
          <div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">Feed Creativo</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Prompts de la autora y respuestas de la comunidad
            </p>
          </div>
        </motion.div>

        {/* Stats Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-slate-600 to-slate-700 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="text-amber-400" size={24} />
              <h2 className="font-bold text-lg">Actividad Semanal</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{authorPrompts.length}</div>
              <div className="text-white/80 text-sm">Prompts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {authorPrompts.reduce((acc, p) => acc + p.responses.length, 0)}
              </div>
              <div className="text-white/80 text-sm">Respuestas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {authorPrompts.reduce((acc, p) => acc + p.totalLikes, 0)}
              </div>
              <div className="text-white/80 text-sm">Likes</div>
            </div>
          </div>
        </motion.div>

        {/* Feed de Prompts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {authorPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </motion.div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <button className="px-6 py-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-white/80 dark:hover:bg-slate-700/80 transition-all">
            Cargar más prompts
          </button>
        </motion.div>
      </motion.div>

      <ResponseModal />
    </div>
  );
};

export default FanzineView; 