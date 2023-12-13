import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "path";
import vitePluginImp from 'vite-plugin-imp'
import WindiCSS from 'vite-plugin-windicss'

import viteCompression from "vite-plugin-compression"
export default defineConfig({
  plugins: [
    react(),
    WindiCSS(),
    vitePluginImp({
      libList: [
        {
          libName: "antd",
          style: (name) => `antd/es/${name}/style`,
        },
      ],
    }),
    viteCompression({
      verbose: true, // 是否在控制台输出压缩结果
      disable: true, // 是否禁用压缩
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
        // 入口文件中JS输出地址
        entryFileNames: "static/js/[name]-[hash].js",
        // 对代码分割中产生的 chunk 自定义命名
        chunkFileNames: "static/chunk/[name]-[hash].js",
        // 资源出口路径(如：图片、css等)
        assetFileNames: function (assetInfo) {
          const name = assetInfo.name;
          if (/.css$/.test(name)) {
            return "static/css/[name]-[hash].[ext]";
          } else if (/.[jpe?g|png|gif]$/.test(name)) {
            return "static/images/[name]-[hash].[ext]";
          } else {
            return "static/[ext]/[name]-[hash].[ext]";
          }
        }
      },
    }
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, "src"),
      }
    ]
  },
  server: {
    port: 8080,
    host: true,
    https: false,
    open: true,
    proxy: {
      "/admin": {
        target: "http://192.168.50.162:8080",
        changeOrigin: true,
      },
      "/root": {
        target: "http://192.168.50.162:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/root/, '')
      },
      "/contract": {
        target: "http://192.168.50.162:8080",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/contract/, '')
      },
      "/toto": {
        target: "http://192.168.50.162:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/toto/, '')
      }
    }
  }
})
