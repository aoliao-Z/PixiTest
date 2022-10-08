import { defineConfig } from "vitest/config"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path"
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    test: {
        includeSource: ["src/**/*.{js,ts}"],
    },
    resolve: {
        alias: {
            "@": resolve("src"),
            "@assets": resolve("src/assets"),
            "@comps": resolve("src/components"),
            "@utils": resolve("src/utils"),
            "@router": resolve("src/router"),
            "@store": resolve("src/store"),
        },
    },
})
