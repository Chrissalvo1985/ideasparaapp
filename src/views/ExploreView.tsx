import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../stores/appStore';
import { useOptimizedAnimations } from '../utils/useResponsive';
import { getCategoryById, getCategoryPrompts, getActiveCategories } from '../data/categories';
import { 
  ArrowLeft, 
  ArrowRight,
  Shuffle, 
  Edit3, 
  Lightbulb,
  Target,
  Sparkles,
  Compass,
  BookOpen,
  Heart,
  Wind,
  Coffee,
  Moon,
  Sun,
  Feather,
  Palette,
  Music,
  Camera,
  Book,
  Zap
} from 'lucide-react';

const ExploreView: React.FC = () => {
  const navigate = useNavigate();
  const { 
    currentCategory, 
    setCurrentPrompt,
    setCurrentCategory,
    getRandomPrompt,
    categoryProgress
  } = useAppStore();
  
  // Usar animaciones optimizadas
  const { containerVariants, itemVariants } = useOptimizedAnimations();

  // Limpiar categoría al entrar a explore desde otras vistas
  useEffect(() => {
    // Solo limpiar si se viene de una URL directa o desde home
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.get('category')) {
      setCurrentCategory('');
    }
  }, [setCurrentCategory]);

  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const category = currentCategory ? getCategoryById(currentCategory) : null;
  const prompts = currentCategory ? getCategoryPrompts(currentCategory) : [];

  const handleCategorySelect = (categoryId: string) => {
    setCurrentCategory(categoryId);
  };

  // Colores específicos para cada categoría
  const getCategoryColor = (categoryId: string) => {
    const colors: Record<string, string> = {
      'personal': 'from-purple-500 to-pink-500',
      'creative': 'from-blue-500 to-cyan-500', 
      'philosophical': 'from-indigo-500 to-purple-500',
      'memories': 'from-amber-500 to-orange-500',
      'dreams': 'from-violet-500 to-purple-500',
      'gratitude': 'from-green-500 to-emerald-500',
      'challenges': 'from-red-500 to-pink-500',
      'future': 'from-cyan-500 to-blue-500'
    };
    return colors[categoryId] || 'from-gray-500 to-slate-500';
  };

  // Si no hay categoría seleccionada, mostrar selector
  if (!currentCategory || currentCategory === '') {
    return (
      <div className="px-4 lg:px-8 pt-4 lg:pt-8 pb-16 lg:pb-8 max-w-4xl lg:mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Header */}
          <motion.div variants={itemVariants}>
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 mb-4 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Volver
            </button>
            
            <div className="text-center mb-6 lg:mb-8">
              <h1 className="text-3xl lg:text-6xl font-black mb-3 lg:mb-4 bg-gradient-to-r from-gray-700 via-slate-600 to-gray-800 dark:from-gray-200 dark:via-slate-300 dark:to-gray-100 bg-clip-text text-transparent leading-tight">
                Ideas
              </h1>
              <p className="text-lg lg:text-2xl text-gray-600 dark:text-gray-300 font-light">
                para explorar
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 lg:mt-4 font-light">
                Elige una categoría para comenzar a explorar ideas específicas
              </p>
            </div>
          </motion.div>

          {/* Category Selection */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              {getActiveCategories().map((category) => {
                return (
                  <motion.button
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id)}
                    className="rounded-3xl p-6 lg:p-10 text-left shadow-2xl relative overflow-hidden group border border-gray-400 dark:border-gray-600"
                    style={{
                      background: `
                        linear-gradient(135deg, 
                          rgba(55, 65, 81, 0.95) 0%, 
                          rgba(75, 85, 99, 0.98) 50%, 
                          rgba(55, 65, 81, 0.95) 100%
                        ),
                        radial-gradient(circle at 30% 20%, rgba(156, 163, 175, 0.15) 0%, transparent 60%),
                        radial-gradient(circle at 70% 80%, rgba(209, 213, 219, 0.1) 0%, transparent 50%),
                        repeating-linear-gradient(
                          45deg,
                          transparent,
                          transparent 2px,
                          rgba(255, 255, 255, 0.02) 2px,
                          rgba(255, 255, 255, 0.02) 4px
                        )
                      `,
                      backgroundSize: '100% 100%, 300px 300px, 200px 200px, 20px 20px',
                      backdropFilter: 'blur(1px)'
                    }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    variants={itemVariants}
                  >
                    <div className="relative z-20">
                      {/* Category Name with Better Typography */}
                      <h3 className="text-2xl lg:text-4xl font-black mb-3 lg:mb-4 text-white leading-tight drop-shadow-sm">
                        {category.name}
                      </h3>
                      
                      {/* Subtitle with better contrast */}
                      <div className="space-y-1 lg:space-y-2 mb-4 lg:mb-6">
                        <p className="text-base lg:text-xl text-gray-100 font-light">
                          {category.title.replace('Ideas para', 'para').toLowerCase()}
                        </p>
                        <p className="text-xs lg:text-sm text-gray-200 font-light">
                          {category.prompts.length} ideas disponibles
                        </p>
                      </div>
                    </div>
                    
                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-gray-100/5 to-white/5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    
                    {/* Subtle border glow on hover */}
                    <div className="absolute inset-0 rounded-3xl ring-1 ring-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400">Categoría no encontrada</p>
          <button 
            onClick={() => navigate('/explore')}
            className="text-slate-600 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 mt-2 transition-colors"
          >
            Elegir categoría
          </button>
        </div>
      </div>
    );
  }

  const Icon = category.icon;

  const handlePromptSelect = (prompt: string) => {
    setSelectedPrompt(prompt);
    setCurrentPrompt(prompt);
  };

  const handleStartWriting = () => {
    if (selectedPrompt) {
      setCurrentPrompt(selectedPrompt);
      navigate('/write');
    }
  };

  const handleRandomPrompt = () => {
    getRandomPrompt(currentCategory || undefined);
    navigate('/write');
  };

  const progress = categoryProgress[currentCategory] || 0;
  const totalPrompts = prompts.length;
  const progressPercentage = totalPrompts > 0 ? Math.round((progress / totalPrompts) * 100) : 0;

  return (
    <div className="px-4 lg:px-8 pt-4 lg:pt-8 pb-16 lg:pb-8 max-w-4xl lg:mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <button
            onClick={() => setCurrentCategory('')}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 mb-4 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Volver a categorías
          </button>
          
          <div className="text-center mb-6 lg:mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className={`p-4 rounded-3xl bg-gradient-to-br ${getCategoryColor(currentCategory)} text-white shadow-lg`}>
                <Icon size={32} />
              </div>
            </div>
            
            <h1 className="text-2xl lg:text-4xl font-black mb-2 text-gray-800 dark:text-gray-200">
              {category.name}
            </h1>
            <p className="text-base lg:text-xl text-gray-600 dark:text-gray-300 font-light mb-4">
              {category.title.replace('Ideas para', 'para').toLowerCase()}
            </p>
            
            {/* Progress */}
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                <span>Progreso</span>
                <span>{progress}/{totalPrompts} ({progressPercentage}%)</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-slate-600 to-gray-700 dark:from-slate-500 dark:to-slate-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <motion.button
            onClick={handleRandomPrompt}
            className="p-4 bg-gradient-to-r from-slate-600 to-gray-700 dark:from-slate-700 dark:to-gray-800 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-3">
              <Shuffle size={24} />
              <div className="text-left">
                <h3 className="font-bold">Sorpréndeme</h3>
                <p className="text-sm text-white/90">Prompt aleatorio de esta categoría</p>
              </div>
            </div>
          </motion.button>

          <motion.button
            onClick={() => navigate('/write')}
            className="p-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200 dark:border-slate-600 rounded-2xl shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-3">
              <Edit3 size={24} className="text-slate-600 dark:text-slate-400" />
              <div className="text-left">
                <h3 className="font-bold text-gray-800 dark:text-gray-200">Escritura libre</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Sin prompts, solo tú y tus ideas</p>
              </div>
            </div>
          </motion.button>
        </motion.div>

        {/* Prompts Selection */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Ideas para explorar
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {prompts.length} prompts disponibles
            </span>
          </div>

          <div className="grid gap-4">
            {prompts.map((prompt, index) => (
              <motion.div
                key={`${currentCategory}-prompt-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  selectedPrompt === prompt
                    ? 'border-slate-400 dark:border-slate-500 bg-slate-50 dark:bg-slate-800 shadow-lg'
                    : 'border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-slate-800/60 hover:bg-white/80 dark:hover:bg-slate-800/80 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
                onClick={() => handlePromptSelect(prompt)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-gray-800 dark:text-white leading-relaxed mb-2">
                      {prompt}
                    </p>
                  </div>
                  
                  {selectedPrompt === prompt && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-3 p-2 bg-slate-600 dark:bg-slate-700 text-white rounded-full"
                    >
                      <Target size={16} />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Start Writing Button */}
        {selectedPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-20 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          >
            <motion.button
              onClick={handleStartWriting}
              className="px-8 py-4 bg-gradient-to-r from-slate-600 to-gray-700 dark:from-slate-700 dark:to-gray-800 text-white rounded-2xl shadow-2xl font-bold text-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center space-x-3">
                <Edit3 size={24} />
                <span>Comenzar a escribir</span>
                <ArrowRight size={20} />
              </div>
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ExploreView; 