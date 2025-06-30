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
    updateEntry,
    isDarkMode
  } = useAppStore();

  // Usar animaciones optimizadas
  const { containerVariants, itemVariants } = useOptimizedAnimations();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState('');
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
              openModal(entryToHighlight, entryToHighlight.isPrivate ? 'private' : 'public');
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
              className="p-2 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200 dark:border-slate-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={20} className="text-slate-600 dark:text-slate-300" />
            </motion.button>
            <div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">Mis Ideas</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {filteredEntries.length} entradas encontradas
              </p>
            </div>
          </div>
          
          <motion.button
            onClick={handleNewEntry}
            className="p-2 rounded-full bg-slate-600 dark:bg-slate-700 text-white hover:bg-slate-700 dark:hover:bg-slate-600"
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
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Buscar en tus entradas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:border-slate-400 dark:focus:border-slate-500 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          {/* Filtros */}
          <div className="space-y-3">
            {/* Filtros compactos en una línea */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <Filter size={16} className="text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium hidden sm:inline">Filtrar:</span>
              </div>
              
              {/* Filtros principales compactos */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {/* Privacy Toggle compacto */}
                <motion.button
                  onClick={togglePrivateEntries}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                    showPrivateEntries 
                      ? 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {showPrivateEntries ? <Eye size={12} /> : <EyeOff size={12} />}
                  <span className="hidden sm:inline whitespace-nowrap">
                    {showPrivateEntries ? 'Privadas' : 'Privadas'}
                  </span>
                </motion.button>



                {/* Emotion Filter compacto */}
                {uniqueEmotions.length > 0 && (
                  <select
                    value={selectedEmotion}
                    onChange={(e) => setSelectedEmotion(e.target.value)}
                    className="px-2 py-1.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-full focus:outline-none focus:border-slate-400 dark:focus:border-slate-500 text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                  >
                    <option value="">😊 Todas</option>
                    {uniqueEmotions.map(emotionId => {
                      const emotion = getEmotionData(emotionId);
                      return (
                        <option key={emotionId} value={emotionId}>
                          {emotion?.icon} {emotion?.name}
                        </option>
                      );
                    })}
                  </select>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Entries Grid */}
        <motion.div variants={itemVariants}>
          {filteredEntries.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {diaryEntries.length === 0 ? 'Tu diario está esperándote' : 'No se encontraron entradas'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {diaryEntries.length === 0 
                  ? 'Comienza escribiendo tu primera idea o reflexión' 
                  : 'Prueba ajustando los filtros de búsqueda'
                }
              </p>
              {diaryEntries.length === 0 && (
                <motion.button
                  onClick={handleNewEntry}
                  className="px-6 py-3 bg-slate-600 dark:bg-slate-700 text-white rounded-xl hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Escribir primera entrada
                </motion.button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEntries.map((entry, index) => {
                const emotionData = getEmotionData(entry.emotion);
                const isHighlighted = entry.id === highlightEntryId;
                
                // Determinar el estilo
                const entryStyle = entry.isPrivate ? 'private' : 'public';
                
                return (
                  <motion.div
                    key={entry.id}
                    id={`entry-${entry.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      scale: isHighlighted ? 1.05 : 1
                    }}
                    transition={{ 
                      delay: index * 0.1,
                      scale: { duration: 0.3 }
                    }}
                    className={`
                      cursor-pointer transition-all duration-200 min-h-[240px]
                      bg-white dark:bg-slate-700 
                      border-l-4 rounded-xl shadow-lg
                      hover:shadow-xl hover:-translate-y-1
                      ${entry.isPrivate 
                        ? 'border-l-slate-500 dark:border-l-slate-400' 
                        : 'border-l-red-500 dark:border-l-red-400 rounded-l-none rounded-r-xl'
                      }
                      ${isHighlighted ? 'ring-2 ring-slate-400 dark:ring-slate-500' : ''}
                    `}
                    style={{ 
                      borderLeftColor: entry.isPrivate ? (emotionData?.color || '#64748b') : undefined
                    }}
                    onClick={() => openModal(entry, entryStyle)}
                    whileHover={{ y: -2, scale: 1.02 }}
                  >
                    <div className={`p-6 ${!entry.isPrivate ? 'pl-10' : ''} h-full flex flex-col`}>
                      {/* Header with date and emotion */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{emotionData?.icon}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                            {formatDate(entry.date)}
                          </span>
                        </div>
                        {entry.isPrivate && (
                          <EyeOff size={14} className="text-gray-400 dark:text-gray-500" />
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-lg mb-3 line-clamp-2 text-gray-900 dark:text-gray-100">
                        {entry.title}
                      </h3>

                      {/* Content preview */}
                      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-4 leading-relaxed flex-1">
                        {entry.content}
                      </p>

                      {/* Meta info */}
                      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600 flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                          <span>{emotionData?.name}</span>
                          {entry.category && (
                            <>
                              <span>•</span>
                              <span className="capitalize">{entry.category}</span>
                            </>
                          )}
                        </div>
                        {entry.promptText && (
                          <div className="text-xs text-gray-400 dark:text-gray-500">
                            <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                              Prompt
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Modal */}
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
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`
                max-w-2xl w-full max-h-[80vh] overflow-y-auto
                bg-white dark:bg-slate-700 
                border-l-4 rounded-xl shadow-2xl
                ${modalPaperStyle === 'private' 
                  ? 'border-l-slate-500 dark:border-l-slate-400' 
                  : 'border-l-red-500 dark:border-l-red-400 rounded-l-none rounded-r-xl'
                }
              `}
              style={{ 
                borderLeftColor: modalPaperStyle === 'private' ? (getEmotionData(selectedEntry.emotion)?.color || '#64748b') : undefined
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`p-8 ${modalPaperStyle === 'public' ? 'pl-12' : ''}`}>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getEmotionData(selectedEntry.emotion)?.icon}</span>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(selectedEntry.date)}
                      </div>
                      <div className="text-xs text-gray-400 dark:text-gray-500 capitalize">
                        {getEmotionData(selectedEntry.emotion)?.name}
                        {selectedEntry.category && ` • ${selectedEntry.category}`}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {selectedEntry.isPrivate && (
                      <EyeOff size={16} className="text-gray-400 dark:text-gray-500" />
                    )}
                    <motion.button
                      onClick={closeModal}
                      className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ArrowLeft size={16} className="text-gray-600 dark:text-gray-300" />
                    </motion.button>
                  </div>
                </div>

                {/* Content */}
                {editingEntry?.id === selectedEntry.id ? (
                  <div className="space-y-4">
                    <input
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="w-full text-xl font-bold bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:border-slate-500 dark:focus:border-slate-400 outline-none pb-2 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="Título de la entrada"
                    />
                    <textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      className="w-full h-64 bg-transparent resize-none outline-none text-gray-800 dark:text-gray-200 leading-relaxed placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="Escribe tu entrada aquí..."
                    />
                    <div className="flex items-center space-x-3 pt-4">
                      <motion.button
                        onClick={() => {
                          updateEntry(selectedEntry.id, {
                            title: editedTitle,
                            content: editedContent
                          });
                          setEditingEntry(null);
                          closeModal();
                        }}
                        className="px-4 py-2 bg-slate-600 dark:bg-slate-700 text-white rounded-lg hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Guardar
                      </motion.button>
                      <motion.button
                        onClick={() => setEditingEntry(null)}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Cancelar
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                      {selectedEntry.title}
                    </h1>
                    
                    {selectedEntry.promptText && (
                      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-slate-400 dark:border-slate-500">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Prompt:</div>
                        <div className="text-sm text-gray-700 dark:text-gray-300 italic">
                          {selectedEntry.promptText}
                        </div>
                      </div>
                    )}
                    
                    <div className="prose prose-sm max-w-none">
                      <p className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                        {selectedEntry.content}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200 dark:border-gray-600">
                      <div className="flex items-center space-x-3">
                        <motion.button
                          onClick={() => {
                            setEditingEntry(selectedEntry);
                            setEditedTitle(selectedEntry.title);
                            setEditedContent(selectedEntry.content);
                          }}
                          className="flex items-center space-x-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Edit3 size={14} />
                          <span className="text-sm">Editar</span>
                        </motion.button>
                      </div>
                      
                      <motion.button
                        onClick={() => {
                          if (confirm('¿Estás seguro de que quieres eliminar esta entrada?')) {
                            deleteEntry(selectedEntry.id);
                            closeModal();
                          }
                        }}
                        className="flex items-center space-x-2 px-3 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Trash2 size={14} />
                        <span className="text-sm">Eliminar</span>
                      </motion.button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DiaryView; 