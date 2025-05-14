import { defineConfig } from 'tsup';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  esbuildOptions(options) {
    options.jsx = 'automatic';
  },
  async onSuccess() {
    // Process CSS with PostCSS and Tailwind
    const css = fs.readFileSync('src/styles/global.css', 'utf8');
    const result = await postcss([tailwindcss, autoprefixer]).process(css, {
      from: 'src/styles/global.css',
      to: 'dist/index.css',
    });

    // Write the processed CSS to dist
    fs.writeFileSync('dist/index.css', result.css);
  },
});
