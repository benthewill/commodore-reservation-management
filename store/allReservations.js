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

            let addDetails = objCleanResEntrySorted.map(item => item.entries.map((entry,index) => {
                return {
                    ...entry,
                    leftMost: index === 0,
                    rightMost: index === item.entries.length - 1
                }
            }))
            // console.log(JSON.stringify(addDetails))

            let grouping = addDetails.map((item ) => {
                let props = []

                item.forEach((entry, index) => {
                    if (item.length > 1 && index !== 0 && item[index].bowling_lanes.lane_number - item[index - 1].bowling_lanes.lane_number !== 1) {
                        props.push({indx: index, position: "leftMost"})
                        props.push({indx: index-1, position: "rightMost"})
                    }
                })

                console.log(JSON.stringify(props))

                props.forEach((prop) => {
                    item[prop.indx][prop.position] = true
                })

                return item
            })

            // console.log(JSON.stringify(grouping))

            let flat = grouping.flat()

            console.log(JSON.stringify(flat))
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