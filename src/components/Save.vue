<template>

    <div> 
    <button @click="savePreset">Save this pattern</button>
    <br>
    <a :href="this.getCurrURL() + '?preset=' + this.output"
    v-if="this.output"
    >Here's the link to share 🎉</a>

    
    </div>
</template>

<script>
import Encoder from "../encoder.js"
export default {
    name: "Save",
    props: ['buttons', 'drums'],
    data() {
        return {
            inputCode: '',
            output: '',
            decoded: ''
        }
    },
    methods: {
        savePreset() {
            const allArray = this.buttons //Add drums later!!
            const saveURL = Encoder.encode(allArray);
            
            this.output = saveURL
        },
        decodePreset() {
            console.log(Encoder.decode(this.inpuCode))
            this.decoded = Encoder.decode(this.inputCode);
        },
        getCurrURL(){
            return window.location.href
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
    
    border-radius: 20px;
    background: rgb(179, 179, 179);
    overflow: auto;
    box-shadow: 0 0 3pt 2pt rgb(139, 139, 139);
}
</style>