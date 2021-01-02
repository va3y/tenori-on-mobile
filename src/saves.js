import {
  Plugins,
  FilesystemEncoding,
  FilesystemDirectory,
} from "@capacitor/core";

const { Filesystem } = Plugins;

export async function createSavesFile() {
  try {
    const result = await Filesystem.writeFile({
      path: "./saves.txt",
      //temporary preset (LEAVE EMPTY in prod!)
      data: "{}",
      directory: FilesystemDirectory.Data,
      encoding: FilesystemEncoding.UTF8,
    });
    console.log("Wrote file", result);
  } catch (e) {
    console.error("Unable to write file", e);
  }
}

export async function fileRead() {
  let contents = await Filesystem.readFile({
    path: "./saves.txt",
    directory: FilesystemDirectory.Data,
    encoding: FilesystemEncoding.UTF8,
  });

  console.log(JSON.parse(contents.data));
  return JSON.parse(contents.data);
}

export const addSave = async function(query) {
  let contents = await Filesystem.readFile({
    path: "./saves.txt",
    directory: FilesystemDirectory.Data,
    encoding: FilesystemEncoding.UTF8,
  });
  const output = JSON.parse(contents.data);
  output.presets = output.presets || [];
  await output.presets.push({
    query: query,
    date: new Date().getTime()
  });
  console.log(output);
  console.log(typeof output);
  await Filesystem.writeFile({
    path: "./saves.txt",
    data: JSON.stringify(output),
    directory: FilesystemDirectory.Data,
    encoding: FilesystemEncoding.UTF8,
  });
};
