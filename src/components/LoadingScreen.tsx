import React, { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { Feather, Sparkles, Heart, Lightbulb } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const loadingPhrases = [
  "Preparando tu espacio de escritura...",
  "Afinando la inspiración...", 
  "Organizando tus pensamientos...",
  "Conectando con tu creatividad...",
  "Despertando nuevas ideas...",
  "Creando tu refugio creativo..."
];

const LoadingScreen: React.FC<LoadingScreenProps> = memo(({ onComplete }) => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleComplete = useCallback(() => {
    setTimeout(() => onComplete(), 1000);
  }, [onComplete]);

  useEffect(() => {
    // Cambiar frases más lentamente
    const phraseInterval = setInterval(() => {
      setCurrentPhrase(prev => (prev + 1) % loadingPhrases.length);
    }, 1800); // Cambió de 800ms a 1800ms

    // Simular progreso de carga más gradual
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(phraseInterval);
          handleComplete();
          return 100;
        }
        // Progreso más lento: entre 2-6% cada 300ms
        return prev + Math.random() * 4 + 2;
      });
    }, 300); // Cambió de 200ms a 300ms

    return () => {
      clearInterval(phraseInterval);
      clearInterval(progressInterval);
    };
  }, [handleComplete]);

  const floatingElements = [
    { icon: Feather, delay: 0, x: '5%', y: '10%' },
    { icon: Sparkles, delay: 1, x: '92%', y: '15%' },
    { icon: Heart, delay: 2, x: '8%', y: '88%' },
  ];

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 font-1 overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, var(--color-4) 0%, var(--color-7) 100%)` 
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Elementos flotantes sutiles */}
      {floatingElements.map((element, index) => {
        const IconComponent = element.icon;
        return (
          <motion.div
            key={index}
            className="absolute -z-10"
            style={{ 
              left: element.x, 
              top: element.y,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.06, 0],
              scale: [0, 1, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 8,
              delay: element.delay + 2,
              repeat: Infinity,
              repeatDelay: 6,
              ease: "easeInOut"
            }}
          >
            <IconComponent size={24} className="text-slate-300" />
          </motion.div>
        );
      })}

      {/* Main content centrado en el logo gigante */}
      <div className="text-center max-w-lg mx-auto px-6 h-full flex flex-col justify-center">
        
        {/* Contenido principal centrado */}
        <div className="flex flex-col items-center justify-center space-y-12">
          
          {/* Logo estático elegante */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex justify-center mb-8"
          >
            <Logo size="xl" showText={false} variant="default" />
          </motion.div>

          {/* Subtítulo elegante */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-xl lg:text-2xl font-light tracking-wide text-slate-600 mb-8"
          >
            Tu espacio de creatividad infinita
          </motion.p>

          {/* Estados de carga elegantes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="space-y-8 w-full max-w-md relative z-10"
          >
            {/* Frase de carga mejorada */}
            <div className="h-8 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentPhrase}
                  initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-base font-light text-center leading-relaxed text-slate-500"
                >
                  {loadingPhrases[currentPhrase]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Barra de progreso minimalista */}
            <div className="space-y-3">
              <div className="relative">
                <div className="w-full h-0.5 bg-slate-200/60 rounded-full overflow-hidden backdrop-blur-sm">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-slate-400 to-slate-600"
                    initial={{ width: 0, opacity: 0.7 }}
                    animate={{ 
                      width: `${Math.min(progress, 100)}%`,
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ 
                      width: { duration: 0.4, ease: "easeOut" },
                      opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                  />
                </div>
                
                {/* Indicador de progreso sutil */}
                <motion.div
                  className="absolute -top-1 w-2 h-2 bg-slate-500 rounded-full shadow-sm"
                  style={{ left: `${Math.min(progress, 100)}%` }}
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              
              <motion.p
                className="text-sm font-light text-center text-slate-400 tracking-wide"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                {Math.floor(progress)}%
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Partículas minimalistas */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-0.5 h-0.5 rounded-full -z-20"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${15 + Math.random() * 70}%`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            y: [0, -60],
            opacity: [0, 0.08, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 8,
            delay: Math.random() * 4 + 3,
            repeat: Infinity,
            repeatDelay: Math.random() * 8 + 4,
            ease: "easeOut"
          }}
        >
          <div className="w-full h-full bg-slate-400 rounded-full" />
        </motion.div>
      ))}

      {/* Resplandor sutil de fondo */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none -z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
      >
        <motion.div
          className="w-96 h-96 rounded-full"
          style={{ 
            background: 'radial-gradient(circle, rgba(71, 85, 105, 0.03) 0%, transparent 70%)'
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  );
});

export default LoadingScreen; 