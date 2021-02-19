export default {
    props: ['msg','socketid','timestamp'],

    template:
    `
    <article class="new-message" :class="{ 'my-message' : matchedID }">
        <h1>This is a message</h1>
        <h4>{{msg.message.name}} says:</h4>
        <p>{{msg.message.content}}</p>
        <p>{{ timestamp }}</p>
    </article>
    `,

    data: function() {
        return {
            matchedID: this.socketid == this.msg.id
        }
    }

}