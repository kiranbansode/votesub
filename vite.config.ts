import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import { EsLinter, linterPlugin, TypeScriptLinter } from 'vite-plugin-linter';
import { VitePWA as vitePWA } from 'vite-plugin-pwa';

const reactSvgPlugin = require('vite-plugin-react-svg');

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [
    react(),
    vitePWA(),
    reactSvgPlugin(),
    // linterPlugin({
    //   include: ['./src/**/*.ts', './src/**/*.tsx'],
    //   linters: [new EsLinter({ configEnv: viteConfig }), new TypeScriptLinter()],
    // }),
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
    ],
  },
}));
