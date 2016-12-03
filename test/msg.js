var assert = require('assert');

var HotPacket = require('../index');

describe('HotPacket.msg', function() {

    describe('#env(_object)', function() {

        it('should return the object wrapped in a HotPacketEnvelope', function() {

            var env = HotPacket.msg.env({});
            assert.equal(env.type, "HotPacketEnvelope")

        });

    });

    describe('#obj(_env)', function() {

        it('should return the object wrapped inside a HotPacketEnvelope', function() {

            var obj = {
                foo: "bar"
            };

            var env = HotPacket.msg.env(obj);

            var _obj = HotPacket.msg.obj(env);

            assert.equal(_obj, obj)

        });

    });


});