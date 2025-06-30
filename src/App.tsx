import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { useAppStore } from './stores/appStore';
import { useResponsive } from './utils/useResponsive';

// Components
import Navigation from './components/Navigation';
import LoadingScreen from './components/LoadingScreen';
import Logo from './components/Logo';
import ThemeProvider from './components/ThemeProvider';

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
  const { initializeStore } = useAppStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const { isMobile } = useResponsive();

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Inicializar la app solo una vez (esto incluye el dark mode)
    if (!isInitialized) {
      initializeStore();
      setIsInitialized(true);
    }
  }, [initializeStore, isInitialized]);

  if (isLoading) {
    return <LoadingScreen key="loading" onComplete={handleLoadingComplete} />;
  }

  return (
    <ThemeProvider>
      <MotionConfig
        // DESACTIVAR TODAS las animaciones en móvil
        transition={isMobile ? { duration: 0, type: "tween" } : undefined}
        reducedMotion={isMobile ? "always" : "never"}
      >
        <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-stone-50 dark:from-slate-900 dark:via-slate-800 dark:to-gray-900 transition-colors duration-300">
          {/* Desktop Sidebar */}
          <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-64">
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white/95 dark:bg-slate-900/95 px-6 pb-4 shadow-xl border-r border-gray-200 dark:border-slate-600 transition-colors duration-300">
                              <div className="flex h-20 shrink-0 items-center justify-center border-b border-gray-200 dark:border-slate-600 pt-4 pb-4 transition-colors duration-300">
                <Logo size="md" showText={false} />
              </div>
              <Navigation />
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:pl-64">
            {/* Mobile/Tablet Layout */}
            <div className="lg:hidden">
              {/* Fixed Header */}
              <div className="mobile-header fixed top-0 left-0 right-0 z-[1000] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-200 dark:border-slate-600 shadow-sm transition-colors duration-300">
                <div className="max-w-md mx-auto px-6 py-3">
                  <div className="flex justify-center">
                    <Logo size="sm" showText={false} />
                  </div>
                </div>
              </div>

              {/* Content Container */}
              <div className="mobile-content h-screen max-w-md mx-auto">
                {/* Content with proper spacing */}
                <div className="pt-16 overflow-y-auto h-full bg-gradient-to-br from-gray-50 via-slate-50 to-stone-50 dark:from-slate-900 dark:via-slate-800 dark:to-gray-900 transition-colors duration-300">
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

              {/* Navigation Component handles its own positioning */}
              <Navigation />
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:block">
              <div className="bg-white/60 dark:bg-slate-900/60 min-h-screen transition-colors duration-300">
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
    </ThemeProvider>
  );
}

export default App;
