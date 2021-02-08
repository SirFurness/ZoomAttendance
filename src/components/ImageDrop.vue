<template>
    <div class="component">
        <label v-if="isInProgress" for="progress-bar">{{status}}</label>
        <progress v-if="isInProgress" id="progress-bar" v-bind:value="progress" max="1"></progress>
        <div class="drop" v-bind:class="{active: isActive}"
            @dragover.prevent="dragOver"
            @dragleave.prevent="dragLeave"
            @drop.prevent="drop($event)">

            <h2>Drag & Drop / Copy & Paste<br><br>an image of participants</h2>
        </div>
        <img v-if="isTesting" v-bind:src="imageSource">
    </div>
</template>

<script>
import Tesseract from 'tesseract.js'
import {Image} from 'image-js'

export default {
    name: "ImageDrop",
    data () {
        return {
            isActive: false,
            imageSource: "",
            isTesting: false,
            isInProgress: false,
            progress: 0,
            status: ""
        }
    },
    methods: {
        dragOver () {
            this.isActive = true;
        },
        dragLeave () {
            this.isActive = false;

        },
        drop(e) {
            this.isActive = false;

            let file = e.dataTransfer.files[0];

            let image_source;

            let reader = new FileReader();
            reader.onload = (event) => {
                image_source = event.target.result;

            }
            reader.readAsDataURL(file)

            reader.onloadend = () => {
                this.processImage(image_source);
            }
        },
        processImage(image_source) {
            let img = new Image();
            img.src = image_source;

            Image.load(image_source).then((image) => {
                let gray = image.grey();
                let masked = gray.mask({threshold: 0.6, invert: true})

                this.imageSource = masked.toDataURL();

                this.isInProgress = true;

                Tesseract.recognize(masked.toBuffer(), 'eng',
                    { logger: m => {
                        console.log(m)
                        this.status = m.status.charAt(0).toUpperCase() + m.status.slice(1);
                        this.progress = m.progress
                    }}).then(({data: {text}}) => {
                    this.isInProgress = false;
                    this.$emit("text", text);
                })
            })
        }
    },
    mounted () {
        document.onpaste = (event) => {
            let items = event.clipboardData.items;

            console.log(JSON.stringify(items));

                let imageFile = items[0].getAsFile()

                let image_source;

                let reader = new FileReader()
                reader.onload = (event) => {
                    image_source = event.target.result;
                }
                reader.readAsDataURL(imageFile);

                reader.onloadend = () => {
                    this.processImage(image_source);
                }
        }
    }
}
</script>

<style scoped>
.active {
    background-color: var(--snd-bg-color);
}

.drop {
    border-style: dashed;
    border-width: 0.2rem;
}

label {
    font-size: 1.2rem;
    margin-right: 5px;
}
</style>