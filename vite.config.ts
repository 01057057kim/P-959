import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  base: '/P-959/', 
  plugins: [
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/models/*',
          dest: 'models'
        }
      ]
    })
  ],
})