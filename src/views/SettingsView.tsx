import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { loadMockData } from '../data/mockData';
import { useOptimizedAnimations } from '../utils/useResponsive';
import { useAppStore } from '../stores/appStore';
import { 
  ArrowLeft, 
  Brain,
  Database,
  Moon,
  Sun
} from 'lucide-react';
import DarkModeToggle from '../components/DarkModeToggle';

const SettingsView: React.FC = () => {
  const navigate = useNavigate();
  const { concienciaSettings, updateConcienciaSettings, isDarkMode } = useAppStore();

  // Usar animaciones optimizadas
  const { containerVariants, itemVariants } = useOptimizedAnimations();

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
            className="flex items-center text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 mb-4 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Volver
          </button>
          
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">
            Ajustes
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Personaliza tu experiencia con "Ideas para..."
          </p>
        </motion.div>

        {/* ConciencIA Settings */}
        <motion.div variants={itemVariants}>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center">
            <Brain size={20} className="mr-2 text-slate-600 dark:text-slate-400" />
            ConciencIA
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-600">
              <div className="mb-3">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">API Key de OpenAI</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  Necesaria para que ConciencIA pueda conversar contigo. 
                  <a 
                    href="https://platform.openai.com/api-keys" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 ml-1 underline"
                  >
                    Obtener API key →
                  </a>
                </p>
                {concienciaSettings.apiKey && !concienciaSettings.apiKey.startsWith('sk-') && (
                  <div className="mb-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-red-800 dark:text-red-300 text-sm">
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
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-sm font-mono bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
                />
                {concienciaSettings.apiKey && concienciaSettings.apiKey.startsWith('sk-') && concienciaSettings.apiKey.length > 40 && (
                  <div className="absolute right-3 top-2.5">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                )}
              </div>
              
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Tu API key se guarda localmente y nunca se comparte. Formato: sk-proj-...
              </p>
              
              {!concienciaSettings.apiKey?.startsWith('sk-') && (
                <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="text-sm text-blue-800 dark:text-blue-300">
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

            <div className="p-4 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-600">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Personalidad</h3>
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
                        ? 'bg-slate-100 dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-500'
                        : 'bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <div className="font-medium text-slate-800 dark:text-slate-200">{personality.label}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">{personality.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-600">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Estilo de respuesta</h3>
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
                        ? 'bg-slate-100 dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-500'
                        : 'bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <div className="font-medium text-slate-800 dark:text-slate-200">{style.label}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">{style.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-600">
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">Soporte emocional</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Priorizar el bienestar emocional</p>
              </div>
              <motion.button
                onClick={() => updateConcienciaSettings({ 
                  includeEmotionalSupport: !concienciaSettings.includeEmotionalSupport 
                })}
                className={`w-12 h-6 rounded-full transition-colors ${
                  concienciaSettings.includeEmotionalSupport ? 'bg-slate-600' : 'bg-slate-300 dark:bg-slate-600'
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
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center">
            <div className="mr-2">
              {isDarkMode ? <Moon size={20} className="text-slate-600 dark:text-slate-400" /> : <Sun size={20} className="text-yellow-600" />}
            </div>
            Configuración
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-600">
              <div className="flex items-center space-x-3">
                {isDarkMode ? <Moon size={20} className="text-slate-600 dark:text-slate-400" /> : <Sun size={20} className="text-yellow-600" />}
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200">Modo oscuro</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Cambia entre tema claro y oscuro</p>
                </div>
              </div>
              <DarkModeToggle />
            </div>
          </div>
        </motion.div>

        {/* Datos de Prueba */}
        <motion.div variants={itemVariants}>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center">
            <Database size={20} className="mr-2 text-slate-600 dark:text-slate-400" />
            Datos de Prueba
          </h2>
          
          <div className="p-4 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-600">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  Cargar contenido de ejemplo
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Carga 10 entradas de diario de ejemplo para ver cómo se vería tu app con contenido
                </p>
              </div>
              <motion.button
                onClick={loadMockData}
                className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cargar ejemplos
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Debug Section */}
        <motion.div variants={itemVariants}>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center">
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