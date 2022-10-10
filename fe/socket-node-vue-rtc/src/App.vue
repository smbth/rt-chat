<!-- 
<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
-->

<script setup>
import { ref, computed } from 'vue';
// import SocketioService from './services/socketio.service.js'
import { globalStore } from '@/store/store.js'
import { io } from 'socket.io-client'
import { storeToRefs } from 'pinia';

// SocketioService.setupSocketConnection()

// SocketioService.pushMessageToBe()
// SocketioService.subscribeToMessageFromBe()

const store = globalStore()

var socket = io('http://localhost:3000')

var count = 1

socket.emit('start notifications')

socket.on('notification started', (data) => {
    if(data.count==10) socket.disconnect()
    store.refreshNotifications(data)
    // console.log(data)
})

const notificationFlyOutOpen = ref(false);
const unReadCount = computed(() => store.notificationCount)
const notificationList = computed(() => store.notificationList)

const toggleNotification = () => {
  notificationFlyOutOpen.value = !notificationFlyOutOpen.value
}
</script>

<template>
  <div>
    <button @click="toggleNotification">
      <i class="fa fa-bell" style="font-size:24px"></i>
      <sup>{{unReadCount}}</sup>
    </button>
    <div class="table-container" v-if="notificationFlyOutOpen">
      <table>
        <tr v-for="item in notificationList" :key="item">
          <!-- <td>{{item}}</td> -->
          <td>
            <p class="noti-details">{{item.id}}</p>
            <p>{{item.notification}}</p>
            <p class="noti-details">Unread</p>
          </td>
        </tr>
        <tr v-if="!notificationList.length">
          <td>No Notifications</td>
        </tr>
        <!-- <tr>
          <td>Notification 2 from App 1</td>
        </tr>
        <tr>
          <td>Notification 1 from App 2</td>
        </tr> -->
      </table>
    </div>
  </div>
</template>

<style>
/*div {
  display: flex;
  justify-content: center;
  align-items: center;
}*/

table {
  border-collapse: collapse;  
  font-size: xx-large;
  width: 500px;
  text-align: center;
  /* height: 300px;
  overflow: auto; */
}

tr {
  height: 100px;
}

td {
  border: 1px solid grey;
}

button {
  font-size: xx-large;
}

.table-container {
  max-height: 400px;
  /* width: 500px; */
  overflow-x: auto;
  width: fit-content;
  border: 1px solid grey;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

p {
   margin: 2px;
}

.noti-details {
  text-align: left;
  font-size: large !important;
}
</style>