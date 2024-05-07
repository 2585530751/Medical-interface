import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import path from 'path';
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import svgLoader from 'vite-svg-loader'
import wasm from "vite-plugin-wasm";
import requireTransform from 'vite-plugin-require-transform';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Icons({
      /* options */
    }),
    svgLoader(),
    wasm(),
    // requireTransform({
    //   fileRegex: /.js$|.vue$/
    // }),
    // commonjs({
    //   include: 'node_modules/**',
    //   extensions: ['.js', '.cjs', '.mjs'],
    //   }), 
    // resolve({
      
    // })
  ],
  // build: {
  //   commonjsOptions: {
  //       include: ['node_modules/**'],
  //       // namedExports: ["default"],
  //       strictRequires: true,
  //   }
  // },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // '@cornerstonejs/tools': '@cornerstonejs/tools/dist/umd/index.js',
      '@cornerstonejs/dicom-image-loader': '@cornerstonejs/dicom-image-loader/dist/dynamic-import/cornerstoneDICOMImageLoader.min.js',
      '@cornerstone-nifti-image-loader': '@cornerstonejs/nifti-image-loader/dist/cornerstoneNIFTIImageLoader.min.js',
      '/src/index.worker.64c896c4316fcd506666.worker.js': path.resolve(__dirname, 'node_modules', '@cornerstonejs', 'dicom-image-loader', 'dist', 'dynamic-import', 'index.worker.64c896c4316fcd506666.worker.js')
    }
  },
  preview: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin'
    },
  },
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin'
    },
    proxy: {
      "/api": {
        // 这里填写后端地址
        target: "http://127.0.0.1:8080/",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, "")
      }
    }
  }
})