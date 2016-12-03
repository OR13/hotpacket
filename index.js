
var sjcl = require("./src/sjcl");

var msg = require("./src/msg");


var HotPacket = function() {
    return {
        sjcl: sjcl,
        msg: msg,
        init: (config) => {
            this.config = config;
        },
        new: (_obj) => {
            return msg.env(_obj);
        },
        obj: (_env) => {
            return msg.obj(_env);
        },
        decrypt: (_env) => {
            // copy object for immutability
            _env = JSON.parse(JSON.stringify(_env));
            // if this _env is an HotPacketEnvelope
            // better type checking should happen here...
            if (_env !== undefined && _env.type === 'HotPacketEnvelope') {
                // if _env is an encrypted HotPacketEnvelope decrypt and return the object
                if (_env.encrypted) {
                    _env.body = sjcl.decryptObject(config.password, msg.obj(_env));
                    _env.encrypted = false;
                } else {
                    throw 'HotPacket.open called on an un-encrypted HotPacketEnvelope object (_env already plaintext!)';
                }
            } else {
                throw 'HotPacket.open called on none HotPacketEnvelope object';
            }
            return _env;
        },
        encrypt: (_env) => {
            // copy object for immutability
            _env = JSON.parse(JSON.stringify(_env));
            // if this _env is an HotPacketEnvelope
            // better type checking should happen here...
            // console.log(_env)
            if (_env !== undefined && _env.type === 'HotPacketEnvelope') {
                // if _env is an encrypted HotPacketEnvelope decrypt and return the object
                if (_env.encrypted) {
                    throw 'HotPacket.close called on an encrypted HotPacketEnvelope object (_env already encrypted!)';
                } else {
                    _env.body = sjcl.encryptObject(config.password, _env.body)
                    _env.encrypted = true;
                }
            } else {
                throw 'HotPacket.close called on none HotPacketEnvelope object';
            }
            return _env;
        },
        isEqual: (_obj_a, _obj_b) => {
            return JSON.stringify(_obj_a) === JSON.stringify(_obj_b);
        },
        encodeBase64: (_env) => {
            return new Buffer(JSON.stringify(_env)).toString('base64')
        },
        decodeBase64: (_string) => {
            return JSON.parse(Buffer(_string, 'base64').toString('ascii'));
        }
    }
} ()

if (typeof window !== 'undefined') {
    window.HotPacket = HotPacket
}
exports = module.exports = HotPacket;
