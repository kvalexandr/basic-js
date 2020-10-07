const CustomError = require("../extensions/custom-error");

class VigenereCipheringMachine {
  constructor(type = true) {
    this.type = type;
  }

  model(message, key, fn) {
    if (!message || !key) throw new Error();

    message = this.type ? message : message.split('').reverse().join('');
    message = message.toUpperCase();
    key = key.toUpperCase();

    let result = '';
    let keyCounter = 0;

    for (let i = 0; i < message.length; i += 1) {
      if (/^[A-Z]$/.test(message[i])) {
        const messageCharCode = message.charCodeAt(i);
        const keyCharCode = key.charCodeAt(keyCounter);
        const resultCode = fn(messageCharCode, keyCharCode);

        keyCounter = (keyCounter + 1) % key.length;

        result += String.fromCharCode(resultCode);
      } else {
        result += message[i];
      }
    }

    return result;
  }

  encrypt(message, key) {
    return this.model(message, key, (m, k) => (m + k) % 26 + 65);
  }

  decrypt(message, key) {
    return this.model(message, key, (m, k) => (m + 26 - k) % 26 + 65);
  }
}

module.exports = VigenereCipheringMachine;
