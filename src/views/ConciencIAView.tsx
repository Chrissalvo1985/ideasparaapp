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
              onClick={() => onNavigateToEntry(part.entryId)}
              className="inline-flex items-center mx-1 px-2 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg text-sm transition-colors border border-purple-200 group relative touch-manipulation"
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
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap"
                  style={{ zIndex: 9999 }}
                >
                  <div className="font-semibold">{entryTitle || entryEmotion}</div>
                  <div className="text-gray-300">{new Date(entry.date).toLocaleDateString()}</div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
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
        <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
          <Brain size={16} className="text-white" />
        </div>
      </div>
    )}
    
    <div className={`max-w-[85%] lg:max-w-[70%] break-words ${
      message.role === 'user' 
        ? 'bg-gradient-to-br from-slate-600 to-slate-700 text-white' 
        : 'bg-white border border-gray-200'
    } rounded-2xl p-4 shadow-sm`}>
      {message.role === 'assistant' && (
        <div className="flex items-center mb-2">
          <span className="text-xs font-medium text-purple-600">ConciencIA</span>
          <Heart size={10} className="ml-1 text-pink-400" />
        </div>
      )}
      
      <div className={`${
        message.role === 'user' ? 'text-white' : 'text-gray-800'
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
        message.role === 'user' ? 'text-white' : 'text-gray-500'
      }`}>
        {new Date(message.timestamp).toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        })}
      </div>
    </div>
  </motion.div>
));

const WelcomeMessage = React.memo<{ apiKey: string | undefined; onNavigate: () => void; onSetMessage: (msg: string) => void }>(({ onSetMessage }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-12 px-6"
  >
    <div className="flex justify-center mb-6">
      <div className="relative">
        <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
          <Brain size={32} className="text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center">
          <Heart size={12} className="text-white" />
        </div>
        <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
          <Sparkles size={12} className="text-white" />
        </div>
      </div>
    </div>
    
    <h2 className="text-2xl font-bold text-gray-800 mb-3">
      ¡Hola! Soy ConciencIA ✨
    </h2>
    
    <p className="text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
      Estoy aquí para ayudarte a conectar mejor con tus ideas y emociones. 
      Puedo analizar tus pensamientos, encontrar patrones y ofrecerte orientación creativa personalizada.
    </p>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6 max-w-md mx-auto"
    >
      <p className="text-purple-800 text-sm">
        <strong>Modo Demo:</strong> ConciencIA está funcionando con respuestas inteligentes predefinidas. ¡Prueba a hacerme preguntas sobre creatividad, emociones o ideas!
      </p>
    </motion.div>

    {/* Advertencia específica para iOS 18 */}
    {isIOS18Plus() && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 max-w-md mx-auto"
      >
        <p className="text-amber-800 text-sm">
          <strong>⚠️ iOS 18:</strong> Si el teclado no aparece al tocar el campo de texto, intenta tocar y mantener presionado, o abre esta app en Safari normal.
        </p>
      </motion.div>
    )}

    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
      {[
        "¿Cómo puedo ser más creativo?",
        "Me siento un poco perdido/a",
        "¿Qué opinas de mis ideas?",
        "Háblame sobre las emociones"
      ].map((suggestion, index) => (
        <motion.button
          key={index}
          onClick={() => onSetMessage(suggestion)}
          className="p-3 text-left bg-white border border-purple-100 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all text-sm text-gray-700 hover:text-purple-700 touch-manipulation"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{ 
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation'
          }}
        >
          {suggestion}
        </motion.button>
      ))}
    </div>
  </motion.div>
));

const ConciencIAView: React.FC = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  const { 
    chatMessages, 
    getContextWithReferences,
    addChatMessage,
    clearChatHistory 
  } = useAppStore();

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Auto-scroll al último mensaje cuando cambian los mensajes
  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        const container = messagesEndRef.current.closest('.chat-messages-container');
        if (container) {
          container.scrollTop = container.scrollHeight;
        } else {
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      }
    };
    
    // Delay para asegurar que el DOM se haya actualizado
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [chatMessages.length, isLoading]);

  // Workaround para iOS 18 - forzar focus del teclado
  const handleInputFocus = useCallback(() => {
    if (isIOS18Plus() && inputRef.current) {
      // Múltiples intentos para forzar el teclado en iOS 18
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.click();
        }
      }, 100);
      
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 300);
    }
  }, []);

  // Callbacks memoizados
  const handleSendMessage = useCallback(async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    // Agregar mensaje del usuario
    addChatMessage({
      content: userMessage,
      role: 'user'
    });

    try {
      // Obtener contexto con referencias
      const { context: userContext } = getContextWithReferences();
      
      // Preparar historial de conversación
      const conversationHistory = chatMessages.slice(-10); // Últimos 10 mensajes para contexto

      // Generar respuesta con el servicio mock
      const response = await mockConcienciaService.generateResponse(
        userMessage, 
        userContext, 
        conversationHistory
      );

      // Agregar respuesta de ConciencIA
      addChatMessage({
        content: response,
        role: 'assistant'
      });

    } catch (error) {
      console.error('Error al generar respuesta:', error);
      addChatMessage({
        content: 'Ups, parece que tuve un pequeño tropiezo mental. ¿Podrías repetir lo que me dijiste? Estoy aquí para ayudarte. 😊',
        role: 'assistant'
      });
    } finally {
      setIsLoading(false);
    }
  }, [inputMessage, isLoading, addChatMessage, getContextWithReferences, chatMessages]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const handleNavigateToSettings = useCallback(() => {
    navigate('/settings');
  }, [navigate]);

  const handleSetInputMessage = useCallback((message: string) => {
    setInputMessage(message);
    // Forzar focus después de establecer el mensaje en iOS 18
    if (isIOS18Plus()) {
      setTimeout(() => {
        handleInputFocus();
      }, 100);
    }
  }, [handleInputFocus]);

  const handleGoBack = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleNavigateToEntry = useCallback((entryId: string) => {
    // Navegar al diario con el ID de la entrada para destacarla
    navigate(`/diary?highlight=${entryId}`);
  }, [navigate]);

  // Determinar el estilo de backdrop apropiado para compatibilidad Safari
  const getBackdropStyle = () => {
    if (isSafari() && !CSS.supports('backdrop-filter', 'blur(10px)')) {
      // Fallback para Safari más antiguo
      return {
        backgroundColor: 'rgba(255, 255, 255, 0.95)'
      };
    }
    return {};
  };

  return (
    <div 
      className="flex flex-col max-w-4xl mx-auto"
      style={{
        height: '100vh',
        height: '100dvh', // Usar dynamic viewport height si está disponible
        maxHeight: '-webkit-fill-available',
        background: 'rgba(255, 255, 255, 0.6)',
        // Compatibilidad backdrop-filter
        backdropFilter: CSS.supports('backdrop-filter', 'blur(10px)') ? 'blur(10px)' : 'none',
        WebkitBackdropFilter: CSS.supports('-webkit-backdrop-filter', 'blur(10px)') ? 'blur(10px)' : 'none',
        ...getBackdropStyle()
      }}
    >
      {/* Header */}
      <div 
        className="flex-shrink-0 border-b border-gray-200 px-4 lg:px-6 py-3 lg:py-4"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: CSS.supports('backdrop-filter', 'blur(10px)') ? 'blur(10px)' : 'none',
          WebkitBackdropFilter: CSS.supports('-webkit-backdrop-filter', 'blur(10px)') ? 'blur(10px)' : 'none',
          paddingTop: `calc(12px + env(safe-area-inset-top, 0px))`,
          ...getBackdropStyle()
        }}
      >
        <div className="flex items-center justify-between">
          <button
            onClick={handleGoBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors touch-manipulation"
            style={{ 
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation'
            }}
          >
            <ArrowLeft size={20} className="mr-2" />
            <span className="font-medium">Volver</span>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full">
                <div className="w-full h-full bg-gradient-to-br from-violet-400 to-purple-500 rounded-full animate-pulse"></div>
              </div>
              <span className="text-sm font-medium text-gray-700">ConciencIA</span>
            </div>
            
            {chatMessages.length > 0 && (
              <button
                onClick={clearChatHistory}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all touch-manipulation"
                title="Limpiar conversación"
                style={{ 
                  WebkitTapHighlightColor: 'transparent',
                  touchAction: 'manipulation'
                }}
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 chat-messages-container"
        style={{
          // Scroll mejorado para Safari iOS
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'auto', // Cambiar de 'touch' (deprecated) a 'auto'
          overscrollBehavior: 'contain',
          // Hardware acceleration para Safari
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          // Mejorar performance en iOS
          willChange: 'scroll-position'
        }}
      >
        {chatMessages.length === 0 ? (
          <div className="h-full flex items-center justify-center px-4 lg:px-6 py-4">
            <WelcomeMessage 
              apiKey="demo"
              onNavigate={handleNavigateToSettings}
              onSetMessage={handleSetInputMessage}
            />
          </div>
        ) : (
          <div className="px-4 lg:px-6 py-4">
            <div className="space-y-4">
              <AnimatePresence>
                {chatMessages.map((message, index) => (
                  <MessageBubble key={message.id} message={message} index={index} onNavigateToEntry={handleNavigateToEntry} />
                ))}
              </AnimatePresence>
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start mb-4"
                >
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Loader2 size={16} className="text-white animate-spin" />
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center mb-2">
                      <span className="text-xs font-medium text-purple-600">ConciencIA</span>
                      <Heart size={10} className="ml-1 text-pink-400" />
                    </div>
                    <div className="text-gray-600 italic">Pensando...</div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} className="h-4" />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div 
        className="flex-shrink-0 border-t border-gray-200 px-4 lg:px-6 py-3 lg:py-4"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: CSS.supports('backdrop-filter', 'blur(10px)') ? 'blur(10px)' : 'none',
          WebkitBackdropFilter: CSS.supports('-webkit-backdrop-filter', 'blur(10px)') ? 'blur(10px)' : 'none',
          // Safe areas mejoradas para iOS
          paddingBottom: `calc(12px + env(safe-area-inset-bottom, 0px))`,
          ...getBackdropStyle()
        }}
      >
        <div className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={handleInputFocus}
              onTouchStart={handleInputFocus} // Workaround adicional para iOS 18
              placeholder="Cuéntame qué tienes en mente..."
              disabled={isLoading}
              className="w-full resize-none rounded-2xl border border-gray-300 bg-white px-4 py-3 pr-12 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed max-h-32 min-h-[48px] text-base touch-manipulation"
              rows={1}
              style={{ 
                height: 'auto',
                minHeight: '48px',
                fontSize: '16px', // Prevenir zoom en iOS
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation',
                // Mejorar focus en iOS 18
                WebkitUserSelect: 'text',
                userSelect: 'text'
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = Math.min(target.scrollHeight, 128) + 'px';
              }}
              // Atributos adicionales para iOS 18
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="sentences"
              spellCheck="true"
            />
          </div>
          
          <motion.button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="flex-shrink-0 p-3 bg-gradient-to-br from-purple-600 to-violet-600 text-white rounded-xl hover:from-purple-700 hover:to-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg touch-manipulation"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
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
          </motion.button>
        </div>
        
        <div className="mt-3 text-center">
          <p className="text-xs text-gray-500">
            💡 ConciencIA está funcionando en modo demo con respuestas predefinidas
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConciencIAView; 