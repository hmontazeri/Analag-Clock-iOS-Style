import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import tailwind from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json' assert { type: 'json' };

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main, // e.g. dist/index.cjs.js
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module, // e.g. dist/index.esm.js
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    // mark peerDeps (react, etc) as external
    peerDepsExternal(),

    // allow `import pkg from './package.json'`
    json(),

    // resolve node_modules packages and extensions
    resolve({ extensions: ['.js', '.jsx', '.ts', '.tsx'] }),

    // convert CommonJS modules to ES modules
    commonjs(),

    // process Tailwind + Autoprefixer, extract to dist/index.css
    postcss({
      extract: true,
      plugins: [tailwind(), autoprefixer()],
      sourceMap: true,
    }),

    // compile TS/TSX and emit .d.ts files into dist/types
    typescript({
      useTsconfigDeclarationDir: true,
      clean: true,
    }),
  ],
};
