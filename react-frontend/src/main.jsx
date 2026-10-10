import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { readBloggerData } from './lib/blogger.js'

function mount() {
  const container = document.getElementById('root')
  if (!container) return

  // Baca markup server-side Blogger dulu, baru kosongkan #root untuk React.
  const data = readBloggerData(container)
  container.replaceChildren()

  createRoot(container).render(
    <StrictMode>
      <App data={data} />
    </StrictMode>,
  )
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount)
} else {
  mount()
}
