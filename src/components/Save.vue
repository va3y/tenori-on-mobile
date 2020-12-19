<template>

    <div> 
    <button @click="savePreset">save!</button>
    <br>
    <a :href="this.getCurrURL() + this.output">Link!</a>

    
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
</style>