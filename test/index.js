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
});

