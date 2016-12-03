var assert = require('assert');

var HotPacket = require('../index');

describe('HotPacket', function() {

    before(function() {
        HotPacket.init({
            password: 'foo'
        })
    });


    describe('#new(_obj)', function() {
        it('should return the a decrypted HotPacketEnvelope with _obj body as its body', function() {
            var myObject = {
                foo: "bar"
            };
            var env = HotPacket.new(myObject);
            assert.equal(env.encrypted, false)
            assert.equal(env.body, myObject)
        });
    });

    describe('#obj(_env)', function() {
        it('should return the object body in HotPacketEnvelope', function() {
            var myObject = {
                foo: "bar"
            };
            var env = HotPacket.new(myObject);
            var obj = HotPacket.obj(env);
            assert.equal(obj, myObject)
        });
    });

    describe('#decrypt(_env)', function() {
        it('should return the HotPacketEnvelope with its body decrypted', function() {
            var myObject = {
                foo: "bar"
            };
            var env = HotPacket.new(myObject);
            assert.equal(env.encrypted, false)
            var encrypted_env = HotPacket.encrypt(env);
            assert.equal(encrypted_env.encrypted, true);
            var decrypted_env = HotPacket.decrypt(encrypted_env);
            assert.equal(decrypted_env.encrypted, false);
        });
    });

    describe('#encrypt(_env)', function() {
        it('should return the HotPacketEnvelope with its body encrypted', function() {
            var myObject = {
                foo: "bar"
            };
            var env = HotPacket.new(myObject);
            assert.equal(env.encrypted, false)
            var encrypted_env = HotPacket.encrypt(env);
            assert.equal(encrypted_env.encrypted, true);
        });
    });

    describe('#encodeBase64(_env)', function() {
        it('should return base64 string of stringified _env', function() {

            var myObject = {
                foo: "bar"
            };

            var env = HotPacket.new(myObject);

            var b64Env = HotPacket.encodeBase64(env);

            var expected = 'eyJ0eXBlIjoiSG90UGFja2V0RW52ZWxvcGUiLCJlbmNyeXB0ZWQiOmZhbHNlLCJib2R5Ijp7ImZvbyI6ImJhciJ9fQ==';

            assert.equal(b64Env, expected);
        });

    });

    describe('#decodeBase64(_string)', function() {
        it('should return envelope object from base64 string', function() {

            var encoded = 'eyJ0eXBlIjoiSG90UGFja2V0RW52ZWxvcGUiLCJlbmNyeXB0ZWQiOmZhbHNlLCJib2R5Ijp7ImZvbyI6ImJhciJ9fQ==';

            var expected = {
                foo: "bar"
            };

            var decoded = HotPacket.decodeBase64(encoded);
            assert.equal(JSON.stringify(expected), JSON.stringify(decoded.body));

        });

    });

    describe('#isEqual(a, b)', function() {
        it('should return true if object strings are equal', function() {
            var results = HotPacket.isEqual({}, {});
            assert.equal(results, true);
        });

        it('should return false if object strings are not equal', function() {
            var results = HotPacket.isEqual({}, { b: 'c' });
            assert.equal(results, false);
        });
    });


});

