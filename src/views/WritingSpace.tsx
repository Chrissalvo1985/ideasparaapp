import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../stores/appStore';
import { emotions } from '../data/emotions';
import { getInspiration } from '../data/inspirations';
import HandwrittenInspiration from '../components/HandwrittenInspiration';
import { 
  ArrowLeft, 
  Save, 
  Shuffle, 
  Type,
  Eye,
  EyeOff,
  Heart,
  Tag
} from 'lucide-react';

const WritingSpace: React.FC = () => {
  const navigate = useNavigate();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  
  const {
    currentPrompt,
    currentEmotion,
    currentCategory,
    writingContent,
    setWritingContent,
    saveEntry,
    getRandomPrompt
  } = useAppStore();

  const [title, setTitle] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState(currentEmotion?.id || '');
  const [isPrivate, setIsPrivate] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [showSaveOptions, setShowSaveOptions] = useState(false);
  const [inspiration, setInspiration] = useState(() => getInspiration(currentCategory || undefined, currentEmotion?.id || selectedEmotion || undefined));

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const words = writingContent.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [writingContent]);

  const handleSave = () => {
    if (!writingContent.trim()) return;
    
    if (!title.trim()) {
      setTitle(`Escrito del ${new Date().toLocaleDateString()}`);
    }
    
    saveEntry({
      title: title || `Escrito del ${new Date().toLocaleDateString()}`,
      content: writingContent,
      emotion: selectedEmotion || 'neutral',
      isPrivate,
      tags
    });
    
    navigate('/diary');
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleNewInspiration = () => {
    const newInspiration = getInspiration(currentCategory || undefined, currentEmotion?.id || selectedEmotion || undefined);
    setInspiration(newInspiration);
  };

  const selectedEmotionData = emotions.find(e => e.id === selectedEmotion);

  return (
    <div className="min-h-screen px-4 lg:px-8 pt-4 lg:pt-8 pb-16 lg:pb-8 max-w-4xl lg:mx-auto bg-gradient-to-br from-gray-50/30 via-slate-50/20 to-stone-50/30 dark:from-slate-900/30 dark:via-slate-800/20 dark:to-gray-900/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-5 lg:space-y-8"
      >
        {/* Header minimalista */}
        <div className="flex items-center justify-between">
          <motion.button
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-gray-200 dark:border-slate-600 shadow-sm hover:bg-white dark:hover:bg-slate-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} className="text-slate-600 dark:text-slate-300" />
          </motion.button>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">{wordCount} palabras</span>
            {writingContent.trim() && (
              <motion.button
                onClick={handleSave}
                className="px-4 py-2 bg-slate-600 dark:bg-slate-700 text-white rounded-full text-sm font-medium shadow-sm hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Save size={14} className="mr-2 inline" />
                Guardar
              </motion.button>
            )}
          </div>
        </div>

        {/* Inspiración de la Autora */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          <HandwrittenInspiration 
            inspiration={inspiration}
            className="mb-6" 
          />
          <motion.button
            onClick={handleNewInspiration}
            className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-200 dark:border-slate-600 shadow-sm hover:bg-white dark:hover:bg-slate-700 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Nueva inspiración"
          >
            <Shuffle size={14} className="text-slate-600 dark:text-slate-300" />
          </motion.button>
        </motion.div>

        {/* Prompt sutil integrado si existe */}
        {currentPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-6"
          >
            <p className="text-slate-600 dark:text-slate-300 text-sm italic font-light">
              {currentPrompt.text}
            </p>
          </motion.div>
        )}

        {/* Writing Area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-slate-600/50 overflow-hidden shadow-sm"
          style={{
            boxShadow: '0 8px 32px rgba(100, 116, 139, 0.08)'
          }}
        >
          {/* Title Input */}
          <input
            type="text"
            placeholder="Título de tu escrito (opcional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 lg:p-5 bg-transparent border-b border-gray-200/60 dark:border-slate-600/60 focus:outline-none focus:border-slate-300 dark:focus:border-slate-500 placeholder-gray-400 dark:placeholder-slate-500 font-medium text-slate-700 dark:text-slate-200 transition-colors"
          />
          
          {/* Text Area */}
          <textarea
            ref={textAreaRef}
            placeholder={currentPrompt 
              ? "Deja que las palabras fluyan..." 
              : "¿Qué hay en tu corazón hoy? Escribe sin censura, sin juicios, solo déjate ser..."
            }
            value={writingContent}
            onChange={(e) => setWritingContent(e.target.value)}
            className="w-full h-72 lg:h-96 p-4 lg:p-6 bg-transparent resize-none focus:outline-none placeholder-gray-400 dark:placeholder-slate-500 leading-relaxed text-sm lg:text-base text-slate-700 dark:text-slate-200"
            style={{ 
              minHeight: '400px',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
            }}
          />
        </motion.div>

        {/* Save Options simplificadas */}
        {writingContent.trim() && !showSaveOptions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.button
              onClick={() => setShowSaveOptions(true)}
              className="px-6 py-3 bg-slate-600 dark:bg-slate-700 text-white rounded-full font-medium shadow-lg hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Save size={16} className="mr-2 inline" />
              Guardar mi escrito
            </motion.button>
          </motion.div>
        )}

        {/* Opciones avanzadas */}
        {showSaveOptions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-slate-600/50"
          >
            <motion.button
              onClick={() => setShowSaveOptions(!showSaveOptions)}
              className="w-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl p-3 flex items-center justify-center space-x-2 font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Save size={18} />
              <span>Guardar en mi diario</span>
            </motion.button>

            {showSaveOptions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-white/60 dark:bg-slate-700/60 backdrop-blur-sm rounded-xl p-4 border border-gray-100 dark:border-slate-600 space-y-4"
              >
                {/* Emotion Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ¿Cómo te sientes?
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {emotions.slice(0, 10).map((emotion) => (
                      <motion.button
                        key={emotion.id}
                        onClick={() => setSelectedEmotion(emotion.id)}
                        className={`p-2 rounded-lg border transition-colors ${
                          selectedEmotion === emotion.id
                            ? 'border-slate-300 dark:border-slate-500 bg-slate-50 dark:bg-slate-600'
                            : 'border-gray-200 dark:border-slate-600 bg-white/50 dark:bg-slate-700/50'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title={emotion.name}
                      >
                        <span className="text-lg">{emotion.icon}</span>
                      </motion.button>
                    ))}
                  </div>
                  {selectedEmotionData && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {selectedEmotionData.name}: {selectedEmotionData.description}
                    </p>
                  )}
                </div>

                {/* Privacy Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {isPrivate ? <EyeOff size={18} className="text-slate-600 dark:text-slate-400" /> : <Eye size={18} className="text-slate-600 dark:text-slate-400" />}
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {isPrivate ? 'Entrada privada' : 'Entrada visible'}
                    </span>
                  </div>
                  <motion.button
                    onClick={() => setIsPrivate(!isPrivate)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      isPrivate ? 'bg-slate-500 dark:bg-slate-600' : 'bg-gray-300 dark:bg-slate-700'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="w-5 h-5 bg-white rounded-full shadow-md"
                      animate={{ x: isPrivate ? 26 : 2 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  </motion.button>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Etiquetas (opcional)
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map((tag) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-200 px-2 py-1 rounded-full text-sm flex items-center space-x-1"
                      >
                        <span>{tag}</span>
                        <button
                          onClick={() => removeTag(tag)}
                          className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                        >
                          ×
                        </button>
                      </motion.span>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Presiona Enter para agregar etiqueta"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    className="w-full p-2 border border-gray-200 dark:border-slate-600 rounded-lg focus:outline-none focus:border-slate-300 dark:focus:border-slate-500 bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-slate-500"
                  />
                </div>

                {/* Save Button */}
                <motion.button
                  onClick={handleSave}
                  className="w-full bg-gradient-to-r from-slate-500 to-slate-600 dark:from-slate-600 dark:to-slate-700 text-white rounded-xl p-3 font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Guardar en mi diario
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default WritingSpace; 