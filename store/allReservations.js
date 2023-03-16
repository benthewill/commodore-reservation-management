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
        filterDataByEntries(state) {
            let filterByRes = state.filteredData.map((item) => {
                return item.node.lane_reservation_entriesCollection.edges
            })

            let cleanRes = filterByRes.map((item) => {
                return item.map(x => x.node)
            })

            let objCleanRes = cleanRes.map((item) => {
                return {
                    "reservation_id": item[0].reservation_id,
                    "entries": [...item]
                }
            })

            let objCleanResEntrySorted = objCleanRes.map((item) =>
                {
                    item.entries.sort((a,b) => a.bowling_lanes.lane_number - b.bowling_lanes.lane_number)
                    return item
                }
            )

            // const convertArrayToObject = (array, key) =>
            //     array.reduce((acc, curr) => {
            //         acc[curr[key]] = curr;
            //         return acc;
            //     }, {});
            //
            // let objConverted = convertArrayToObject(objCleanResEntrySorted, "reservation_id")
            //
            // console.log(JSON.stringify(objConverted))

            let addDetails = objCleanResEntrySorted.map(item => item.entries.map((entry,index) => {
                return {
                    ...entry,
                    leftMost: index === 0,
                    rightMost: index === item.entries.length - 1
                }
            }))

            let flat = addDetails.flat()

            return flat
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
                this.filteredData = this.data.filter(item => item.node.reservation_date === selected)
            } catch (e) {
                console.log(e)
            }
        }
    }
})