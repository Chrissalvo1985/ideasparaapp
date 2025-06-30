import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Compass,
  Edit3, 
  BookOpen, 
  Sparkles,
  Settings,
  Heart,
  Zap,
  Wind,
  Brain,
  Menu,
  X
} from 'lucide-react';

const navigationItems = [
  { path: '/', icon: Home, label: 'Inicio' },
  { path: '/explore', icon: Compass, label: 'Explorar' },
  { path: '/inspiration', icon: Heart, label: 'Inspiración' },
  { path: '/diary', icon: BookOpen, label: 'Mis Ideas' },
  { path: '/fanzine', icon: Sparkles, label: 'Fanzine' },
  { path: '/community', icon: Edit3, label: 'Comunidad' },
  { path: '/liberation', icon: Wind, label: 'Liberación' },
  { path: '/consciencia', icon: Brain, label: 'ConciencIA' },
  { path: '/settings', icon: Settings, label: 'Ajustes' },
];

// Main navigation items for bottom bar
const mainNavItems = [
  { path: '/', icon: Home, label: 'Inicio' },
  { path: '/explore', icon: Compass, label: 'Explorar' },
  { path: '/diary', icon: BookOpen, label: 'Ideas' },
];

// Secondary items for hamburger menu
const secondaryNavItems = navigationItems.filter(item => 
  !mainNavItems.some(mainItem => mainItem.path === item.path)
);

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);
  
  const handleNavigation = (path: string) => {
    navigate(path);
    closeMenu();
  };

  return (
    <>
      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* Hamburger Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
                onClick={closeMenu}
              />
              
              {/* Menu Content */}
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="fixed left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 z-[9999] overflow-hidden"
                style={{ 
                  top: `calc(env(safe-area-inset-top, 44px) + 80px)` 
                }}
              >
                {/* Menu Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200/50">
                  <h3 className="text-lg font-semibold text-gray-800">Menú</h3>
                  <motion.button
                    onClick={closeMenu}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={18} className="text-gray-600" />
                  </motion.button>
                </div>
                
                {/* Menu Items */}
                <div className="grid grid-cols-2 gap-2 p-4">
                  {secondaryNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    
                    return (
                      <motion.button
                        key={item.path}
                        onClick={() => handleNavigation(item.path)}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 ${
                          isActive 
                            ? 'bg-gradient-to-br from-slate-600 to-slate-700 text-white shadow-lg' 
                            : 'text-gray-600 hover:text-slate-700 hover:bg-slate-50 active:scale-95'
                        }`}
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Icon size={24} className="mb-2" />
                        <span className="text-sm font-medium text-center">
                          {item.label}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Bottom Navigation Bar */}
        <div className="mobile-nav-container">
          <div className="max-w-md mx-auto">
            <div className="mobile-navigation bg-white/95 backdrop-blur-md shadow-2xl border-t border-gray-200">
              <div className="flex items-center justify-around p-2">
            {/* Main Navigation Items */}
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <motion.button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200 min-h-[60px] min-w-[60px] ${
                    isActive 
                      ? 'bg-gradient-to-br from-slate-600 to-slate-700 text-white shadow-lg scale-105' 
                      : 'text-gray-500 hover:text-slate-600 hover:bg-slate-50 active:scale-95'
                  }`}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: isActive ? 1.05 : 1.02 }}
                  aria-label={item.label}
                >
                  <Icon size={20} className="mb-1" />
                  <span className="text-xs font-medium text-center">
                    {item.label}
                  </span>
                </motion.button>
              );
            })}
            
            {/* Hamburger Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(true)}
              className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200 min-h-[60px] min-w-[60px] ${
                isMenuOpen
                  ? 'bg-gradient-to-br from-slate-600 to-slate-700 text-white shadow-lg scale-105'
                  : 'text-gray-500 hover:text-slate-600 hover:bg-slate-50 active:scale-95'
              }`}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.02 }}
              aria-label="Menú"
            >
              <Menu size={20} className="mb-1" />
              <span className="text-xs font-medium text-center">
                Menú
              </span>
                        </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar Navigation */}
      <nav className="hidden lg:flex lg:flex-1 lg:flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <motion.button
                  onClick={() => navigate(item.path)}
                  className={`group flex gap-x-3 rounded-xl p-3 text-sm leading-6 font-semibold w-full text-left relative overflow-hidden transition-all duration-200 ${
                    isActive
                      ? 'text-slate-700'
                      : 'text-gray-700 hover:text-slate-700 hover:bg-slate-50'
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabDesktop"
                      className="absolute inset-0 bg-slate-100 rounded-xl -z-10"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 40 }}
                    />
                  )}
                  <Icon 
                    className={`h-6 w-6 shrink-0 relative z-10 ${
                      isActive ? 'text-slate-700' : 'text-gray-400 group-hover:text-slate-700'
                    }`} 
                  />
                  <span className="relative z-10">{item.label}</span>
                </motion.button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Navigation; 