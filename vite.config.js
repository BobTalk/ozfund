import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "path";
import vitePluginImp from 'vite-plugin-imp'
import WindiCSS from 'vite-plugin-windicss'
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
    })
  ],
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
        target: "http://192.168.50.162:9000",
        changeOrigin: true,
      },
      "/operate": {
        target: "http://192.168.50.162:9000",
        changeOrigin: true,
      }
    }
  }
})
