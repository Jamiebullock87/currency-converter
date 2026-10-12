import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        tailwindcss(),
        react()
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'), // Maps '@' to the 'src' directory
        },
    },
})
