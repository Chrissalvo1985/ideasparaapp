import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { categories } from '../data/categories';
import { loadMockData } from '../data/mockData';
import { 
  ArrowLeft, 
  Palette,
  Bell,
  Shield,
  HelpCircle,
  Star,
  Clock,
  Database,
  Brain
  } from 'lucide-react';
import { useAppStore } from '../stores/appStore';

const SettingsView: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [privateMode, setPrivateMode] = useState(false);
  
  const { concienciaSettings, updateConcienciaSettings } = useAppStore();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <div className="px-6 lg:px-8 pt-6 lg:pt-8 pb-6 lg:pb-8 max-w-4xl lg:mx-auto h-full overflow-y-auto smooth-scroll">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Volver
          </button>
          
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
            Ajustes
          </h1>
          <p className="text-gray-600">
            Personaliza tu experiencia con "Ideas para..."
          </p>
        </motion.div>

        {/* Categories Section */}
        <motion.div variants={itemVariants}>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Palette size={20} className="mr-2 text-purple-600" />
            Categorías disponibles
          </h2>
          
          <div className="space-y-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div 
                  key={category.id}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    category.isActive 
                      ? 'border-green-200 bg-green-50' 
                      : category.isComingSoon 
                        ? 'border-gray-200 bg-gray-50 opacity-60'
                        : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full bg-gradient-to-br ${category.gradient}`}>
                        <Icon size={20} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {category.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {category.isActive && (
                        <span className="text-green-600 text-sm font-medium">Activa</span>
                      )}
                      {category.isComingSoon && (
                        <div className="flex items-center text-gray-500 text-sm">
                          <Clock size={14} className="mr-1" />
                          Próximamente
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ConciencIA Settings */}
        <motion.div variants={itemVariants}>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Brain size={20} className="mr-2 text-violet-600" />
            ConciencIA
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white/60 rounded-xl border border-gray-200">
              <div className="mb-3">
                <h3 className="font-semibold text-gray-800 mb-1">API Key de OpenAI</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Necesaria para que ConciencIA pueda conversar contigo. 
                  <a 
                    href="https://platform.openai.com/api-keys" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-violet-600 hover:text-violet-800 ml-1"
                  >
                    Obtener API key →
                  </a>
                </p>
                {concienciaSettings.apiKey && !concienciaSettings.apiKey.startsWith('sk-') && (
                  <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 text-sm">
                      ⚠️ API key inválida. Debe empezar con "sk-" y tener ~50+ caracteres.
                    </p>
                  </div>
                )}
              </div>
              
              <div className="relative">
                <input
                  type="password"
                  value={concienciaSettings.apiKey || ''}
                  onChange={(e) => updateConcienciaSettings({ apiKey: e.target.value })}
                  placeholder="sk-proj-... (pega tu API key completa)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-sm font-mono"
                />
                {concienciaSettings.apiKey && concienciaSettings.apiKey.startsWith('sk-') && concienciaSettings.apiKey.length > 40 && (
                  <div className="absolute right-3 top-2.5">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                )}
              </div>
              
              <p className="text-xs text-gray-500 mt-2">
                Tu API key se guarda localmente y nunca se comparte. Formato: sk-proj-...
              </p>
              
              {!concienciaSettings.apiKey?.startsWith('sk-') && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-sm text-blue-800">
                    <strong>Cómo obtener tu API key:</strong>
                    <ol className="list-decimal list-inside mt-2 space-y-1">
                      <li>Ve a <a href="https://platform.openai.com/api-keys" target="_blank" className="underline">platform.openai.com/api-keys</a></li>
                      <li>Inicia sesión o crea una cuenta</li>
                      <li>Haz clic en "Create new secret key"</li>
                      <li>Copia la key completa (empieza con sk-)</li>
                      <li>Pégala aquí</li>
                    </ol>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-white/60 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-3">Personalidad</h3>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { value: 'empathetic', label: 'Empática', desc: 'Comprensiva y validadora' },
                  { value: 'creative', label: 'Creativa', desc: 'Innovadora e inspiradora' },
                  { value: 'supportive', label: 'Apoyo', desc: 'Mentora y constructiva' }
                ].map(personality => (
                  <button
                    key={personality.value}
                    onClick={() => updateConcienciaSettings({ personality: personality.value as any })}
                    className={`p-3 rounded-lg text-left transition-all ${
                      concienciaSettings.personality === personality.value
                        ? 'bg-violet-100 border-2 border-violet-300'
                        : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium text-gray-800">{personality.label}</div>
                    <div className="text-sm text-gray-600">{personality.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-white/60 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-3">Estilo de respuesta</h3>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { value: 'brief', label: 'Concisa', desc: 'Respuestas breves y directas' },
                  { value: 'detailed', label: 'Detallada', desc: 'Análisis profundos y completos' },
                  { value: 'creative', label: 'Creativa', desc: 'Lenguaje poético y metafórico' }
                ].map(style => (
                  <button
                    key={style.value}
                    onClick={() => updateConcienciaSettings({ responseStyle: style.value as any })}
                    className={`p-3 rounded-lg text-left transition-all ${
                      concienciaSettings.responseStyle === style.value
                        ? 'bg-violet-100 border-2 border-violet-300'
                        : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium text-gray-800">{style.label}</div>
                    <div className="text-sm text-gray-600">{style.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/60 rounded-xl border border-gray-200">
              <div>
                <h3 className="font-semibold text-gray-800">Soporte emocional</h3>
                <p className="text-sm text-gray-600">Priorizar el bienestar emocional</p>
              </div>
              <motion.button
                onClick={() => updateConcienciaSettings({ 
                  includeEmotionalSupport: !concienciaSettings.includeEmotionalSupport 
                })}
                className={`w-12 h-6 rounded-full transition-colors ${
                  concienciaSettings.includeEmotionalSupport ? 'bg-violet-600' : 'bg-gray-300'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="w-5 h-5 bg-white rounded-full shadow-sm"
                  animate={{
                    x: concienciaSettings.includeEmotionalSupport ? 28 : 2,
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* App Settings */}
        <motion.div variants={itemVariants}>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Bell size={20} className="mr-2 text-orange-600" />
            Configuración
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/60 rounded-xl border border-gray-200">
              <div>
                <h3 className="font-semibold text-gray-800">Recordatorios diarios</h3>
                <p className="text-sm text-gray-600">Recibe notificaciones para escribir</p>
              </div>
              <motion.button
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  notifications ? 'bg-purple-600' : 'bg-gray-300'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="w-5 h-5 bg-white rounded-full shadow-sm"
                  animate={{
                    x: notifications ? 28 : 2,
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/60 rounded-xl border border-gray-200">
              <div>
                <h3 className="font-semibold text-gray-800">Modo privado</h3>
                <p className="text-sm text-gray-600">Oculta contenido sensible</p>
              </div>
              <motion.button
                onClick={() => setPrivateMode(!privateMode)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  privateMode ? 'bg-purple-600' : 'bg-gray-300'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="w-5 h-5 bg-white rounded-full shadow-sm"
                  animate={{
                    x: privateMode ? 28 : 2,
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Datos de Prueba */}
        <motion.div variants={itemVariants}>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Database size={20} className="mr-2 text-slate-600" />
            Datos de Prueba
          </h2>
          
          <div className="p-4 bg-white/60 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  Cargar contenido de ejemplo
                </h3>
                <p className="text-sm text-gray-600">
                  Carga 10 entradas de diario de ejemplo para ver cómo se vería tu app con contenido
                </p>
              </div>
              <motion.button
                onClick={loadMockData}
                className="px-4 py-2 bg-slate-600 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cargar ejemplos
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Info Section */}
        <motion.div variants={itemVariants}>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <HelpCircle size={20} className="mr-2 text-blue-600" />
            Información
          </h2>
          
          <div className="space-y-3">
            <div className="p-4 bg-white/60 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-2">
                ¿Cómo funciona "Ideas para..."?
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Esta app te ayuda a explorar diferentes aspectos de tu vida a través de 
                la escritura reflexiva. Cada categoría tiene prompts específicos diseñados 
                para inspirarte y guiarte en tu proceso de autoconocimiento.
              </p>
            </div>

            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
              <div className="flex items-center space-x-2 mb-2">
                <Star size={16} className="text-purple-600" />
                <h3 className="font-semibold text-purple-800">
                  Próximas categorías
                </h3>
              </div>
              <p className="text-sm text-purple-700">
                Estamos trabajando en nuevas categorías como Productividad, Hogar, 
                Relaciones y Finanzas. ¡Mantente atento a las actualizaciones!
              </p>
            </div>
          </div>
        </motion.div>

        {/* Debug Buttons */}
        <motion.div variants={itemVariants}>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Database size={20} className="mr-2 text-blue-600" />
            Debug
          </h2>
          
          <div className="space-y-4">
            <motion.button
              onClick={() => {
                console.log('🔍 DEBUG - Estado del store:');
                const state = useAppStore.getState();
                console.log('📊 Entradas:', state.diaryEntries);
                console.log('👤 Progreso:', state.userProgress);
                console.log('🎯 Liberaciones:', state.liberationSessions);
                console.log('💾 localStorage:', localStorage.getItem('ideas-para-app-storage'));
                alert(`Debug info en consola:\n- Entradas: ${state.diaryEntries.length}\n- Progreso: ${state.userProgress.totalEntries}\n- Liberaciones: ${state.liberationSessions.length}`);
              }}
              className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-sm font-medium">🔍 Debug Store</span>
            </motion.button>
            
            <motion.button
              onClick={() => loadMockData()}
              className="w-full px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-sm font-medium">🎭 Cargar Datos de Prueba</span>
            </motion.button>
            
            <motion.button
              onClick={() => {
                if (confirm('¿Estás seguro? Esto eliminará todos los datos y recargará la app.')) {
                  localStorage.removeItem('ideas-para-app-storage');
                  console.log('🗑️ localStorage limpiado');
                  window.location.reload();
                }
              }}
              className="w-full px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-sm font-medium">🗑️ Limpiar Todo</span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
      

    </div>
  );
};

export default SettingsView; 