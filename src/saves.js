import { NativeStorage } from "@ionic-native/native-storage";


export async function createSavesFile() {
  console.log("INITIALIZING SAVE");
  
  let result;
  try {
    result = await NativeStorage.getItem("saves");
    const hasKey = "presets" in result;
    if (!hasKey) {
      console.log('it doesnt have a key -presets-')
      result.presets = [];
    }
    console.log('created preset key!')
    await NativeStorage.setItem("saves", result);
    console.log("Wrote file", result);
  } catch (err) {
    console.log(err);
    console.log("COULDNT READ! OK I WILL CREATE IT");
    const obj = { "presets": [] };
    await NativeStorage.setItem("saves", obj);
  }
}

export async function fileRead() {
  console.log('started reading')
  try {
      const gotData = await NativeStorage.getItem("saves");
      console.log("I HAVE READ A FILE! IT IS: ", gotData.presets);
      return gotData.presets;
      } catch (error) {
    console.log("ERROR ON READING!!");
  }

}

export async function addSave(query) {
  try {
    let output = await NativeStorage.getItem("saves");
    console.log('saved it')
    if (!('presets' in output)) {
      output.presets = []
    }
    output.presets.push({
      query: query,
      date: new Date().getTime(),
    });
    console.log("I HAVE WROTE A FILE! IT IS: ", output.presets);
    await NativeStorage.setItem("saves", output);
    console.log("saved!");
  } catch (error) {
    console.log("ERROR ON SAVING!!");
  }
}

export const deleteSave = async function(index) {
  const contents = await NativeStorage.getItem("saves");
  await contents.presets.pop(index);
  await NativeStorage.setItem("saves", contents);
};
