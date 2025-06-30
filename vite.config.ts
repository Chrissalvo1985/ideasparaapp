import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.jpeg', 'vite.svg', '*.png'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,jpeg,jpg}'],
        navigateFallback: 'index.html',
        navigateFallbackDenylist: [/^\/_/, /\/[^/?]+\.[^/]+$/],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-stylesheets',
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 año
              },
            },
          },
          {
            urlPattern: /^https:\/\/api\.openai\.com/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'openai-api',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24, // 1 día
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'Ideas para App',
        short_name: 'Ideas',
        description: 'Tu espacio de creatividad infinita - Diario digital inteligente con IA',
        theme_color: '#475569',
        background_color: '#f8fafc',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          },
        ],
        shortcuts: [
          {
            name: 'Nueva Entrada',
            short_name: 'Escribir',
            description: 'Crear una nueva entrada en el diario',
            url: '/diary',
            icons: [{ src: 'apple-touch-icon-76x76.png', sizes: '76x76' }]
          },
          {
            name: 'ConciencIA',
            short_name: 'Chat IA',
            description: 'Hablar con ConciencIA',
            url: '/consciencia',
            icons: [{ src: 'apple-touch-icon-76x76.png', sizes: '76x76' }]
          }
        ]
      },
    }),
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['framer-motion', 'lucide-react'],
          store: ['zustand'],
          ai: ['openai']
        }
      }
    }
  },
  server: {
    port: 5173,
    host: true
  },
  preview: {
    port: 4173,
    host: true
  }
})
