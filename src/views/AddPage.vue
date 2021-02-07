<template>
    <div class="addpage">
        <p class="header">{{ headerText }}</p>
        <div class="form">
            <div class="class-name">
                <p>Class Name:</p>
                <div>
                    <input class="name-input" v-model="name" placeholder="Class Name">
                </div>
            </div>
            <div class="student-names">
                <p>Student Names:</p>
                <div v-for="(name, index) in students" :key="index" class="manual-input">
                    <input v-bind:placeholder="name" v-model="students[index]" class="actual-student-input"> 
                </div>
                <ImageDrop class="image-drop" @text="processText"/>
            </div>
            <button @click="createClass">{{ buttonText }}</button>
        </div>
    </div>
</template>

<script>
import ImageDrop from "../components/ImageDrop.vue" 

function extractNames(text) {
    let lines = text.split(/\r\n|\n\r|\n|\r/);

    let names = [];
    for(let line of lines) {
        if(line.includes("Participants") || line == "" || line.trim() == "") {
            continue;
        }

        let trimLine = line.trim();

        if(trimLine.charAt(1) == " ") {
            let removeFirstChar = trimLine.substring(1);
            names.push(removeFirstChar.trim())
        }
        else {
            names.push(trimLine);
        }
    }

    return names;
}

export default {
    name: "Add",
    components: {
        ImageDrop
    },
    props: ["isCreating", "id"],
    data () {
        return {
            name: "",
            students: ["", ""],
            headerText: "",
            buttonText: ""
        }
    },
    methods: {
        processText: function (e) {
            let names = extractNames(e)

            if(this.students[this.students.length-1] == "") {
                this.students.pop();
            }

            this.students = this.students.concat(names);
            this.students.push("");
        },
        createClass: function() {
            let previous = [];
            if(localStorage.classes != undefined) {
                previous = JSON.parse(localStorage.classes);
            }

            let students = this.students.filter((el => {
                return el != "";
            }))

            if(this.isCreating) {
                previous.push({'name': this.name, 'students': students});
            }
            else {
                previous[this.id] = {'name': this.name, 'students': students};
            }

            localStorage.classes = JSON.stringify(previous);

            this.$router.go(-1);
        }
    },
    watch: {
        students: function(val) {
            if(val[val.length - 1] !== "") {
                this.students.push("");
            }
        }
    },
    mounted () {
        if(this.isCreating || this.isCreating == undefined) {
            this.headerText = "Add a Class";
            this.buttonText = "Create Class";
        }
        else {
            this.headerText = "Edit Class";
            this.buttonText = "Update Class";

            let classInfo = JSON.parse(localStorage.classes)[this.id]
            this.name = classInfo.name
            this.students = classInfo.students
        }
    }
}
</script>

<style scoped>
    html, body {
        margin: 0px;
        height: 100%;
    }

    .addpage {
        background-color: var(--bg-color);
        position: fixed;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;

        display: grid;
        grid-template-rows: 10% auto 5%;
        grid-template-columns: 3% auto 3%;
        overflow: auto;
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

    .form {
        grid-area: 2 / 2 / 3 / 3;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 70px;
        
    }

    .class-name {
        display: flex;
        flex-direction: column;
    }

    .class-name p {
        font-size: 1.5rem;
        margin-bottom: 10px;
    }

    .class-name div {
        align-self: flex-start;
    }

    .name-input {
        height: 20px;
    }

    .student-names {
        font-size: 1.5rem;
        margin-bottom: 10px;

        display: flex;
        flex-direction: column;

    }

    .student-names p {
        margin-bottom: 10px;
    }

    .manual-input {
        align-self: flex-start;
    }

    .image-drop {
        margin-top: 40px;
    }

    button {
        height: 50px;
    }

    input {
        width: 300px;
    }
</style>