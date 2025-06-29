import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { useAppStore } from './stores/appStore';
import { useResponsive } from './utils/useResponsive';

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
  const { isMobile } = useResponsive();

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
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
              <div className="flex flex-col h-screen max-w-md mx-auto bg-white/80 shadow-xl">
                {/* Mobile Header - Fixed */}
                <div className="flex-shrink-0 bg-white/95 border-b border-gray-200 px-6 py-3 sticky top-0 z-30">
                  <div className="flex justify-center">
                    <Logo size="sm" showText={false} />
                  </div>
                </div>
                
                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto smooth-scroll">
                  <div className="min-h-full">
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
                
                {/* Mobile Navigation - Only for mobile */}
                <Navigation />
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
