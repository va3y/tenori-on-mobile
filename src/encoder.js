export default class Encoder {

  static encode(allArray) {
    this.charSet =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_";
    let strArr = "";
    for (let i = 0; i < allArray.length; i++) {
      for (let j = 0; j < allArray[i].length; j++) {
        strArr += allArray[i][j].on ? '1' : '0';
      }
    }
    console.log("initial is", strArr);
    console.log("initial length", strArr.length);

    let chunks = "";
    for (let i = 0; i < strArr.length; i += 6) {
      let slice = strArr.slice(i, i + 6);
      let number = parseInt(slice, 2);
      chunks += this.charSet[number];
    }
    const lastChunkLen = strArr.length % 6;
      let lastSlice = strArr.slice(strArr.length - lastChunkLen, strArr.length);
      let number = parseInt(lastSlice, 2);
      console.log("last number!! It is ", number);
      chunks += this.charSet[number];

    return encodeURI(chunks);
  }

  static decode(URL) {
    const data = decodeURI(URL);
    this.charSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_";
    let binaryArray = [];
    for (let i = 0; i < data.length; i++) {
      binaryArray.push(this.charSet.indexOf(data[i]))
    }
    console.log("char code is ", binaryArray);
    const lastChunk = binaryArray.pop();
    let decoded = "";
    for (let i = 0; i < binaryArray.length; i++) {
      let c = "00000" + binaryArray[i].toString(2);
      decoded += c.slice(-6);
    }
    decoded += "00000" + lastChunk.toString(2).slice(-lastChunk);
    console.log("decoded is ", decoded);
    console.log("decoded length is ", decoded.length);
    return decoded;
  }
}

/*
encode: (bits) ->
    chunks = (bits[i...i+6] for i in [0...bits.length] by 6)
    last_chunk_length = chunks[chunks.length-1].length
    decimals = (parseInt(chunk, 2) for chunk in chunks)
    decimals.push(last_chunk_length)
    encoded = (@charset[i] for i in decimals).join('')

    return encoded

      */


      //0000000000000000000000000000000000000000000000000000000000000000000000000000000000110000000000000001000000000001000000000000001011000000000000110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
      //000000000000000000000000000000000000000000000000000000000000000000000000000000000011000000000000000100000000000100000000000000101100000000000011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
