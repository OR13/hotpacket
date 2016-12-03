
var sjcl = require("./src/sjcl");

var msg = require("./src/msg");

exports = module.exports = function () {
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
        open: (_env) => {
            // if this _env is an HotPacketEnvelope
            // better type checking should happen here...
            if (_env.type === 'HotPacketEnvelope') {
                // if _env is an encrypted HotPacketEnvelope decrypt and return the object
                if (_env.encrypted) {
                    _env.body = sjcl.decryptObject(config.password, msg.obj(_env));
                    _env.encrypted.false = true;
                } else {
                    throw 'HotPacket.open called on an un-encrypted HotPacketEnvelope object (_env already plaintext!)';
                }
            } else {
                throw 'HotPacket.open called on none HotPacketEnvelope object';
            }
            return _env;
        },
        close: (_env) => {
            // if this _env is an HotPacketEnvelope
            // better type checking should happen here...
            // console.log(_env)
            if (_env.type === 'HotPacketEnvelope') {
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
        }
    }
} ()
