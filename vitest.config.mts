import swc from 'unplugin-swc';
import tsConfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    clearMocks: true,
    root: './',
    environment: 'node',
    setupFiles: ['reflect-metadata'],
    coverage: {
      all: true,
      enabled: true,
      include: ['src/**/*.ts'],
    },
  },
  plugins: [
    tsConfigPaths(),
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
});