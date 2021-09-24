import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import createImportPlugin from "vite-plugin-import";
const { resolve } = require("path");
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createImportPlugin({
      onlyBuild: false, //是否只需要在生产环境中使用
      babelImportPluginOptions: [
        {
          libraryName: "antd-mobile",
          libraryDirectory: "es",
          style: true, // or 'css'
        },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  alias: {
    "@": resolve(__dirname, "src/"),
  },
});
