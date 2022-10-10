import { defineStore } from "pinia"

export const globalStore = defineStore('globalStore',{
    state: () => ({
        notificationCount: 0,
        notificationList: []
    }),
    getters: {
        getNotificationCount: (state) => {
            return state.notificationCount
        },
        getNotificationList: (state) => {
            return state.notificationList
        }
    },
    actions: {
        saveNotifications(notification) {
            // unshift to this.notificationList
        },
        saveNotificationCount(count) {
            console.log(count)
            this.notificationCount = count
        },
        refreshNotifications(data) {
            console.log(data)
            this.notificationCount = data.count
            this.notificationList = data.list
        }
    }
})