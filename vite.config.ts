/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite';
import type { UserConfig as VitestUserConfigInterface } from 'vitest/config';

const vitestConfig: VitestUserConfigInterface = {
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/test/setup.ts',
  },
};
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    jsxInject: "import React from 'react'",
  },
  test: vitestConfig.test,
});
