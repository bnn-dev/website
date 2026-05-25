import { defineConfig } from 'waku/config';

export default defineConfig({
  vite: {
    assetsInclude: ['**/*.md'],
    plugins: [
      {
        name: 'writings-full-reload',
        hotUpdate({ file, server }) {
          if (!file.endsWith('.md') || !file.includes('/writings/')) {
            return;
          }

          server.ws.send({ type: 'full-reload' });
          return [];
        },
      },
    ],
  },
});
