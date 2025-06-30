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

      {/* Texto principal optimizado para legibilidad móvil */}
      <div className="relative z-10 flex-1 flex flex-col justify-between">
        <blockquote 
          className="inspiration-text text-gray-900 text-lg lg:text-xl leading-relaxed font-semibold text-center flex-1 flex items-center justify-center px-2"
          style={{ 
            lineHeight: '1.8',
            textShadow: '0 1px 4px rgba(0, 0, 0, 0.25)',
            fontWeight: '600'
          }}
        >
          "{inspiration.text}"
        </blockquote>

        {/* Firma */}
        <div className="flex items-center justify-end mt-4">
          <div 
            className="inspiration-author text-gray-800 text-base lg:text-sm font-bold lg:font-semibold"
            style={{ 
              fontWeight: '700'
            }}
          >
            — {inspiration.author}
            <Heart size={12} className="inline ml-1 text-rose-600/80" />
          </div>
        </div>
      </div>


    </motion.div>
  );
};

export default HandwrittenInspiration; 