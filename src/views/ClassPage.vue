<template>
    <div class="root">
        <p class="header">{{classInfo.name}}</p>
        <div class="content">
            <p>Absent</p>
            <div class="absent">
                <div class="student-name" v-for="(student, index) in absent" :key="index">
                    <div v-if="index != absent.length-1">{{student}},</div>
                    <div v-if="index == absent.length-1">{{student}}</div>
                </div>
                <div v-if="absent.length == 0">Everyone's here!</div>
            </div>
            <ImageDrop class="image-drop" @text="processText"/> 
            <button class="edit-btn" @click="editClassInfo">Edit Class Info</button>
        </div>
    </div>
</template>

<script>
import ImageDrop from "../components/ImageDrop.vue" 

export default {
    name: "Class",
    props: ['id'],
    components: {
        ImageDrop
    },
    data () {
        return {
            absent: [],
            classInfo: {}
        }
    },
    methods: {
        processText: function(e) {
            for(let i = this.absent.length-1; i >= 0; i--) {
                let student = this.absent[i];

                if(e.includes(student)) {
                    this.absent.splice(this.absent.indexOf(student), 1)
                }
            }
        },
        editClassInfo: function() {
            this.$router.push({name: "Add", params: {'isCreating': false, 'id': this.id}})
        }
    },
    mounted () {
        if(localStorage.classes != undefined) {
            this.classInfo = JSON.parse(localStorage.classes)[this.id]
            this.absent = this.classInfo.students;
        }
    }
}
</script>

<style scoped>
    html, body {
        margin: 0px;
        height: 100%;
    }

    .root {
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
        text-align: left;
    }

    .header {
        grid-area: 1 / 2 / 2 / 3; 
        align-self: end;

        font-size: 2rem;
        font-weight: 700;
    }

    .content {
        grid-area: 2 / 2 / 3 / 3;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 0px;
        
    }

    .content p {
        font-size: 1.5rem;
        margin-bottom: 15px;
    }

    .absent {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        gap: 10px;

        margin-bottom: 100px;
    }

    .student-name {
        display: flex;
        flex-direction: row;
    }

    .edit-btn {
        height: 35px;
    }

    .image-drop {
        margin-bottom: 40px;
    }
</style>