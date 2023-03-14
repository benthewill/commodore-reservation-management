import {defineStore} from "pinia";
import dayjs from "dayjs";


const reqData = async () => {
    return await $fetch('/api/fetchAllReservation').catch((e) => console.log(e))
}

export const storeAllReservations = defineStore('allReservations', {
    state: () => ({
        data: [],
        filteredData: [],
        loading: true,
        error: null,
    }),
    getters: {
        filterDataByLanes(state) {
            return state.filteredData.filter(item => item.node.guests.guest_last_name !== "Belcher")
        }
    },
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
        },
        async filterByDate(date) {
            let selected = dayjs(date).format('YYYY-MM-DD')

            try {
                await this.fetchData()
                let currentData = [...this.data]

                let filtering = this.data.filter(item => item.node.reservation_date == selected)
                this.filteredData = filtering
            } catch (e) {
                console.log(e)
            }
        }
    }
})