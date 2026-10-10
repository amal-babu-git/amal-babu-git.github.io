// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from "@tailwindcss/vite";
import react from '@astrojs/react';
import rehypePaper from './src/plugins/rehype-paper.mjs';


// https://astro.build/config
export default defineConfig({
    site: 'https://amal-babu-git.github.io',
    integrations: [mdx(), sitemap(), react()],
    markdown: {
        rehypePlugins: [rehypePaper],
        // Light listings on paper; the dark theme switches in with the site theme.
        shikiConfig: {
            themes: { light: 'github-light', dark: 'github-dark' },
        },
    },
    vite: {
        plugins: [tailwindcss()],
    },
});
