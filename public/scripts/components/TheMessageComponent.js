export default {
    props: ['msg','socketid'],

    template:
    `
    <article class="new-message" :class="{ 'my-message' : matchedID }">
        <span v-if="typing">User is typing</span>
        <h1>This is a message</h1>
        <h4>{{msg.message.name}} says:</h4>
        <p>{{msg.message.content}}</p>
    </article>
    `,

    data: function() {
        return {
            matchedID: this.socketid == this.msg.id
        }
    }

    // created() {

    //     socket.on('typing', () => {
    //         this.typing == true
    //     })

    //     socket.on('stopTyping', () => {
    //         this.typing == false
    //     })

    // }

}