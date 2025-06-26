import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Feather } from 'lucide-react';
import type { Inspiration } from '../data/inspirations';

interface HandwrittenInspirationProps {
  inspiration: Inspiration;
  className?: string;
}

const HandwrittenInspiration: React.FC<HandwrittenInspirationProps> = ({ 
  inspiration, 
  className = "" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative rounded-2xl p-6 lg:p-8 border shadow-sm min-h-[280px] lg:min-h-[320px] flex flex-col ${className}`}
      style={{
        background: `
          linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)
        `,
        borderColor: '#e2e8f0',
        boxShadow: '0 4px 16px rgba(100, 116, 139, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
      }}
    >
      {/* Decoración superior minimalista */}
      <div className="flex items-center justify-center mb-4">
        <div className="flex items-center space-x-2 text-slate-400">
          <div className="w-6 h-[1px] bg-gradient-to-r from-transparent to-slate-300" />
          <Feather size={12} className="text-slate-500" />
          <div className="w-6 h-[1px] bg-gradient-to-l from-transparent to-slate-300" />
        </div>
      </div>

      {/* Texto principal con estilo manuscrito mejorado para legibilidad */}
      <div className="relative z-10 flex-1 flex flex-col justify-between">
        <blockquote 
          className="text-slate-800 text-base lg:text-lg leading-relaxed font-medium italic text-center flex-1 flex items-center justify-center"
          style={{ 
            fontFamily: '"Kalam", "Dancing Script", cursive',
            lineHeight: '1.7',
            textShadow: '0 1px 3px rgba(71, 85, 105, 0.15)',
            transform: 'rotate(-0.2deg)',
            fontWeight: '500'
          }}
        >
          "{inspiration.text}"
        </blockquote>

        {/* Firma */}
        <div className="flex items-center justify-end mt-4">
          <div 
            className="text-slate-700 text-sm font-semibold"
            style={{ 
              fontFamily: '"Kalam", "Dancing Script", cursive',
              transform: 'rotate(-0.3deg)',
              fontWeight: '600'
            }}
          >
            — {inspiration.author}
            <Heart size={10} className="inline ml-1 text-rose-500/70" />
          </div>
        </div>
      </div>


    </motion.div>
  );
};

export default HandwrittenInspiration; 