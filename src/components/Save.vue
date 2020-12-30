<template>

    <div class="save-container"> 
    <button @click="savePreset">Save this pattern</button>
    <br>
    <a v-if="drumsOutput" :href="getCurrURL() + '?preset=' + this.buttonsOutput +
    '&drums=' + this.drumsOutput +
    '&tempo=' + this.tempo"
    class="savelink"
    >Here's a link to share 🎉</a>

    
    </div>
</template>

<script>
import Encoder from "../encoder.js"
export default {
    name: "Save",
    props: ['buttons', 'drums', 'tempo'],
    data() {
        return {
            inputCode: '',
            buttonsOutput: '',
            drumsOutput: '',
        }
    },
    methods: {
        savePreset() {
            
            this.buttonsOutput = Encoder.encode(this.buttons);
            this.drumsOutput = Encoder.encode(this.drums);

        },
        decodePreset() {
            console.log(Encoder.decode(this.inpuCode))
            this.decoded = Encoder.decode(this.inputCode);
        },
        getCurrURL(){
            return window.location.href.split('?')[0];
        }
    },

}
</script>

<style scoped>
*{
    user-select: text;
}

button {
    border-style: none;
    padding: 4px;
    font-family: monospace;
    border-radius: 20px;
    overflow: auto;
    font-size: 14px;
    color: rgb(44,62,80)

    
}

.savelink{
    font-family: monospace;
    font-size: 14px;
    animation: link-appear 0.5s
}

@keyframes link-appear {
    from {
        opacity: 0
    }
    to {
        opacity: 1
    }
    
}

.save-container {
text-align: right;
}
</style>