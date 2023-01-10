import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA as vitePWA } from 'vite-plugin-pwa';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';

const reactSvgPlugin = require('vite-plugin-react-svg');

// https://vitejs.dev/config/
export default defineConfig(() => ({
    plugins: [
        react(),
        vitePWA(),
        reactSvgPlugin(),

        // Manual Chunking - Divided big vendor file into sub small vendor files
        chunkSplitPlugin({
            strategy: 'single-vendor',
            customSplitting: {
                'react-vendor': ['react', 'react-dom'],
                'react-eco': ['react-router-dom', 'react-lazy-with-preload'],
                utils: ['nanoid', 'dayjs', 'country-list-with-dial-code-and-flag'],
                mui: [
                    '@emotion/react',
                    '@emotion/styled',
                    '@mui/icons-material',
                    '@mui/lab',
                    '@mui/material',
                    '@mui/x-date-pickers',
                ],
                form: ['@hookform/resolvers', 'react-hook-form', 'yup'],
                redux: ['@reduxjs/toolkit', 'react-redux'],
                firebase: [
                    'firebase/app',
                    'firebase/auth',
                    'firebase/firestore',
                    'firebase/storage',
                    'firebase/functions',
                ],
                styles: ['animate.css', 'sass', 'styled-components'],
            },
        }),
    ],

    // Absolute imports (aliases)
    resolve: {
        alias: [
            { find: 'assets', replacement: '/src/assets' },
            { find: 'components', replacement: '/src/components' },
            { find: 'config', replacement: '/src/config' },
            { find: 'hooks', replacement: '/src/hooks' },
            { find: 'layouts', replacement: '/src/layouts' },
            { find: 'pages', replacement: '/src/pages' },
            { find: 'store', replacement: '/src/store' },
            { find: 'styled', replacement: '/src/styled' },
            { find: 'utils', replacement: '/src/utils' },
            { find: 'types', replacement: '/src/types' },
            { find: 'features', replacement: '/src/features' },
        ],
    },
}));
