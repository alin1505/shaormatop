import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Change 'shaorma-blog' to your GitHub repository name
export default defineConfig({
  plugins: [react()],
  base: '/shaormatop/',
})
