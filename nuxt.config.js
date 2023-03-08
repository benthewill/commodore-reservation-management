import {defineNuxtConfig} from "nuxt/config";

export default defineNuxtConfig({
    modules: [
        'nuxt-electron'
    ],
    electron: {
        include: ['electron'],
        outDir: 'dist-electron'
    }
})