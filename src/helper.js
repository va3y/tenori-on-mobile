export default class SoundMaker { 
    constructor() {
        this.message = 'hello world';
        this.soundsArray = this._loadSounds();
    }

    _loadSounds() {
        const soundsArray = []
        for (let index = 0; index < 16; index++) {
            const sound = new Audio(require(`./assets/s${index+1}.mp3`));
            sound.type = "audio/mp3"; 
            soundsArray.push(sound)
            
        }

        return soundsArray;
    }



    playSound(which) {
        const sound = this.loadSound(which);
        sound.play();
        //const audio = this.soundsArray[which];
        //audio.play();
    }

    playDrum(which) {
        const drum = this.loadDrum(which);
        drum.play();
    }

    loadSound(num) {
        const sound = new Audio(require(`./assets/s${num + 1}.mp3`));
        sound.type = "audio/mp3"; 
        return sound
    }

    loadDrum(num) {
        const drum = new Audio(require(`./assets/d${num + 1}.mp3`));
        drum.type = "audio/mp3"; 
        return drum
    }



}


