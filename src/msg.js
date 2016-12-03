
var env = function (_object) {
    var envelope = {
        type: "HotPacketEnvelope",
        encrypted: false,
        body: _object
    }
    return envelope;
}

var obj = function (_env) {
    return _env.body;
}

exports = module.exports = {
    env: env,
    obj: obj
}