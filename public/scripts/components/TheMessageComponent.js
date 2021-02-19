export default {
    props: ['msg','socketid','timestamp'],

    template:
    `
    <article class="new-message" :class="{ 'my-message' : matchedID }">
        <h4>{{msg.message.name}} says:</h4>
        <p>{{msg.message.content}}</p>
        <span>{{ timestamp }}</span>
    </article>
    `,

    data: function() {
        return {
            matchedID: this.socketid == this.msg.id
        }
    }

}