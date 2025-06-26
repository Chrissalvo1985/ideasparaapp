import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../stores/appStore';
import { emotions } from '../data/emotions';
import { writingPrompts } from '../data/prompts';
import { ArrowLeft, Edit3, Shuffle, Sparkles } from 'lucide-react';

const EmotionExplorer: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentEmotion, setCurrentPrompt, getRandomPrompt } = useAppStore();
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

  const selectedEmotionData = emotions.find(e => e.id === selectedEmotion);
  const emotionPrompts = writingPrompts.filter(p => p.emotion === selectedEmotion);

  const handleEmotionSelect = (emotion: typeof emotions[0]) => {
    setSelectedEmotion(emotion.id);
    setCurrentEmotion(emotion);
  };

  const handlePromptSelect = (prompt: typeof writingPrompts[0]) => {
    setCurrentPrompt(prompt);
    navigate('/write');
  };

  const handleRandomPrompt = () => {
    if (selectedEmotion) {
      getRandomPrompt(selectedEmotion);
      navigate('/write');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="lg:min-h-screen px-6 lg:px-8 pt-6 lg:pt-8 pb-4 lg:pb-8 max-w-6xl lg:mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6 lg:space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex items-center space-x-4">
          <motion.button
            onClick={() => selectedEmotion ? setSelectedEmotion(null) : navigate('/')}
            className="p-2 rounded-full bg-white/60 backdrop-blur-sm border border-purple-100"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} className="text-purple-600" />
          </motion.button>
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              {selectedEmotion ? selectedEmotionData?.name : 'Explorador de Emociones'}
            </h1>
            <p className="text-sm text-gray-600">
              {selectedEmotion 
                ? 'Conecta con prompts específicos para esta emoción'
                : 'Selecciona cómo te sientes hoy'
              }
            </p>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!selectedEmotion ? (
            // Emotion Grid
            <motion.div
              key="emotions"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6"
            >
              {emotions.map((emotion) => (
                <motion.button
                  key={emotion.id}
                  variants={itemVariants}
                  onClick={() => handleEmotionSelect(emotion)}
                  className="relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-purple-100 text-left overflow-hidden group"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ 
                    boxShadow: `0 4px 20px ${emotion.color}20` 
                  }}
                >
                  <div className="relative z-10">
                    <div 
                      className="text-3xl mb-3 p-3 rounded-xl w-fit"
                      style={{ backgroundColor: `${emotion.color}20` }}
                    >
                      {emotion.icon}
                    </div>
                    <h3 
                      className="font-semibold text-lg mb-2"
                      style={{ color: emotion.color }}
                    >
                      {emotion.name}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {emotion.description}
                    </p>
                  </div>
                  
                  {/* Hover overlay */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
                    style={{ backgroundColor: emotion.color }}
                  />
                </motion.button>
              ))}
            </motion.div>
          ) : (
            // Selected Emotion View
            <motion.div
              key="selected"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-6"
            >
              {/* Emotion Card */}
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-white/70 to-white/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-100"
                style={{ 
                  boxShadow: `0 8px 32px ${selectedEmotionData?.color}20` 
                }}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div 
                    className="text-4xl p-4 rounded-xl"
                    style={{ backgroundColor: `${selectedEmotionData?.color}20` }}
                  >
                    {selectedEmotionData?.icon}
                  </div>
                  <div>
                    <h2 
                      className="text-2xl font-bold mb-1"
                      style={{ color: selectedEmotionData?.color }}
                    >
                      {selectedEmotionData?.name}
                    </h2>
                    <p className="text-gray-600">
                      {selectedEmotionData?.description}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <motion.button
                    onClick={handleRandomPrompt}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-3 flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Shuffle size={18} />
                    <span className="font-medium">Prompt Aleatorio</span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Prompts */}
              {emotionPrompts.length > 0 && (
                <motion.div variants={itemVariants}>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                    <Sparkles size={20} className="text-purple-600" />
                    <span>Prompts para {selectedEmotionData?.name}</span>
                  </h3>
                  
                  <div className="space-y-3">
                    {emotionPrompts.map((prompt) => (
                      <motion.button
                        key={prompt.id}
                        onClick={() => handlePromptSelect(prompt)}
                        className="w-full bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-purple-100 text-left group hover:bg-white/80 transition-colors"
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span 
                                className={`px-2 py-1 rounded-full text-xs font-medium text-white ${
                                  prompt.difficulty === 'easy' 
                                    ? 'bg-green-500' 
                                    : prompt.difficulty === 'medium' 
                                    ? 'bg-yellow-500' 
                                    : 'bg-red-500'
                                }`}
                              >
                                {prompt.difficulty === 'easy' ? 'Fácil' : 
                                 prompt.difficulty === 'medium' ? 'Medio' : 'Avanzado'}
                              </span>
                              <span 
                                className="px-2 py-1 rounded-full text-xs font-medium"
                                style={{ 
                                  backgroundColor: `${selectedEmotionData?.color}20`,
                                  color: selectedEmotionData?.color 
                                }}
                              >
                                {prompt.category === 'creative' ? 'Creativo' :
                                 prompt.category === 'emotional' ? 'Emocional' :
                                 prompt.category === 'guided' ? 'Guiado' : 'Liberación'}
                              </span>
                            </div>
                            <p className="text-gray-700 leading-relaxed">
                              {prompt.text}
                            </p>
                          </div>
                          <Edit3 
                            size={18} 
                            className="text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity ml-3 flex-shrink-0" 
                          />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default EmotionExplorer; 