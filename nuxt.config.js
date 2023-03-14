import {defineNuxtConfig} from "nuxt/config";

export default defineNuxtConfig({
    runtimeConfig: {
        endpoint: "https://czijnqyhctdhujaocoev.supabase.co/graphql/v1",
        headers: {
            apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6aWpucXloY3RkaHVqYW9jb2V2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODQwNTQ1NywiZXhwIjoxOTkzOTgxNDU3fQ.FzD8X4hyGjTOdI3Lwp5EMxjP7Yo-mvUrTVJZOoJAxRQ",
            authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6aWpucXloY3RkaHVqYW9jb2V2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODQwNTQ1NywiZXhwIjoxOTkzOTgxNDU3fQ.FzD8X4hyGjTOdI3Lwp5EMxjP7Yo-mvUrTVJZOoJAxRQ"
        }
    },
    modules: [
        'nuxt-electron',
        ['@pinia/nuxt', {
            autoImports: [
                'defineStore'
            ]
        }],
        '@nuxtjs/tailwindcss'
    ],
    electron: {
        include: ['electron'],
        outDir: 'dist-electron'
    }
})