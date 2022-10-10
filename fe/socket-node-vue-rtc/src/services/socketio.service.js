import { io } from 'socket.io-client';
import { globalStore } from '@/store/store.js'

// const store = globalStore()

class SocketioService {
    socket;
    // store = globalStore()
    constructor() {
    }

    setupSocketConnection() {
        // this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);
        this.socket = io('http://localhost:3000')
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }

    pushMessageToBe () {
        this.socket.emit('fe message', 'Hello there from Vue.');
    }

    subscribeToMessageFromBe() {
        this.socket.on('notification started', (data) => {
            // this.store.saveNotificationCount(data)
            console.log(data)
        })
    }

    
}

export default new SocketioService();