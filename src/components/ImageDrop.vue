<template>
    <div class="component">
        <div class="drop" v-bind:class="{active: isActive}"
            @dragover.prevent="dragOver"
            @dragleave.prevent="dragLeave"
            @drop.prevent="drop($event)">

            <h2>Drag & Drop an image of participants</h2>
        </div>
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
                let img = new Image();
                img.src = image_source;

                Image.load(image_source).then((image) => {
                    let gray = image.grey();
                    let masked = gray.mask({threshold: 0.9})

                    Tesseract.recognize(masked.toBuffer()).then(({data: {text}}) => {
                        this.$emit("text", text);
                    })
                })
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

</style>