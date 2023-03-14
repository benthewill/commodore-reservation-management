import {defineStore} from "pinia";
import dayjs from "dayjs";

export const storeView = defineStore('viewStore', {
    state: () => {
        return {
            amount: 0,
            selected: ''
        }
    },
    getters: {
      selectDate(state) {
          return dayjs().add(state.amount, 'day').format('YYYY-MM-DD')
      }

    },
    actions: {
        incrementAmount() {
            this.amount++
        },
        decrementAmount() {
            this.amount--
        }
    }
})