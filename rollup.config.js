import typescript from 'rollup-plugin-typescript';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import pkg from './package.json';

export default {
  input: './src/main.ts',
  output: [
		{
			file: pkg.main,
			format: 'cjs'
		},
		{
			file: pkg.module,
			format: 'es'
		},
		{
			file: pkg.browser,
			format: 'iife'
		}
	],
  plugins: [
    typescript(),
    resolve(),
    commonjs({extensions: ['.js', '.ts']})
  ]
}