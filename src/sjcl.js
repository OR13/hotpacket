
var sjcl = require("sjcl");

var encryptObject = (password, object) => {
    if (password === null || password === undefined || password === "") {
        throw "password cannot be null, undefined or empty string.";
    }
    var plain_text = JSON.stringify(object);
    var cipher_text = sjcl.encrypt(password, plain_text);
    var encrypted_object = JSON.parse(cipher_text);
    return encrypted_object;
}

var decryptObject = (password, cipher_text) => {
    if (password === null || password === undefined || password === "") {
        throw "password cannot be null, undefined or empty string.";
    }
    var plain_text = sjcl.decrypt(password, JSON.stringify(cipher_text));
    return JSON.parse(plain_text);
}

exports = module.exports = {
    encryptObject: encryptObject,
    decryptObject: decryptObject
}