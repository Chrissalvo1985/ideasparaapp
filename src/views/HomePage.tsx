import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../stores/appStore';
import { useOptimizedAnimations } from '../utils/useResponsive';
import { 
  Sparkles, 
  Edit3,
  Compass,
  BookOpen,
  TrendingUp,
  Calendar,
  Flame,
  Star,
  Clock,
  Zap,
  Target,
  Award,
  Coffee,
  Wind,
  Feather,
  ArrowRight,
  Heart,
  MessageCircle,
  Users,
  BookMarked,
  Lightbulb
} from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  // Usar selectores específicos para evitar re-renders
  const dailyQuote = useAppStore(state => state.dailyQuote);
  const diaryEntries = useAppStore(state => state.diaryEntries);
  const userProgress = useAppStore(state => state.userProgress);
  const setDailyQuote = useAppStore(state => state.setDailyQuote);
  const getRandomPrompt = useAppStore(state => state.getRandomPrompt);

  // Usar animaciones optimizadas
  const { containerVariants, itemVariants, staticVariants, isMobile } = useOptimizedAnimations();

  const [timeOfDay, setTimeOfDay] = useState('');
  const [userName] = useState(''); // Puedes agregar funcionalidad de nombre usuario

  // Memoizar funciones para evitar re-renders
  const initializeDailyQuote = useCallback(() => {
    if (!dailyQuote) {
      setDailyQuote();
    }
  }, [dailyQuote, setDailyQuote]);

  const handleSurpriseMe = useCallback(() => {
    getRandomPrompt();
    navigate('/write');
  }, [getRandomPrompt, navigate]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('Buenos días');
    else if (hour < 18) setTimeOfDay('Buenas tardes');
    else setTimeOfDay('Buenas noches');

    initializeDailyQuote();
  }, [initializeDailyQuote]);

  const quickActions = [
    {
      title: 'Explorar Ideas',
      description: 'Descubre nuevas categorías y prompts',
      icon: Compass,
      color: 'from-gray-600 to-gray-700',
      action: () => navigate('/explore')
    },
    {
      title: 'Modo Liberación',
      description: 'Suelta lo que ya no necesitas',
      icon: Wind,
      color: 'from-slate-600 to-slate-700',
      action: () => navigate('/liberation')
    },
    {
      title: 'Mis Escritos',
      description: 'Revisa tu diario personal',
      icon: BookOpen,
      color: 'from-zinc-600 to-zinc-700',
      action: () => navigate('/diary')
    },
    {
      title: 'Sorpréndeme',
      description: 'Prompt aleatorio para inspirarte',
      icon: Sparkles,
      color: 'from-stone-600 to-stone-700',
      action: handleSurpriseMe
    }
  ];

  const getStreakStatus = () => {
    const days = userProgress.consecutiveDays;
    if (days === 0) return { status: 'Comienza hoy', color: 'text-gray-600', icon: Target };
    if (days < 3) return { status: '¡Buen inicio!', color: 'text-green-600', icon: Star };
    if (days < 7) return { status: '¡En racha!', color: 'text-orange-600', icon: Flame };
    if (days < 30) return { status: '¡Increíble!', color: 'text-red-600', icon: Award };
    return { status: '¡Maestro!', color: 'text-slate-600', icon: Zap };
  };

  const streakInfo = getStreakStatus();
  const StreakIcon = streakInfo.icon;

  const getRecentEntries = () => {
    return diaryEntries?.slice(0, 3) || [];
  };

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - d.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Hoy';
    if (diffDays === 2) return 'Ayer';
    if (diffDays <= 7) return `Hace ${diffDays - 1} días`;
    return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="homepage-container px-6 lg:px-8 pt-6 lg:pt-8 pb-6 lg:pb-8 max-w-6xl lg:mx-auto">
      <motion.div
        variants={isMobile ? staticVariants : containerVariants}
        initial={isMobile ? false : "hidden"}
        animate={isMobile ? false : "visible"}
        className="homepage-content space-y-6 lg:space-y-8"
      >
        {/* Header con saludo personalizado */}
        <motion.div 
          variants={isMobile ? staticVariants : itemVariants} 
          className="text-center"
        >
          <div className="mb-4">
            <h1 className="text-4xl lg:text-6xl font-black mb-2 bg-gradient-to-r from-gray-700 via-slate-600 to-gray-800 bg-clip-text text-transparent leading-tight">
              Ideas
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 font-light">
              para conectar contigo
            </p>
          </div>
          <p className="text-sm text-gray-500 font-light">
            {timeOfDay}{userName && `, ${userName}`} ✨
          </p>
        </motion.div>

        {/* Quote del día - más prominente */}
        <motion.div 
          variants={isMobile ? staticVariants : itemVariants}
          className="bg-gradient-to-r from-slate-700 to-gray-800 rounded-2xl p-6 lg:p-8 text-white shadow-lg min-h-[120px] lg:min-h-[140px]"
          style={{ opacity: dailyQuote ? 1 : 0 }}
        >
          {dailyQuote && (
            <div className="flex items-start space-x-4">
              <div className="bg-white/20 p-3 rounded-full flex-shrink-0">
                <Sparkles size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-3 text-lg">
                  Inspiración del día
                </h3>
                <blockquote className="text-white/95 italic leading-relaxed text-lg lg:text-xl">
                  "{dailyQuote.text}"
                </blockquote>
                {dailyQuote.author && (
                  <p className="text-white/80 text-sm mt-3">
                    — {dailyQuote.author}
                  </p>
                )}
              </div>
            </div>
            )}
          </motion.div>

        {/* Stats Dashboard */}
        <motion.div variants={isMobile ? staticVariants : itemVariants}>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <TrendingUp size={20} className="mr-2 text-slate-600" />
            Tu Progreso
          </h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center border border-gray-200">
              <div className="text-2xl font-bold text-slate-700 mb-1">
                {diaryEntries?.length || 0}
              </div>
              <div className="text-xs text-gray-600">Ideas guardadas</div>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center border border-gray-200">
              <div className="flex items-center justify-center mb-1">
                <StreakIcon size={24} className="text-gray-600 mr-1" />
                <span className="text-2xl font-bold text-slate-700">
                  {userProgress.consecutiveDays}
                </span>
              </div>
              <div className="text-xs text-gray-600">Días consecutivos</div>
              <div className="text-xs mt-1 text-gray-600 font-medium">
                {streakInfo.status}
              </div>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center border border-gray-200">
              <div className="text-2xl font-bold text-slate-700 mb-1">
                {userProgress.categoriesExplored?.length || 0}
              </div>
              <div className="text-xs text-gray-600">Categorías exploradas</div>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center border border-gray-200">
              <div className="text-2xl font-bold text-slate-700 mb-1">
                {userProgress.liberationSessions || 0}
              </div>
              <div className="text-xs text-gray-600">Liberaciones</div>
            </div>
          </div>
        </motion.div>

        {/* Acciones Rápidas */}
        <motion.div variants={isMobile ? staticVariants : itemVariants}>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Zap size={20} className="mr-2 text-gray-600" />
            Acciones Rápidas
          </h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={index}
                  onClick={action.action}
                  className={`bg-gradient-to-br ${action.color} rounded-2xl p-4 lg:p-6 text-white text-left shadow-lg relative overflow-hidden group`}
                  whileHover={isMobile ? {} : { scale: 1.02, y: -2 }}
                  whileTap={isMobile ? {} : { scale: 0.98 }}
                >
                  <div className="relative z-10">
                    <Icon size={24} className="mb-3" />
                    <h3 className="font-semibold mb-2 text-sm lg:text-base">{action.title}</h3>
                    <p className="text-xs lg:text-sm text-white/80 line-clamp-2">{action.description}</p>
                  </div>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Actividad Reciente */}
        {getRecentEntries().length > 0 && (
          <motion.div variants={isMobile ? staticVariants : itemVariants}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                <Clock size={20} className="mr-2 text-slate-600" />
                Actividad Reciente
              </h2>
              <motion.button
                onClick={() => navigate('/diary')}
                className="text-slate-600 hover:text-slate-700 text-sm font-medium"
                whileHover={isMobile ? {} : { scale: 1.05 }}
              >
                Ver todo
              </motion.button>
            </div>
            
            <div className="space-y-3">
              {getRecentEntries().map((entry, index) => (
                <motion.div
                  key={entry.id}
                  className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200 hover:border-slate-300 transition-colors cursor-pointer"
                  whileHover={isMobile ? {} : { scale: 1.01 }}
                  onClick={() => navigate('/diary')}
                  variants={isMobile ? staticVariants : itemVariants}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800 text-sm line-clamp-1">
                        {entry.title}
                      </h3>
                      <p className="text-gray-600 text-xs mt-1 line-clamp-2">
                        {entry.content}
                      </p>
                    </div>
                    <div className="text-xs text-gray-500 ml-3 flex-shrink-0">
                      {formatDate(entry.date)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Mensaje motivacional si no hay actividad */}
        {getRecentEntries().length === 0 && (
          <motion.div variants={isMobile ? staticVariants : itemVariants}>
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-6 text-center border border-gray-200">
              <Coffee size={48} className="mx-auto text-slate-600 mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">
                ¡Tu aventura de escritura comienza aquí!
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Cada gran historia comienza con una primera palabra. 
                ¿Qué tal si empezamos hoy?
              </p>
              <motion.button
                onClick={() => {
                  getRandomPrompt();
                  navigate('/write');
                }}
                className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded-xl font-medium text-sm transition-colors"
                whileHover={isMobile ? {} : { scale: 1.05 }}
                whileTap={isMobile ? {} : { scale: 0.95 }}
              >
                Escribir mi primera idea
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default HomePage; 