import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Heart, 
  Lightbulb, 
  Sparkles, 
  BookOpen,
  Filter,
  Quote,
  Shuffle
} from 'lucide-react';
import { getAllInspirations, getInspirationsByCategory, getInspirationsByType } from '../data/inspirations';
import type { Inspiration } from '../data/inspirations';
import { categories } from '../data/categories';
import HandwrittenInspiration from '../components/HandwrittenInspiration';
import { useOptimizedAnimations } from '../utils/useResponsive';
import { dailyQuotes } from '../data/quotes';
import { inspirations } from '../data/inspirations';

const InspirationView: React.FC = () => {
  const navigate = useNavigate();
  const { containerVariants, itemVariants } = useOptimizedAnimations();

  const [selectedFilter, setSelectedFilter] = useState<'all' | 'category' | 'type'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [currentQuote, setCurrentQuote] = useState(dailyQuotes[0]);
  const [currentInspiration, setCurrentInspiration] = useState(inspirations[0]);
  const [activeTab, setActiveTab] = useState<'quotes' | 'inspirations'>('quotes');
  const [favoriteQuotes, setFavoriteQuotes] = useState<string[]>([]);
  const [favoriteInspirations, setFavoriteInspirations] = useState<string[]>([]);

  const allInspirations = getAllInspirations();

  const filteredInspirations = useMemo(() => {
    if (selectedFilter === 'category' && selectedCategory) {
      return getInspirationsByCategory(selectedCategory);
    }
    if (selectedFilter === 'type' && selectedType) {
      return getInspirationsByType(selectedType);
    }
    return allInspirations;
  }, [selectedFilter, selectedCategory, selectedType, allInspirations]);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * dailyQuotes.length);
    setCurrentQuote(dailyQuotes[randomIndex]);
  };

  const getRandomInspiration = () => {
    const randomIndex = Math.floor(Math.random() * inspirations.length);
    setCurrentInspiration(inspirations[randomIndex]);
  };

  const typeLabels = {
    'tip': 'Consejos',
    'quote': 'Citas',
    'encouragement': 'Ánimo',
    'reflection': 'Reflexiones'
  };

  const typeIcons = {
    'tip': Lightbulb,
    'quote': Quote,
    'encouragement': Heart,
    'reflection': BookOpen
  };

  return (
    <div className="px-6 lg:px-8 pt-6 lg:pt-8 pb-16 lg:pb-8 max-w-6xl lg:mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <motion.button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200 dark:border-slate-600 mb-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} className="text-slate-600 dark:text-slate-300" />
          </motion.button>
          
          <div className="text-center mb-6">
            <h1 className="text-3xl lg:text-5xl font-black mb-3 bg-gradient-to-r from-gray-700 via-slate-600 to-gray-800 dark:from-gray-200 dark:via-slate-300 dark:to-gray-100 bg-clip-text text-transparent leading-tight">
              Inspiración
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 font-light">
              palabras para acompañarte
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-light">
              Mensajes, consejos y reflexiones para nutrir tu alma escritora
            </p>
          </div>
        </motion.div>

        {/* Filtros */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center space-x-2 mb-4">
            <Filter size={16} className="text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">Filtrar por:</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                selectedFilter === 'all'
                  ? 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-600'
              }`}
            >
              Todas
            </button>
            
            <button
              onClick={() => setSelectedFilter('category')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                selectedFilter === 'category'
                  ? 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-600'
              }`}
            >
              Por Categoría
            </button>
            
            <button
              onClick={() => setSelectedFilter('type')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                selectedFilter === 'type'
                  ? 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-600'
              }`}
            >
              Por Tipo
            </button>
          </div>

          {/* Subfiltros */}
          {selectedFilter === 'category' && (
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.filter(cat => cat.isActive).map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                    selectedCategory === category.id
                      ? 'bg-slate-600 dark:bg-slate-700 text-white border-slate-600 dark:border-slate-700'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-600'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}

          {selectedFilter === 'type' && (
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.entries(typeLabels).map(([type, label]) => {
                const Icon = typeIcons[type as keyof typeof typeIcons];
                return (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                      selectedType === type
                        ? 'bg-slate-600 dark:bg-slate-700 text-white border-slate-600 dark:border-slate-700'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    <Icon size={12} />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Contador */}
        <motion.div variants={itemVariants}>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            {filteredInspirations.length} inspiraciones encontradas
          </p>
        </motion.div>

        {/* Lista de Inspiraciones */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredInspirations.map((inspiration, index) => (
              <motion.div
                key={inspiration.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
              >
                <HandwrittenInspiration inspiration={inspiration} />
                
                {/* Metadatos */}
                <div className="flex items-center justify-between mt-3 px-2">
                  <div className="flex items-center space-x-2">
                    {inspiration.category && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full font-medium">
                        {categories.find(c => c.id === inspiration.category)?.name || inspiration.category}
                      </span>
                    )}
                    {inspiration.type && (
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs rounded-full font-medium flex items-center space-x-1">
                        {React.createElement(typeIcons[inspiration.type as keyof typeof typeIcons], { size: 10 })}
                        <span>{typeLabels[inspiration.type as keyof typeof typeLabels]}</span>
                      </span>
                    )}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                  >
                    <Heart size={12} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mensaje si no hay resultados */}
        {filteredInspirations.length === 0 && (
          <motion.div variants={itemVariants}>
            <div className="text-center py-12">
              <Sparkles size={48} className="text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
                No hay inspiraciones para este filtro
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Intenta con otro filtro o explora todas las inspiraciones
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default InspirationView; 