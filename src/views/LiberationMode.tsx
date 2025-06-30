import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../stores/appStore';
import { emotions } from '../data/emotions';
import { 
  ArrowLeft, 
  Flame, 
  Trash2, 
  Archive, 
  Wind,
  Save,
  RotateCcw
} from 'lucide-react';

const LiberationMode: React.FC = () => {
  const navigate = useNavigate();
  const { saveLiberationSession } = useAppStore();
  
  const [content, setContent] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [selectedAction, setSelectedAction] = useState<'burn' | 'tear' | 'bury' | 'release' | ''>('');
  const [isDestroying, setIsDestroying] = useState(false);
  const [isDestroyed, setIsDestroyed] = useState(false);
  const [keepCopy, setKeepCopy] = useState(false);

  const actions = [
    {
      id: 'burn',
      name: 'Quemar',
      icon: Flame,
      color: 'from-slate-500 to-slate-700',
      description: 'Deja que las llamas transformen tu dolor en liberación'
    },
    {
      id: 'tear',
      name: 'Romper',
      icon: Trash2,
      color: 'from-gray-500 to-gray-700',
      description: 'Destroza en pedazos lo que ya no necesitas'
    },
    {
      id: 'bury',
      name: 'Enterrar',
      icon: Archive,
      color: 'from-stone-500 to-stone-700',
      description: 'Entierra profundamente para que florezca algo nuevo'
    },
    {
      id: 'release',
      name: 'Soltar al Viento',
      icon: Wind,
      color: 'from-zinc-500 to-zinc-700',
      description: 'Deja que el viento se lleve lo que ya no es tuyo'
    }
  ] as const;

  const handleDestroy = async () => {
    if (!content.trim() || !selectedAction || !selectedEmotion) return;
    
    setIsDestroying(true);
    
    // Simulate destruction animation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Save the liberation session
    saveLiberationSession({
      content: keepCopy ? content : '[CONTENIDO LIBERADO]',
      emotion: selectedEmotion,
      action: selectedAction,
      isDestroyed: !keepCopy
    });
    
    setIsDestroyed(true);
    setIsDestroying(false);
  };

  const handleReset = () => {
    setContent('');
    setSelectedEmotion('');
    setSelectedAction('');
    setIsDestroyed(false);
    setKeepCopy(false);
  };

  const selectedEmotionData = emotions.find(e => e.id === selectedEmotion);
  const selectedActionData = actions.find(a => a.id === selectedAction);

  return (
    <div className="lg:min-h-screen px-6 lg:px-8 pt-6 lg:pt-8 pb-4 lg:pb-8 max-w-4xl lg:mx-auto">
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
            className="p-2 rounded-full bg-white/60 backdrop-blur-sm border border-slate-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} className="text-slate-600" />
          </motion.button>
          <div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">Modo Liberación</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Suelta lo que ya no necesitas llevar
            </p>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isDestroyed ? (
            <motion.div
              key="liberation-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Introduction */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-slate-50 to-stone-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 border border-slate-200 dark:border-slate-600"
              >
                <div className="flex items-start space-x-3">
                  <div className="bg-slate-100 dark:bg-slate-600 p-2 rounded-full flex-shrink-0">
                    <Flame size={16} className="text-slate-600 dark:text-slate-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">
                      Un espacio sagrado para soltar
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                      Escribe aquí lo que quieres liberar: una emoción, un pensamiento, 
                      una experiencia que ya no te sirve. Después, elige cómo quieres 
                      soltarlo simbólicamente.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Emotion Selector */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
                  ¿Qué emoción quieres liberar?
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {emotions.map((emotion) => (
                    <motion.button
                      key={emotion.id}
                      onClick={() => setSelectedEmotion(emotion.id)}
                      className={`p-3 rounded-xl border transition-all ${
                        selectedEmotion === emotion.id
                          ? 'border-slate-400 dark:border-slate-500 bg-slate-100 dark:bg-slate-700 scale-105'
                          : 'border-gray-200 dark:border-slate-600 bg-white/50 dark:bg-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-700/80'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title={emotion.name}
                    >
                      <span className="text-2xl block">{emotion.icon}</span>
                      <span className="text-xs text-gray-600 dark:text-gray-300 mt-1 block">
                        {emotion.name}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Writing Area */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-600 overflow-hidden"
              >
                <textarea
                  placeholder="Escribe aquí lo que quieres soltar... Puede ser una carta a alguien, un miedo, un dolor, una situación que te pesa. Déjalo fluir sin censura."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full h-48 p-4 bg-transparent resize-none focus:outline-none placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 leading-relaxed"
                />
              </motion.div>

              {/* Action Selector */}
              {content.trim() && selectedEmotion && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <label className="block text-sm font-medium text-gray-700">
                    ¿Cómo quieres liberarlo?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {actions.map((action) => {
                      const Icon = action.icon;
                      return (
                        <motion.button
                          key={action.id}
                          onClick={() => setSelectedAction(action.id)}
                          className={`bg-gradient-to-br ${action.color} rounded-2xl p-4 text-white text-left relative overflow-hidden ${
                            selectedAction === action.id ? 'ring-2 ring-white ring-offset-2' : ''
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Icon size={24} className="mb-2" />
                          <h4 className="font-semibold mb-1">{action.name}</h4>
                          <p className="text-sm text-white/80 leading-relaxed">
                            {action.description}
                          </p>
                          {selectedAction === action.id && (
                            <motion.div
                              layoutId="selected-action"
                              className="absolute inset-0 bg-white/20"
                              initial={false}
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Keep Copy Option */}
              {content.trim() && selectedAction && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Save size={18} className="text-gray-600" />
                      <div>
                        <span className="text-sm font-medium block">
                          Guardar una copia privada
                        </span>
                        <span className="text-xs text-gray-500">
                          Podrás revisar este proceso más tarde
                        </span>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => setKeepCopy(!keepCopy)}
                                              className={`w-12 h-6 rounded-full transition-colors ${
                        keepCopy ? 'bg-slate-600' : 'bg-gray-300'
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="w-5 h-5 bg-white rounded-full shadow-md"
                        animate={{ x: keepCopy ? 26 : 2 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Liberation Button */}
              {content.trim() && selectedAction && selectedEmotion && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={handleDestroy}
                  disabled={isDestroying}
                  className={`w-full bg-gradient-to-r ${selectedActionData?.color} text-white rounded-2xl p-4 font-semibold text-lg shadow-lg ${
                    isDestroying ? 'opacity-50' : ''
                  }`}
                  whileHover={{ scale: isDestroying ? 1 : 1.02 }}
                  whileTap={{ scale: isDestroying ? 1 : 0.98 }}
                >
                  {isDestroying ? (
                    <div className="flex items-center justify-center space-x-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>Liberando...</span>
                    </div>
                  ) : (
                    `${selectedActionData?.name} y Liberar`
                  )}
                </motion.button>
              )}
            </motion.div>
          ) : (
            // Success State
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6 py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full mx-auto flex items-center justify-center"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-4xl text-white"
                >
                  ✨
                </motion.span>
              </motion.div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-800">
                  ¡Liberado!
                </h2>
                <p className="text-gray-600 max-w-sm mx-auto leading-relaxed">
                  Has soltado lo que ya no necesitabas. Observa cómo te sientes ahora. 
                  Este es tu primer paso hacia la libertad emocional.
                </p>
              </div>

              <div className="space-y-3">
                <motion.button
                  onClick={handleReset}
                  className="w-full bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-xl p-3 font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <RotateCcw size={18} className="inline mr-2" />
                  Liberar algo más
                </motion.button>
                
                <motion.button
                  onClick={() => navigate('/')}
                  className="w-full bg-white/60 backdrop-blur-sm border border-slate-200 text-slate-700 rounded-xl p-3 font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Volver al inicio
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Destruction Animation Overlay */}
      <AnimatePresence>
        {isDestroying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-8 mx-6 text-center space-y-4"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  ease: "easeInOut"
                }}
                className="text-6xl"
              >
                {selectedActionData?.id === 'burn' ? '🔥' :
                 selectedActionData?.id === 'tear' ? '💥' :
                 selectedActionData?.id === 'bury' ? '🌱' : '💨'}
              </motion.div>
              <h3 className="text-lg font-semibold text-gray-800">
                {selectedActionData?.id === 'burn' ? 'Las llamas transforman tu dolor...' :
                 selectedActionData?.id === 'tear' ? 'Rompiendo las cadenas...' :
                 selectedActionData?.id === 'bury' ? 'Plantando semillas de renovación...' : 
                 'El viento se lleva tu carga...'}
              </h3>
              <p className="text-sm text-gray-600">
                Respira profundo y siente cómo se libera
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LiberationMode; 