import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({
      devOptions: {
        enabled: true
        /* other options */  
      },
      includeAssets: [
        'favicon.svg',
        'favicon.ico',
        'robots.txt',
        'apple-touch-icon.png',
        'android-chrome-192x192.png',
        'assets/android-chrome-512x512.png'
      ],
      manifest: {
        name: 'IceMan Breath App',
        short_name: 'Breath App',
        description: 'App to practice Breathing',
        icons: [
          {
            src: 'assets/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'assets/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        lang: 'en',
        theme_color: '#28545f',
        background_color: '#28545f',
        display: 'fullscreen',
      },
    }),
    react(),
  ],
})
