<template>
    <div class="classes">
        <p class="header">Classes</p>
        <div class="class-list">
            <div class="class-name" v-for="(classInfo, index) in classes" :key="index" @click="enterClass($event, index)">
                {{ classInfo.name }}
            </div>
            <button v-on:click="addClass">+ Add a class</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Classes',
    data () {
        return {
            classes: []       
        }
    },
    methods: {
        addClass () {
            this.$router.push({name: 'Add', params: {'isCreating': true}})
        },
        enterClass (e, index) {
            this.$router.push({path: `/class/${index}`})
        }
    },
    mounted () {
        if(localStorage.classes != undefined) {
            this.classes = JSON.parse(localStorage.classes)
        }
    }
}
</script>

<style scoped>
    html, body {
        margin: 0px;
        height: 100%;
    }

    .classes {
        background-color: var(--bg-color);
        position: fixed;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;

        display: grid;
        grid-template-rows: 10% auto 5%;
        grid-template-columns: 3% auto 3%;
    }

    p {
        color: var(--text-color);
    }

    .header {
        grid-area: 1 / 2 / 2 / 3; 
        text-align: left;
        align-self: end;

        font-size: 2rem;
        font-weight: 700;
    }

    .class-list {
        grid-area: 2 / 2 / 3 / 3;
        background-color: var(--snd-bg-color);

        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        gap: 10px;

        overflow: auto;
    }

    .class-name {
        border-width: 2px;
        border-style: solid;

        padding: 5px;

        cursor: pointer;
    }

    .class-name:hover {
        /*background-color: var(--bg-color);*/
        background-color: #afafaf;
    }

    button {
        cursor: pointer;
    }

</style>