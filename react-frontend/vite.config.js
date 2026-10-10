import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Build khusus Blogger:
// - Library mode + format IIFE => satu file JS mandiri yang bisa di-inline di <script>.
// - Nama file tetap (tanpa hash): dist/blogger-theme.js & dist/blogger-theme.css.
// - Tanpa code splitting & semua aset kecil di-inline, karena Blogger tidak bisa
//   meng-host chunk tambahan.
// `npm run dev` tetap memakai index.html + data mock seperti biasa.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Library mode tidak mengganti process.env.NODE_ENV; React butuh ini agar
  // memakai build production yang kecil.
  define:
    command === 'build'
      ? { 'process.env.NODE_ENV': JSON.stringify('production') }
      : {},
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    copyPublicDir: false,
    cssCodeSplit: false,
    assetsInlineLimit: Number.MAX_SAFE_INTEGER,
    lib: {
      entry: 'src/main.jsx',
      name: 'BloggerTheme',
      formats: ['iife'],
      fileName: () => 'blogger-theme.js',
      cssFileName: 'blogger-theme',
    },
  },
}))
