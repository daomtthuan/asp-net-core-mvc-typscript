export function sayHello(name: string) {
  console.log(`Hello ${name}!`);
}

export function arrayBufferToBase64(buffer: number[]) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export function parseJsonFromBase64<T>(json: string): T {
  return JSON.parse(json);
}
