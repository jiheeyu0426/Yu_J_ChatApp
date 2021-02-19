import ChatMessage from "./components/TheMessageComponent.js"

(()=> {
    console.log('fired');

    // load the socket library and make a connection
    const socket = io();

    // messenger serivce event handling -> incoming from the manager
    function setUserId({sID, message}) {
        // incoming connected event with data
        //debugger;

        vm.socketID = sID;
    }

    function appendMessage(message) {
        vm.messages.push(message);

    }

    const vm = new Vue({
        data: {
            newMessage:null,
            messages: [],
            nickname: "",
            username: "me",
            socketID: "",
            typing: false,
            message: ""
        },

        created() {
            debugger;
            console.log('its alive!!');

            socket.on('typing', (data) => {
                this.typing = data
            });

            socket.on('stopTyping', () => {
                this.typing = false
            });

        },

        watch:{
            newMessage(value) {
                // debugger;
                value ? socket.emit('typing',this.username):socket.emit('stopTyping')
            }
        },
        

        methods: {
            dispatchMessage() {
                debugger;
                socket.emit('chatmessage', {content: this.newMessage, name: this.nickname || "Anonymous"});

                this.newMessage = null;
            }
        },

        components: {
            newmessage: ChatMessage
        }
         
    }).$mount("#app");
    
    socket.addEventListener('connected', setUserId);
    socket.addEventListener('message', appendMessage);
})();