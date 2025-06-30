import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { useAppStore } from './stores/appStore';
import { useResponsive } from './utils/useResponsive';
import { useScrollDirection } from './utils/useScrollDirection';

// Components
import Navigation from './components/Navigation';
import LoadingScreen from './components/LoadingScreen';
import Logo from './components/Logo';

// Views
import HomePage from './views/HomePage';
import ExploreView from './views/ExploreView';
import WritingSpace from './views/WritingSpace';
import DiaryView from './views/DiaryView';
import LiberationMode from './views/LiberationMode';
import FanzineView from './views/FanzineView';
import EmotionExplorer from './views/EmotionExplorer';
import SettingsView from './views/SettingsView';
import InspirationView from './views/InspirationView';
import ConciencIAView from './views/ConciencIAView';
import CommunityView from './views/CommunityView';

import './App.css';

function App() {
  const initializeStore = useAppStore(state => state.initializeStore);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isPWA, setIsPWA] = useState(false);
  const { isMobile } = useResponsive();
  const { scrollDirection, isScrolled } = useScrollDirection();

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Detectar si está corriendo como PWA
    const checkPWA = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                          (window.navigator as any).standalone ||
                          document.referrer.includes('android-app://');
      setIsPWA(isStandalone);
    };

    checkPWA();
    
    // Listener para cambios en display mode
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleChange = (e: MediaQueryListEvent) => setIsPWA(e.matches);
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  useEffect(() => {
    // Inicializar la app solo una vez
    if (!isInitialized) {
      initializeStore();
      setIsInitialized(true);
    }
  }, []); // Sin dependencias para ejecutar solo una vez

  if (isLoading) {
    return <LoadingScreen key="loading" onComplete={handleLoadingComplete} />;
  }

  // Header visibility logic
  const shouldHideHeader = scrollDirection === 'down' && isScrolled;

  return (
    <MotionConfig
      // DESACTIVAR TODAS las animaciones en móvil
      transition={isMobile ? { duration: 0, type: "tween" } : undefined}
      reducedMotion={isMobile ? "always" : "never"}
    >
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-stone-50">
          {/* Desktop Sidebar */}
          <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-64">
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white/95 px-6 pb-4 shadow-xl border-r border-gray-200">
              <div className="flex h-20 shrink-0 items-center justify-center border-b border-gray-200 pt-4 pb-4">
                <Logo size="md" showText={false} />
              </div>
              <Navigation />
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:pl-64">
            {/* Mobile/Tablet Layout */}
            <div className="lg:hidden">
              {/* Mobile Header - Auto-hide con scroll */}
              <div className={`fixed top-0 left-0 right-0 z-30 max-w-md mx-auto transition-transform duration-300 ${
                shouldHideHeader ? '-translate-y-full' : 'translate-y-0'
              } ${isPWA ? 'pt-safe' : ''}`}>
                <div className="bg-white/95 backdrop-blur-md border-b border-gray-200 px-6 py-3 shadow-lg">
                  <div className="flex justify-center">
                    <Logo size="sm" showText={false} />
                  </div>
                </div>
              </div>

              {/* Content Container */}
              <div className={`${isPWA ? 'h-screen-safe' : 'min-h-screen'} max-w-md mx-auto bg-white/80 shadow-xl`}>
                                 {/* Content with proper spacing */}
                 <div className="mobile-scroll-container pt-16 pb-20 overflow-y-auto h-full">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/explore" element={<ExploreView />} />
                    <Route path="/write" element={<WritingSpace />} />
                    <Route path="/diary" element={<DiaryView />} />
                    <Route path="/liberation" element={<LiberationMode />} />
                    <Route path="/fanzine" element={<FanzineView />} />
                    <Route path="/emotions" element={<EmotionExplorer />} />
                    <Route path="/inspiration" element={<InspirationView />} />
                    <Route path="/community" element={<CommunityView />} />
                    <Route path="/consciencia" element={<ConciencIAView />} />
                    <Route path="/settings" element={<SettingsView />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </div>

                {/* Fixed Bottom Navigation */}
                <div className={`fixed bottom-0 left-0 right-0 z-20 max-w-md mx-auto ${isPWA ? 'pb-safe' : ''}`}>
                  <Navigation />
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:block">
              <div className="bg-white/60 min-h-screen">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/explore" element={<ExploreView />} />
                  <Route path="/write" element={<WritingSpace />} />
                  <Route path="/diary" element={<DiaryView />} />
                  <Route path="/liberation" element={<LiberationMode />} />
                  <Route path="/fanzine" element={<FanzineView />} />
                  <Route path="/emotions" element={<EmotionExplorer />} />
                  <Route path="/inspiration" element={<InspirationView />} />
                  <Route path="/community" element={<CommunityView />} />
                  <Route path="/consciencia" element={<ConciencIAView />} />
                  <Route path="/settings" element={<SettingsView />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </MotionConfig>
  );
}

export default App;
