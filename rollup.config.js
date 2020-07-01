import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonJs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import serve from 'rollup-plugin-serve';
import replace from '@rollup/plugin-replace';
import livereload from 'rollup-plugin-livereload';

export default {
  input: 'demo/index.tsx',
  output: {
    file: './demo/public/bundle.js',
    format: 'iife',
  },
  plugins: [
    typescript({
      tsconfigOverride: {
        compilerOptions: { declaration: false }
      },
      clean: true,
    }),
    babel({
      presets: [ 'react-app' ],
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    commonJs(),
    resolve(),
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'development' ),
      'process.env.REACT_APP_ENVIRONMENT': JSON.stringify( process.env.REACT_APP_ENVIRONMENT ),
      'process.env.STORYBOOK_ENVIRONMENT': JSON.stringify( process.env.STORYBOOK_ENVIRONMENT ),
    }),
    serve({
      open: true,
      contentBase: './demo/public',
      host: 'localhost',
      port: '3000',
    }),
    livereload()
  ]
};



