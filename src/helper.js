import { NativeAudio } from "@ionic-native/native-audio";
// import { File } from "@ionic-native/file";
// let filePath = File.applicationDirectory + "public/assets/";
let filePath = "assets/";
for (let index = 0; index < 16; index++) {
  NativeAudio.preloadSimple(
    "s" + index.toString(),
    filePath + `s${index + 1}.mp3`
  );
}
for (let index = 0; index < 4; index++) {
  NativeAudio.preloadSimple(
    "d" + index.toString(),
    filePath + `d${index + 1}.mp3`
  );
}
export default class SoundMaker {
  constructor() {
    this.message = "hello world";
  }

  playSound(which) {
    NativeAudio.play("s" + which.toString());
  }

  playDrum(which) {
    NativeAudio.play("d" + which.toString());
  }
}
