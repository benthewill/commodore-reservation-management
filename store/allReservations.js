import {defineStore} from "pinia";

const reqData = async () => {
    return await $fetch('/api/fetchAllReservation').catch((e) => console.log(e))
}

export const storeAllReservations = defineStore('allReservations', {
    state: () => ({
        data: [],
        loading: true,
        error: null,
    }),
    actions: {
        async fetchData() {
            this.data = []
            this.loading = true
            try {
                this.data = await reqData()
                    .then(x => x)
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        }
    }
})