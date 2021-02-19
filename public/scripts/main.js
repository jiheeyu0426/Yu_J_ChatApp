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
            timestamp: "",
            messages: [],
            nickname: "",
            username: "me",
            socketID: "",
            typing: false,
            message: ""
        },

        created() {
            // debugger;
            console.log('its alive!!');

            socket.on('typing', (data) => {
                this.typing = data
            });

            socket.on('stopTyping', () => {
                this.typing = false
            });

            setInterval(this.getNow, 1000);
        },

        watch:{
            newMessage(value) {
                // debugger;
                value ? socket.emit('typing',this.username):socket.emit('stopTyping')
            }
        },
        

        methods: {
            dispatchMessage() {
                // debugger;
                socket.emit('chatmessage', {content: this.newMessage, name: this.username || "Anonymous"});

                this.newMessage = null;
            },

            getNow: function() {
                const currentTime= new Date();
                const date = currentTime.getFullYear()+'-'+(currentTime.getMonth()+1)+'-'+currentTime.getDate();
                const time = currentTime.getHours() + ":" + currentTime.getMinutes();
                const dateTime = time;
                this.timestamp = dateTime;
            },

        },
        

        components: {
            newmessage: ChatMessage
        }
         
    }).$mount("#app");
    
    socket.addEventListener('connected', setUserId);
    socket.addEventListener('message', appendMessage);
})();