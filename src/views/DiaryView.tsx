import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppStore } from '../stores/appStore';
import { useOptimizedAnimations } from '../utils/useResponsive';
import { emotions } from '../data/emotions';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Eye,
  EyeOff,
  Calendar,
  Heart,
  Edit3,
  Trash2,
  Plus
} from 'lucide-react';
import type { DiaryEntry } from '../types';

const DiaryView: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const highlightEntryId = searchParams.get('highlight');
  
  const { 
    diaryEntries, 
    showPrivateEntries, 
    togglePrivateEntries,
    deleteEntry,
    setCurrentPrompt,
    updateEntry
  } = useAppStore();

  // Usar animaciones optimizadas
  const { containerVariants, itemVariants } = useOptimizedAnimations();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedEntryType, setSelectedEntryType] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'emotion' | 'category'>('date');
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
  const [modalPaperStyle, setModalPaperStyle] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState<DiaryEntry | null>(null);
  const [editedContent, setEditedContent] = useState('');
  const [editedTitle, setEditedTitle] = useState('');

  // Auto-abrir entrada destacada si viene del chat
  useEffect(() => {
    if (highlightEntryId) {
      const entryToHighlight = diaryEntries.find(entry => entry.id === highlightEntryId);
      if (entryToHighlight) {
        // Scroll to the entry and open it
        setTimeout(() => {
          const element = document.getElementById(`entry-${highlightEntryId}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Auto-abrir el modal después de un pequeño delay
            setTimeout(() => {
              openModal(entryToHighlight, 'bg-purple-50 border-purple-200');
            }, 500);
          }
        }, 100);
      }
    }
  }, [highlightEntryId, diaryEntries]);

  // Unique emotions from entries
  const uniqueEmotions = [...new Set(diaryEntries.map(entry => entry.emotion))];

  // Filter entries
  const filteredEntries = diaryEntries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEmotion = !selectedEmotion || entry.emotion === selectedEmotion;
    const matchesPrivacy = showPrivateEntries || !entry.isPrivate;
    
    return matchesSearch && matchesEmotion && matchesPrivacy;
  });

  const handleNewEntry = () => {
    setCurrentPrompt(null);
    navigate('/write');
  };

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getEmotionData = (emotionId: string) => {
    return emotions.find(e => e.id === emotionId);
  };

  const openModal = (entry: any, paperStyle: string) => {
    setSelectedEntry(entry);
    setModalPaperStyle(paperStyle);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEntry(null);
    setModalPaperStyle('');
  };

  return (
    <div className="lg:min-h-screen px-6 lg:px-8 pt-6 lg:pt-8 pb-4 lg:pb-8 max-w-6xl lg:mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full bg-white/60 backdrop-blur-sm border border-slate-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={20} className="text-slate-600" />
            </motion.button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Mis Ideas</h1>
              <p className="text-sm text-gray-600">
                {filteredEntries.length} entradas encontradas
              </p>
            </div>
          </div>
          
          <motion.button
            onClick={handleNewEntry}
            className="p-2 rounded-full bg-slate-600 text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={20} />
          </motion.button>
        </motion.div>

        {/* Search and Filters */}
        <motion.div variants={itemVariants} className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar en tus entradas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400"
            />
          </div>

          {/* Filtros */}
          <div className="space-y-3">
            {/* Filtros compactos en una línea */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <Filter size={16} className="text-gray-500" />
                <span className="text-sm text-gray-600 font-medium hidden sm:inline">Filtrar:</span>
              </div>
              
              {/* Filtros principales compactos */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {/* Privacy Toggle compacto */}
                <motion.button
                  onClick={togglePrivateEntries}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                    showPrivateEntries 
                      ? 'bg-slate-100 text-slate-700 border-slate-300' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-200'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {showPrivateEntries ? <Eye size={12} /> : <EyeOff size={12} />}
                  <span className="hidden sm:inline whitespace-nowrap">
                    {showPrivateEntries ? 'Privadas' : 'Privadas'}
                  </span>
                </motion.button>

                {/* Sort compacto */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'emotion' | 'category')}
                  className="px-2 py-1.5 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:border-slate-400 text-xs font-medium text-gray-600 hover:bg-gray-200 transition-all"
                >
                  <option value="date">📅 Fecha</option>
                  <option value="emotion">😊 Emoción</option>
                  <option value="category">📁 Categoría</option>
                </select>
              </div>
            </div>

            {/* Filtros específicos - Solo mostrar los activos + scroll horizontal */}
            {(selectedEmotion || selectedCategory || selectedEntryType) && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {/* Emociones activas */}
                {selectedEmotion && (
                  <motion.button
                    onClick={() => setSelectedEmotion('')}
                    className="flex items-center space-x-1 px-2 py-1 bg-slate-600 text-white rounded-full text-xs font-medium whitespace-nowrap"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>{emotions.find(e => e.id === selectedEmotion)?.icon}</span>
                    <span>{emotions.find(e => e.id === selectedEmotion)?.name}</span>
                    <span className="ml-1">×</span>
                  </motion.button>
                )}

                {/* Categorías activas */}
                {selectedCategory && (
                  <motion.button
                    onClick={() => setSelectedCategory('')}
                    className="flex items-center space-x-1 px-2 py-1 bg-slate-600 text-white rounded-full text-xs font-medium whitespace-nowrap"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {selectedCategory === 'emociones' && <span>📸 Emociones</span>}
                    {selectedCategory === 'creatividad' && <span>🎨 Creatividad</span>}
                    {selectedCategory === 'viajar' && <span>✈️ Viajar</span>}
                    {selectedCategory === 'dormir' && <span>😴 Dormir</span>}
                    {selectedCategory === 'fiestas' && <span>🎉 Fiestas</span>}
                    {selectedCategory === 'salud' && <span>🌱 Salud</span>}
                    <span className="ml-1">×</span>
                  </motion.button>
                )}

                {/* Tipos de entrada activos */}
                {selectedEntryType && (
                  <motion.button
                    onClick={() => setSelectedEntryType('')}
                    className="flex items-center space-x-1 px-2 py-1 bg-slate-600 text-white rounded-full text-xs font-medium whitespace-nowrap"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {selectedEntryType === 'category' && <span>📝 Categoría</span>}
                    {selectedEntryType === 'random' && <span>🎲 Aleatorio</span>}
                    {selectedEntryType === 'free' && <span>✍️ Libre</span>}
                    {selectedEntryType === 'inspiration' && <span>✨ Inspiración</span>}
                    <span className="ml-1">×</span>
                  </motion.button>
                )}
              </div>
            )}

            {/* Botón para expandir todos los filtros */}
            <details className="group">
              <summary className="flex items-center justify-center p-2 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer text-xs text-gray-600 font-medium transition-colors">
                <span className="group-open:hidden">Más filtros</span>
                <span className="hidden group-open:inline">Menos filtros</span>
                <svg className="w-4 h-4 ml-1 group-open:rotate-180 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </summary>
              
              <div className="mt-3 space-y-2">
                {/* Emociones */}
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-2">Emociones:</p>
                  <div className="flex flex-wrap gap-1">
                    {emotions.map(emotion => (
                      <motion.button
                        key={emotion.id}
                        onClick={() => setSelectedEmotion(selectedEmotion === emotion.id ? '' : emotion.id)}
                        className={`px-2 py-1 rounded-full text-xs font-medium transition-all border ${
                          selectedEmotion === emotion.id
                            ? 'bg-slate-600 text-white border-slate-600'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-200'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="mr-1">{emotion.icon}</span>
                        <span className="hidden sm:inline">{emotion.name}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Categorías */}
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-2">Categorías:</p>
                  <div className="flex flex-wrap gap-1">
                    {[
                      { id: 'emociones', icon: '📸', name: 'Emociones' },
                      { id: 'creatividad', icon: '🎨', name: 'Creatividad' },
                      { id: 'viajar', icon: '✈️', name: 'Viajar' },
                      { id: 'dormir', icon: '😴', name: 'Dormir' },
                      { id: 'fiestas', icon: '🎉', name: 'Fiestas' },
                      { id: 'salud', icon: '🌱', name: 'Salud' }
                    ].map((category) => (
                      <motion.button
                        key={category.id}
                        onClick={() => setSelectedCategory(selectedCategory === category.id ? '' : category.id)}
                        className={`px-2 py-1 rounded-full text-xs font-medium transition-all border ${
                          selectedCategory === category.id
                            ? 'bg-slate-600 text-white border-slate-600'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-200'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="mr-1">{category.icon}</span>
                        <span className="hidden sm:inline">{category.name}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Tipos de entrada */}
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-2">Origen:</p>
                  <div className="flex flex-wrap gap-1">
                    {[
                      { id: 'category', icon: '📝', name: 'Categoría' },
                      { id: 'random', icon: '🎲', name: 'Aleatorio' },
                      { id: 'free', icon: '✍️', name: 'Libre' },
                      { id: 'inspiration', icon: '✨', name: 'Inspiración' }
                    ].map((entryType) => (
                      <motion.button
                        key={entryType.id}
                        onClick={() => setSelectedEntryType(selectedEntryType === entryType.id ? '' : entryType.id)}
                        className={`px-2 py-1 rounded-full text-xs font-medium transition-all border ${
                          selectedEntryType === entryType.id
                            ? 'bg-slate-600 text-white border-slate-600'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-200'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="mr-1">{entryType.icon}</span>
                        <span className="hidden sm:inline">{entryType.name}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </details>
          </div>
        </motion.div>

        {/* Entries */}
        {filteredEntries.length === 0 ? (
          <motion.div
            variants={itemVariants}
            className="text-center py-12 space-y-4"
          >
            <div className="text-6xl">📝</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {searchTerm || selectedEmotion || selectedCategory || selectedEntryType 
                  ? 'No se encontraron entradas' 
                  : 'Tu diario está esperándote'
                }
              </h3>
              <p className="text-gray-500 text-sm">
                {searchTerm || selectedEmotion || selectedCategory || selectedEntryType 
                  ? 'Intenta ajustar tus filtros de búsqueda'
                  : 'Comienza escribiendo tu primera entrada'
                }
              </p>
            </div>
            {!searchTerm && !selectedEmotion && !selectedCategory && !selectedEntryType && (
              <motion.button
                onClick={handleNewEntry}
                className="bg-gradient-to-r from-slate-600 to-gray-700 text-white px-6 py-3 rounded-xl font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Escribir primera entrada
              </motion.button>
            )}
          </motion.div>
        ) : (
          <motion.div 
            variants={itemVariants} 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
          >
            <AnimatePresence>
              {filteredEntries.map((entry, index) => {
                const emotionData = getEmotionData(entry.emotion);
                
                // Diferentes estilos de papel basados en la emoción y el índice
                const paperStyles = [
                  // Hoja de cuaderno rasgada
                  "paper-notebook",
                  // Post-it colorido
                  "paper-postit", 
                  // Pergamino vintage
                  "paper-vintage",
                  // Nota adhesiva
                  "paper-sticky",
                  // Papel de diario personal
                  "paper-diary"
                ];
                
                const paperStyle = paperStyles[index % paperStyles.length];
                const emotionColor = emotionData?.color || '#64748b';
                
                return (
                  <motion.div
                    key={entry.id}
                    id={`entry-${entry.id}`}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      scale: 1
                    }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    whileHover={{ 
                      scale: 1.03,
                      y: -4,
                      transition: { duration: 0.2 }
                    }}
                    className={`relative ${paperStyle} overflow-hidden break-inside-avoid cursor-pointer ${
                      highlightEntryId === entry.id ? 'ring-4 ring-purple-400 ring-opacity-75 shadow-lg shadow-purple-200' : ''
                    }`}
                    style={{ 
                      '--emotion-color': emotionColor
                    } as any}
                  >
                    <motion.button
                      onClick={() => openModal(entry, paperStyle)}
                      className={`w-full p-6 text-left transition-all duration-200 ${
                        paperStyle === 'paper-notebook' ? 'pl-12' : ''
                      } ${paperStyle === 'paper-vintage' ? 'p-8' : ''}`}
                      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {emotionData && (
                              <span 
                                className="px-2 py-1 rounded-full text-xs font-bold border bg-white/90 backdrop-blur-sm shadow-sm"
                                style={{ 
                                  borderColor: emotionData.color,
                                  color: emotionData.color 
                                }}
                              >
                                {emotionData.icon} {emotionData.name}
                              </span>
                            )}
                            
                            {/* Origin indicator */}
                            {entry.entryType && (
                              <span className="px-2 py-1 bg-slate-200 text-slate-800 rounded-full text-xs font-semibold border border-slate-300">
                                {entry.entryType === 'category' && '📝 Categoría'}
                                {entry.entryType === 'random' && '🎲 Aleatorio'}
                                {entry.entryType === 'free' && '✍️ Libre'}
                                {entry.entryType === 'inspiration' && '✨ Inspiración'}
                                {entry.category && ` (${entry.category})`}
                              </span>
                            )}
                            
                            {entry.isPrivate && (
                              <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold border border-red-200">
                                <EyeOff size={12} className="inline mr-1" />
                                Privada
                              </span>
                            )}
                            <span className="text-xs text-gray-700 font-medium">
                              {formatDate(entry.date)}
                            </span>
                          </div>
                          
                          <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 leading-snug">
                            {entry.title}
                          </h3>
                          
                          <p className="text-sm text-gray-700 line-clamp-3 leading-relaxed font-medium">
                            {entry.content.substring(0, 100)}
                            {entry.content.length > 100 && '...'}
                          </p>
                          
                          {entry.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-3">
                              {entry.tags.slice(0, 2).map(tag => (
                                <span 
                                  key={tag}
                                  className="px-1.5 py-0.5 bg-slate-200 text-slate-800 rounded text-xs truncate max-w-20 font-semibold border border-slate-300"
                                >
                                  #{tag}
                                </span>
                              ))}
                              {entry.tags.length > 2 && (
                                <span className="text-xs text-gray-700 self-center font-medium">
                                  +{entry.tags.length - 2}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        
                      </div>
                    </motion.button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </motion.div>

      {/* Modal para ver detalles */}
      <AnimatePresence>
        {showModal && selectedEntry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative ${modalPaperStyle} modal-size max-w-2xl w-full max-h-[80vh] overflow-y-auto`}
              style={{
                '--emotion-color': getEmotionData(selectedEntry.emotion)?.color || '#64748b'
              } as any}
            >
              {/* Botón cerrar */}
              <motion.button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white shadow-lg border border-gray-200 rounded-full transition-all duration-200 text-gray-700 hover:text-gray-900"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </motion.button>

              {/* Contenido del modal */}
              <div className={`p-8 ${modalPaperStyle === 'paper-notebook' ? 'pl-16' : ''} ${modalPaperStyle === 'paper-vintage' ? 'p-12' : ''}`}>
                {/* Header */}
                <div className="space-y-4 mb-6">
                  <div className="flex flex-wrap items-center gap-2">
                    {(() => {
                      const emotionData = getEmotionData(selectedEntry.emotion);
                      return emotionData && (
                        <span 
                          className="px-3 py-1 rounded-full text-sm font-bold border-2 bg-white/95 backdrop-blur-sm shadow-sm"
                          style={{ 
                            borderColor: emotionData.color,
                            color: emotionData.color 
                          }}
                        >
                          {emotionData.icon} {emotionData.name}
                        </span>
                      );
                    })()}
                    
                    {selectedEntry.entryType && (
                      <span className="px-3 py-1 bg-slate-200 text-slate-800 rounded-full text-sm font-semibold border border-slate-300">
                        {selectedEntry.entryType === 'category' && '📝 Categoría'}
                        {selectedEntry.entryType === 'random' && '🎲 Aleatorio'}
                        {selectedEntry.entryType === 'free' && '✍️ Libre'}
                        {selectedEntry.entryType === 'inspiration' && '✨ Inspiración'}
                        {selectedEntry.category && ` (${selectedEntry.category})`}
                      </span>
                    )}
                    
                    {selectedEntry.isPrivate && (
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold border border-red-200">
                        <EyeOff size={14} className="inline mr-1" />
                        Privada
                      </span>
                    )}
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                    {selectedEntry.title}
                  </h2>

                  <div className="flex items-center space-x-2 text-sm text-gray-700 font-medium">
                    <Calendar size={16} />
                    <span>{new Date(selectedEntry.date).toLocaleString('es-ES')}</span>
                  </div>
                </div>

                {/* Prompt si existe */}
                {selectedEntry.promptText && (
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded mb-6 shadow-sm">
                    <p className="text-amber-900 text-sm font-semibold mb-2">
                      💡 Prompt utilizado:
                    </p>
                    <p className="text-amber-800 text-sm italic font-medium">
                      "{selectedEntry.promptText}"
                    </p>
                  </div>
                )}

                {/* Contenido principal */}
                <div className="prose prose-gray max-w-none mb-6">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-base font-medium">
                    {selectedEntry.content}
                  </p>
                </div>

                {/* Tags */}
                {selectedEntry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedEntry.tags.map((tag: string) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 bg-slate-200 text-slate-800 rounded-full text-sm font-semibold border border-slate-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Acciones */}
                <div className="flex items-center justify-end space-x-3 pt-4 border-t border-black/20">
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Navigate to edit mode (future feature)
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-slate-100 text-slate-800 hover:bg-slate-200 hover:text-slate-900 rounded-lg transition-all duration-200 font-medium border border-slate-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Edit3 size={16} />
                    <span>Editar</span>
                  </motion.button>
                  
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm('¿Estás segura de que quieres eliminar esta entrada?')) {
                        deleteEntry(selectedEntry.id);
                        closeModal();
                      }
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800 rounded-lg transition-all duration-200 font-medium border border-red-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Trash2 size={16} />
                    <span>Eliminar</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DiaryView; 