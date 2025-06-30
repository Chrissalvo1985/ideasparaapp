import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Send, 
  Brain,
  Heart,
  Sparkles,
  Trash2,
  Loader2,
  ExternalLink
} from 'lucide-react';
import { useAppStore } from '../stores/appStore';
import { mockConcienciaService } from '../services/mockConcienciaService';

// Detectar iOS
const isIOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

// Detectar Safari
const isSafari = () => {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
};

// Detectar iOS 18+
const isIOS18Plus = () => {
  if (!isIOS()) return false;
  const match = navigator.userAgent.match(/OS (\d+)_/);
  return match && parseInt(match[1], 10) >= 18;
};

// Componente para procesar y renderizar mensajes con referencias
const MessageContent = React.memo<{ content: string; onNavigateToEntry: (entryId: string) => void }>(({ content, onNavigateToEntry }) => {
  const { diaryEntries, liberationSessions } = useAppStore();
  
  // Procesar referencias en el texto
  const processedContent = useMemo(() => {
    const referenceRegex = /\[REF:([^\]]+)\]/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = referenceRegex.exec(content)) !== null) {
      // Agregar texto antes de la referencia
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: content.slice(lastIndex, match.index)
        });
      }

      // Buscar la entrada referenciada
      const entryId = match[1];
      const entry = diaryEntries.find(e => e.id === entryId) || 
                   liberationSessions.find(s => s.id === entryId);

      // Agregar la referencia como link
      parts.push({
        type: 'reference',
        entryId: entryId,
        content: match[0],
        entry: entry
      });

      lastIndex = match.index + match[0].length;
    }

    // Agregar texto restante
    if (lastIndex < content.length) {
      parts.push({
        type: 'text',
        content: content.slice(lastIndex)
      });
    }

    return parts.length > 0 ? parts : [{ type: 'text', content }];
  }, [content, diaryEntries, liberationSessions]);

  const getEntryDisplayText = (entry: any) => {
    if (!entry) return 'Ver entrada';
    
    // Si es DiaryEntry y tiene title
    if ('title' in entry && entry.title) {
      const title = String(entry.title);
      return title.length > 20 ? title.substring(0, 20) + '...' : title;
    }
    
    // Fallback to emotion or default
    return entry.emotion || 'Entrada';
  };

  const getEntryTitle = (entry: any) => {
    if (!entry) return '';
    return ('title' in entry && entry.title) ? String(entry.title) : '';
  };

  return (
    <div className="whitespace-pre-wrap leading-relaxed word-break break-words">
      {processedContent.map((part, index) => {
        if (part.type === 'reference') {
          const entry = part.entry;
          const entryTitle = getEntryTitle(entry);
          const entryEmotion = entry?.emotion || 'Entrada';
          const displayText = getEntryDisplayText(entry);
          
          return (
            <button
              key={index}
              onClick={() => part.entryId && onNavigateToEntry(part.entryId)}
              className="inline-flex items-center mx-1 px-2 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm transition-colors border border-slate-200 dark:border-slate-600 group relative touch-manipulation"
              title={entry ? `"${entryTitle || entryEmotion}" - ${new Date(entry.date).toLocaleDateString()}` : "Ver entrada referenciada"}
              style={{ 
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation'
              }}
            >
              <ExternalLink size={12} className="mr-1" />
              <span>{displayText}</span>
              
              {/* Tooltip mejorado con mejor z-index */}
              {entry && (
                <div 
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap"
                  style={{ zIndex: 9999 }}
                >
                  <div className="font-semibold">{entryTitle || entryEmotion}</div>
                  <div className="text-gray-300 dark:text-gray-600">{new Date(entry.date).toLocaleDateString()}</div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
                </div>
              )}
            </button>
          );
        }
        return <span key={index}>{part.content}</span>;
      })}
    </div>
  );
});

// Componentes memoizados fuera del componente principal
const MessageBubble = React.memo<{ message: any; index: number; onNavigateToEntry: (entryId: string) => void }>(({ message, index, onNavigateToEntry }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
  >
    {message.role === 'assistant' && (
      <div className="flex-shrink-0 mr-3">
        <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 dark:from-slate-700 dark:to-slate-800 rounded-full flex items-center justify-center">
          <Brain size={16} className="text-white" />
        </div>
      </div>
    )}
    
    <div className={`max-w-[85%] lg:max-w-[70%] break-words ${
      message.role === 'user' 
        ? 'bg-gradient-to-br from-slate-600 to-slate-700 dark:from-slate-700 dark:to-slate-800 text-white' 
        : 'bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600'
    } rounded-2xl p-4 shadow-sm`}>
      {message.role === 'assistant' && (
        <div className="flex items-center mb-2">
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">ConciencIA</span>
          <Heart size={10} className="ml-1 text-pink-400" />
        </div>
      )}
      
      <div className={`${
        message.role === 'user' ? 'text-white' : 'text-gray-800 dark:text-gray-200'
      }`}>
        {message.role === 'assistant' ? (
          <MessageContent 
            content={message.content} 
            onNavigateToEntry={onNavigateToEntry}
          />
        ) : (
          <div className="whitespace-pre-wrap leading-relaxed">
            {message.content}
          </div>
        )}
      </div>
      
      <div className={`text-xs mt-2 opacity-60 ${
        message.role === 'user' ? 'text-white' : 'text-gray-500 dark:text-gray-400'
      }`}>
        {new Date(message.timestamp).toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        })}
      </div>
    </div>
  </motion.div>
));

const WelcomeMessage = React.memo<{ onSetMessage: (msg: string) => void }>(({ onSetMessage }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-8 lg:py-12"
  >
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2 }}
      className="mb-6"
    >
      <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-slate-600 to-slate-700 dark:from-slate-700 dark:to-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
        <Brain size={32} className="text-white" />
      </div>
      <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
        ¡Hola! Soy ConciencIA
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-lg">
        Tu compañera reflexiva personal
      </p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-800/30 dark:to-slate-900/30 rounded-2xl p-6 border border-slate-200 dark:border-slate-600 mb-6"
    >
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        Estoy aquí para ayudarte a reflexionar sobre tus pensamientos, explorar tus ideas y conectar con tus emociones de manera profunda.
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        💡 <strong>Consejo:</strong> Puedo hacer referencia a tus entradas anteriores del diario y sesiones de liberación para una conversación más rica y personal.
      </p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-3 max-w-md lg:max-w-2xl mx-auto"
    >
      {[
        "¿Cómo me siento hoy?",
        "Ayúdame a reflexionar sobre mi día",
        "¿Qué patrones ves en mis escritos?",
        "Háblame sobre mis emociones recientes"
      ].map((suggestion, index) => (
        <motion.button
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + index * 0.1 }}
          onClick={() => onSetMessage(suggestion)}
          className="text-left p-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 transition-all text-sm text-gray-700 dark:text-gray-300 shadow-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          "{suggestion}"
        </motion.button>
      ))}
    </motion.div>
  </motion.div>
));

const ConciencIAView: React.FC = () => {
  const navigate = useNavigate();
  const { chatMessages, addChatMessage, clearChatHistory, diaryEntries } = useAppStore();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);
  const [isNearBottom, setIsNearBottom] = useState(true);

  // Función optimizada para scroll
  const scrollToBottom = useCallback(() => {
    if (scrollRef.current && shouldScrollToBottom) {
      const element = scrollRef.current;
      
      // Usar requestAnimationFrame para mejor rendimiento
      requestAnimationFrame(() => {
        element.scrollTo({
          top: element.scrollHeight,
          behavior: 'smooth'
        });
      });
    }
  }, [shouldScrollToBottom]);

  // Auto-scroll cuando hay nuevos mensajes
  useEffect(() => {
    if (isNearBottom) {
      scrollToBottom();
    }
  }, [chatMessages.length, scrollToBottom, isNearBottom]);

  // Detectar si el usuario está cerca del final
  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const threshold = 100; // píxeles del final
      const nearBottom = scrollHeight - scrollTop - clientHeight < threshold;
      setIsNearBottom(nearBottom);
      setShouldScrollToBottom(nearBottom);
    }
  }, []);

  // Auto-resize del textarea
  const handleTextareaChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage('');
    setIsLoading(true);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // Agregar mensaje del usuario
    addChatMessage({
      role: 'user',
      content: userMessage
    });

    // Asegurar scroll al final para nuevos mensajes
    setShouldScrollToBottom(true);

    try {
      // Simular delay de red más realista
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
      
      const response = await mockConcienciaService.generateResponse(userMessage, "", []);
      
      addChatMessage({
        role: 'assistant',
        content: response
      });
    } catch (error) {
      console.error('Error sending message:', error);
      addChatMessage({
        role: 'assistant',
        content: 'Lo siento, parece que hay un problema técnico. ¿Podrías intentar de nuevo?'
      });
    } finally {
      setIsLoading(false);
    }
  }, [message, isLoading, addChatMessage, diaryEntries]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const navigateToEntry = useCallback((entryId: string) => {
    navigate(`/diary?highlight=${entryId}`);
  }, [navigate]);

  const clearChat = useCallback(() => {
    if (confirm('¿Estás segura de que quieres borrar toda la conversación?')) {
      clearChatHistory();
    }
  }, [clearChatHistory]);

  // Detectar condiciones específicas del navegador
  const isIOSKeyboardIssue = isIOS() && isSafari();
  const hasIOSKeyboardFix = isIOS18Plus();
  
  // Estado para detectar si es mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevenir scroll del body solo en móvil
  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isMobile]);

  return (
    <div 
      className={`flex flex-col bg-gradient-to-br from-gray-50 via-slate-50/30 to-stone-50 dark:from-slate-900 dark:via-slate-800/30 dark:to-gray-900 ${
        isIOSKeyboardIssue ? 'ios-keyboard-fix' : ''
      } ${isMobile ? 'h-screen' : 'min-h-screen'}`}
      style={{
        // Solo usar position fixed en móvil
        ...(isMobile && {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          ...(isIOSKeyboardIssue && {
            height: hasIOSKeyboardFix ? '100dvh' : '100vh',
            minHeight: hasIOSKeyboardFix ? '100dvh' : '100vh',
          })
        }),
        // En desktop usar height normal
        ...(!isMobile && {
          height: '100vh'
        })
      }}
    >
      {/* Header */}
      <div className="flex-shrink-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-slate-600 px-4 py-3 lg:px-6 lg:py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 dark:from-slate-700 dark:to-slate-800 rounded-full flex items-center justify-center">
                <Brain size={16} className="text-white" />
              </div>
              <div>
                <h1 className="font-bold text-gray-800 dark:text-gray-200">ConciencIA</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Tu compañera reflexiva</p>
              </div>
            </div>
          </div>
          
          {chatMessages.length > 0 && (
            <button
              onClick={clearChat}
              className="p-2 rounded-full bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
              title="Borrar conversación"
            >
              <Trash2 size={16} className="text-red-600 dark:text-red-400" />
            </button>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 lg:px-6 py-2 lg:py-4"
        style={{
          // Optimización para scroll en móviles
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {chatMessages.length === 0 ? (
          <WelcomeMessage onSetMessage={setMessage} />
        ) : (
          <div className="max-w-4xl mx-auto">
            <AnimatePresence initial={false}>
              {chatMessages.map((msg, index) => (
                <MessageBubble
                  key={index}
                  message={msg}
                  index={index}
                  onNavigateToEntry={navigateToEntry}
                />
              ))}
            </AnimatePresence>
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start mb-4"
              >
                <div className="flex-shrink-0 mr-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 dark:from-slate-700 dark:to-slate-800 rounded-full flex items-center justify-center">
                    <Brain size={16} className="text-white" />
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <Loader2 size={16} className="animate-spin text-slate-600 dark:text-slate-400" />
                    <span className="text-gray-600 dark:text-gray-400 text-sm">ConciencIA está reflexionando...</span>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Spacer para evitar que el último mensaje quede oculto */}
            {isMobile && <div className="h-24" />}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div 
        className={`flex-shrink-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-t border-gray-200 dark:border-slate-600 p-4 lg:p-4 ${
          isIOSKeyboardIssue ? 'ios-input-container' : ''
        }`}
        style={{
          // Padding solo para la navegación móvil, sin duplicar espacio
          paddingBottom: isMobile 
            ? `calc(16px + 60px + env(safe-area-inset-bottom, 0px))` 
            : 'unset'
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={handleTextareaChange}
                onKeyPress={handleKeyPress}
                placeholder="Comparte tus pensamientos con ConciencIA..."
                className="w-full resize-none bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-2xl px-4 py-3 pr-12 focus:outline-none focus:border-slate-400 dark:focus:border-slate-500 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 min-h-[48px] max-h-[120px]"
                style={{
                  // Evitar zoom en iOS
                  fontSize: isIOS() ? '16px' : '14px'
                }}
                disabled={isLoading}
              />
            </div>
            
            <button
              onClick={handleSendMessage}
              disabled={!message.trim() || isLoading}
              className="p-3 bg-gradient-to-r from-slate-600 to-slate-700 dark:from-slate-700 dark:to-slate-800 text-white rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:from-slate-700 hover:to-slate-800 dark:hover:from-slate-800 dark:hover:to-slate-900 transition-all shadow-lg"
              style={{ 
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation'
              }}
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Send size={20} />
              )}
            </button>
          </div>
          
          {/* Hint text */}
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            Presiona Enter para enviar • Shift+Enter para nueva línea
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConciencIAView; 