import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAppStore } from './stores/appStore';

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

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Inicializar la app solo una vez
    initializeStore();
  }, []); // Dependencia vacía - solo se ejecuta una vez

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen 
            key="loading"
            onComplete={handleLoadingComplete} 
          />
        ) : (
          <div key="app" className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-stone-50">
            {/* Desktop Sidebar */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-64">
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white/95 backdrop-blur-md px-6 pb-4 shadow-xl border-r border-gray-200">
                <div className="flex h-20 shrink-0 items-center justify-start border-b border-gray-200 pt-4 pb-4">
                  <Logo size="md" showText={true} />
                </div>
                <Navigation />
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:pl-64">
              {/* Mobile/Tablet Layout */}
              <div className="lg:hidden">
                <div className="flex flex-col h-screen max-w-md mx-auto bg-white/80 backdrop-blur-sm shadow-xl">
                  {/* Mobile Header - Fixed */}
                  <div className="flex-shrink-0 bg-white/95 backdrop-blur-md border-b border-gray-200 px-6 py-4 sticky top-0 z-30">
                    <div className="flex justify-center">
                      <Logo size="sm" showText={true} />
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
                <div className="bg-white/60 backdrop-blur-sm min-h-screen">
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
        )}
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;
