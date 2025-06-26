import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Feather, Heart } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  variant?: 'default' | 'loading';
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, variant = 'default' }) => {
  const sizeClasses = {
    sm: { text: 'text-sm', icon: 16, container: 'w-12 h-12' },
    md: { text: 'text-lg', icon: 20, container: 'w-16 h-16' },
    lg: { text: 'text-xl', icon: 24, container: 'w-20 h-20' },
    xl: { text: 'text-2xl', icon: 32, container: 'w-24 h-24' }
  };

  const currentSize = sizeClasses[size];
  const isLoading = variant === 'loading';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex items-center space-x-3 font-1"
    >
      {/* Logo Icon - Círculo con elementos creativos */}
      <div className={`relative ${currentSize.container} flex items-center justify-center`}>
        {/* Círculo base con gradiente usando la paleta sobria */}
        <motion.div
          className={`absolute inset-0 rounded-full shadow-lg ${
            isLoading 
              ? 'bg-white' 
              : 'bg-gradient-to-br from-slate-600 to-slate-800'
          }`}
          animate={isLoading ? {
            rotate: [0, 360],
            scale: [1, 1.05, 1]
          } : {}}
          transition={isLoading ? {
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          } : {}}
        />
        
        {/* Elementos creativos flotantes */}
        <div className="relative z-10 flex items-center justify-center">
          <motion.div
            className="absolute"
            animate={isLoading ? {
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            } : {}}
            transition={isLoading ? {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            } : {}}
          >
            <Sparkles 
              size={currentSize.icon} 
              className={isLoading ? 'text-slate-600' : 'text-white'}
            />
          </motion.div>
          
          {/* Elementos orbitales */}
          <motion.div
            className="absolute"
            style={{ 
              transformOrigin: `${currentSize.icon/2}px ${currentSize.icon/2}px`
            }}
            animate={isLoading ? {
              rotate: [0, -360]
            } : {}}
            transition={isLoading ? {
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            } : {}}
          >
            <Feather 
              size={currentSize.icon * 0.6} 
              className={`absolute ${isLoading ? 'text-gray-700' : 'text-white/80'}`}
              style={{ 
                top: -currentSize.icon * 0.8,
                left: currentSize.icon * 0.2,
              }}
            />
          </motion.div>
          
          <motion.div
            className="absolute"
            style={{ 
              transformOrigin: `${currentSize.icon/2}px ${currentSize.icon/2}px`
            }}
            animate={isLoading ? {
              rotate: [0, 360]
            } : {}}
            transition={isLoading ? {
              duration: 12,
              repeat: Infinity,
              ease: "linear"
            } : {}}
          >
            <Heart 
              size={currentSize.icon * 0.5} 
              className={`absolute ${isLoading ? 'text-gray-800' : 'text-white/70'}`}
              style={{ 
                bottom: -currentSize.icon * 0.7,
                right: currentSize.icon * 0.3,
              }}
            />
          </motion.div>
        </div>
        
        {/* Brillo adicional para loading */}
        {isLoading && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </div>

      {/* Texto del logo */}
      {showText && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <h1 
            className={`${currentSize.text} font-bold leading-tight tracking-tight text-slate-800`}
          >
            Ideas
            <br />
            <span className="text-slate-600">para</span>
          </h1>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Logo; 