import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../stores/appStore';
import { getCategoryById, getCategoryPrompts, getActiveCategories } from '../data/categories';
import { 
  ArrowLeft, 
  ArrowRight,
  Shuffle, 
  Edit3, 
  Lightbulb,
  Target,
  Sparkles,
  Compass
} from 'lucide-react';

const ExploreView: React.FC = () => {
  const navigate = useNavigate();
  const { 
    currentCategory, 
    setCurrentPrompt,
    setCurrentCategory,
    getRandomPrompt 
  } = useAppStore();

  // Limpiar categoría al entrar a explore desde otras vistas
  useEffect(() => {
    // Solo limpiar si se viene de una URL directa o desde home
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.get('category')) {
      setCurrentCategory('');
    }
  }, [setCurrentCategory]);

  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const category = currentCategory ? getCategoryById(currentCategory) : null;
  const prompts = currentCategory ? getCategoryPrompts(currentCategory) : [];

  const handleCategorySelect = (categoryId: string) => {
    setCurrentCategory(categoryId);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  // No redirigir automáticamente, mostrar selector de categorías
  // useEffect(() => {
  //   if (!currentCategory) {
  //     navigate('/');
  //   }
  // }, [currentCategory, navigate]);

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
              className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
            >
              <ArrowLeft size={20} className="mr-2" />
              Volver
            </button>
            
            <div className="text-center mb-6 lg:mb-8">
              <h1 className="text-3xl lg:text-6xl font-black mb-3 lg:mb-4 bg-gradient-to-r from-gray-700 via-slate-600 to-gray-800 bg-clip-text text-transparent leading-tight">
                Ideas
              </h1>
              <p className="text-lg lg:text-2xl text-gray-600 font-light">
                para explorar
              </p>
              <p className="text-sm text-gray-500 mt-3 lg:mt-4 font-light">
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
                    className="rounded-3xl p-6 lg:p-10 text-left shadow-2xl relative overflow-hidden group border border-gray-400"
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
                        <p className="text-base lg:text-xl text-gray-200 font-light">
                          {category.title.replace('Ideas para', 'para').toLowerCase()}
                        </p>
                        <p className="text-xs lg:text-sm text-gray-300 font-light">
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
          <p className="text-gray-500">Categoría no encontrada</p>
          <button 
            onClick={() => navigate('/explore')}
            className="text-slate-600 hover:text-slate-700 mt-2"
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
    } else {
      setCurrentPrompt(null);
    }
    navigate('/write');
  };

  const handleRandomPrompt = () => {
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setSelectedPrompt(randomPrompt);
    setCurrentPrompt(randomPrompt);
  };

  return (
    <div className="px-4 lg:px-8 pt-4 lg:pt-8 pb-16 lg:pb-8 max-w-4xl lg:mx-auto">
              <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4 lg:space-y-6"
        >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center space-x-4 mb-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft size={20} className="mr-2" />
              Inicio
            </button>
            <span className="text-gray-400">•</span>
            <button
              onClick={() => setCurrentCategory('')}
              className="flex items-center text-slate-600 hover:text-slate-700"
            >
              <Compass size={20} className="mr-2" />
              Ver todas las categorías
            </button>
          </div>
          
          <div className={`bg-gradient-to-br ${category.gradient} rounded-2xl p-6 text-white mb-6`}>
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-full">
                <Icon size={32} />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{category.title}</h1>
                <p className="text-white/80">{category.description}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Prompts Section */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <Lightbulb size={20} className="mr-2 text-slate-600" />
              Ideas para empezar
            </h2>
            <motion.button
              onClick={handleRandomPrompt}
              className="flex items-center text-slate-600 hover:text-slate-700 text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Shuffle size={16} className="mr-1" />
              Aleatorio
            </motion.button>
          </div>

          <div className="grid gap-3">
            {prompts.map((prompt, index) => (
              <motion.button
                key={index}
                onClick={() => handlePromptSelect(prompt)}
                className={`text-left p-4 rounded-xl border-2 transition-all ${
                  selectedPrompt === prompt
                    ? `border-${category.color}-400 bg-${category.color}-50`
                    : 'border-gray-200 bg-white/60 hover:border-gray-300 hover:bg-white/80'
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                variants={itemVariants}
              >
                <div className="flex items-center justify-between">
                  <p className="text-gray-700 font-medium">{prompt}</p>
                  {selectedPrompt === prompt && (
                    <Target size={16} className={`text-${category.color}-600`} />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div variants={itemVariants} className="space-y-3">
          <motion.button
            onClick={handleStartWriting}
            className={`w-full bg-gradient-to-r ${category.gradient} text-white font-semibold py-4 px-6 rounded-xl shadow-lg flex items-center justify-center space-x-2`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Edit3 size={20} />
            <span>
              {selectedPrompt ? 'Escribir sobre esta idea' : 'Escritura libre'}
            </span>
          </motion.button>

          <motion.button
            onClick={() => {
              getRandomPrompt();
              navigate('/write');
            }}
            className="w-full bg-white/60 backdrop-blur-sm text-gray-700 font-semibold py-4 px-6 rounded-xl border border-gray-200 hover:bg-white/80 flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Sparkles size={20} />
            <span>Sorpréndeme</span>
          </motion.button>
        </motion.div>

        {/* Tips Section */}
        <motion.div variants={itemVariants}>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-2">💡 Consejos</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• No te preocupes por la perfección, solo escribe</li>
              <li>• Usa estos prompts como punto de partida</li>
              <li>• Déjate llevar por tus pensamientos</li>
              <li>• No hay respuestas correctas o incorrectas</li>
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ExploreView; 