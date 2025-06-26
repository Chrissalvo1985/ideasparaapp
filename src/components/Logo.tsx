import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  variant?: 'default' | 'loading';
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, variant = 'default' }) => {
  const sizeClasses = {
    sm: { text: 'text-sm', image: 'w-16 h-12', container: 'w-16 h-12' },
    md: { text: 'text-lg', image: 'w-20 h-16', container: 'w-20 h-16' },
    lg: { text: 'text-xl', image: 'w-24 h-20', container: 'w-24 h-20' },
    xl: { text: 'text-2xl', image: 'w-32 h-24', container: 'w-32 h-24' }
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
      {/* Logo Image */}
      <div className={`relative ${currentSize.container} flex items-center justify-center`}>
        <motion.img
          src="/logo.jpeg"
          alt="Ideas para... Logo"
          className={`${currentSize.image} rounded-xl object-cover shadow-lg`}
          animate={isLoading ? {
            rotate: [0, 360],
            scale: [1, 1.05, 1]
          } : {}}
          transition={isLoading ? {
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          } : {}}
          style={{
            filter: isLoading ? 'brightness(1.1)' : 'none'
          }}
        />
        
        {/* Brillo adicional para loading */}
        {isLoading && (
          <motion.div
            className="absolute inset-0 rounded-xl border-2 border-slate-400"
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