import {defineNuxtConfig} from "nuxt/config";

export default defineNuxtConfig({
    modules: [
        'nuxt-electron',
        ['@pinia/nuxt', {
            autoImports: [
                'defineStore'
            ]
        }]
    ],
    electron: {
        include: ['electron'],
        outDir: 'dist-electron'
    }
})