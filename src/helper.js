class SoundMaker { 
    constructor() {
        this.message = 'hello world';
        this.soundsArray = this._loadSounds();
    }

    _loadSounds() {
        const soundsArray = []
        for (let index = 0; index < 16; index++) {
            const sound = new Audio(require(`./assets/SnapKit_${index+1}.mp3`));
            sound.type = "audio/mp3";   
            soundsArray.push(sound)
            
        }
        
        
        return soundsArray;
    }

    playSound(which) {

        this.soundsArray[which].play();
    }



}








export default SoundMaker;
