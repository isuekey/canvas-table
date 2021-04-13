
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/index.js',
  output: {
    name:'canvasTableJS',
    exports:'named',
  },
  plugins:[
    commonjs(),
    resolve(),
    babel(),
  ],
};
