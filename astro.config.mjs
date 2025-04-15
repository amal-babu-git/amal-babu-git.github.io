// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from "@tailwindcss/vite";


import react from '@astrojs/react';


// https://astro.build/config
export default defineConfig({
    site: 'https://amal-babu-git.github.io', // Your GitHub Pages URL
    base: '/', // Base path (empty for username sites)
    integrations: [mdx(), sitemap(), react()],
    vite: {
        plugins: [tailwindcss()],
        build: {
            // Improve production build
            minify: 'terser',
            cssMinify: true,
            rollupOptions: {
                output: {
                    manualChunks: {
                        // Separate vendor chunks for better caching
                        vendor: ['react', 'react-dom']
                    }
                }
            }
        }
    },
    // Additional production optimizations
    compressHTML: true,
    build: {
        inlineStylesheets: 'auto'
    }
});