# HotPacket

## WARNING THIS IS AN EXPERIMENT. DO NOT USE.

- Built with [SJCL](https://github.com/bitwiseshiftleft/sjcl)

HotPacket provides tools for javascript object encryption and encoding.

### Install
```
var HotPacket = require('HotPacket');
```

or 

```
<!-- dev -->
<script src="https://cdn.rawgit.com/OR13/hotpacket/master/dist/hotpacket.js"></script>

<!-- prod (but really did you read the warning?) -->
<script src="https://rawgit.com/OR13/hotpacket/master/dist/hotpacket.js"></script
```

### Usage

```
HotPacket.init({ password: 'shared_secret' }); 

var newEnvelope = HotPacket.new({ 
    type: "update_name", 
    data: { id: 0, name: "billy" } 
});

console.log('newEnvelope: ', newEnvelope)

var encryptedEnvelope = HotPacket.encrypt(newEnvelope);

console.log('encryptedEnvelope: ', encryptedEnvelope)

var decryptedEnvelope = HotPacket.decrypt(encryptedEnvelope);

console.log('decryptedEnvelope: ', decryptedEnvelope)

console.log("HotPacket.isEqual(newEnvelope, decryptedEnvelope): ", HotPacket.isEqual(newEnvelope, decryptedEnvelope) );

console.log("are objects equal: ", newEnvelope === decryptedEnvelope);

console.log("are object strings equal: ",  JSON.stringify(newEnvelope) === JSON.stringify(decryptedEnvelope));

var myObject = {
    foo: "bar"
};

var env = HotPacket.new(myObject);

var b64Env = HotPacket.encodeBase64(env);

var expected = 'eyJ0eXBlIjoiSG90UGFja2V0RW52ZWxvcGUiLCJlbmNyeXB0ZWQiOmZhbHNlLCJib2R5Ijp7ImZvbyI6ImJhciJ9fQ==';

console.log('expect true: ', b64Env ===  expected);

var encoded = 'eyJ0eXBlIjoiSG90UGFja2V0RW52ZWxvcGUiLCJlbmNyeXB0ZWQiOmZhbHNlLCJib2R5Ijp7ImZvbyI6ImJhciJ9fQ==';

var expected = {
    foo: "bar"
};

var decoded = HotPacket.decodeBase64(encoded);

console.log('expect true: ', JSON.stringify(expected) === JSON.stringify(decoded.body));

```