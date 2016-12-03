var assert = require('assert');

var HotPacket = require('../index');

describe('HotPacket.sjcl', function () {

    describe('#encryptObject(password, object)', function () {

        it('should throw error when password is anull, undefined or empty string.', function () {
            var encrypted_object;

            try {
                encrypted_object = HotPacket.sjcl.encryptObject(null, {})
            }
            catch (e) {
                assert.equal(e, "password cannot be null, undefined or empty string.")
            }

            try {
                encrypted_object = HotPacket.sjcl.encryptObject(undefined, {})
            }
            catch (e) {
                assert.equal(e, "password cannot be null, undefined or empty string.")
            }

            try {
                encrypted_object = HotPacket.sjcl.encryptObject("", {})
            }
            catch (e) {
                assert.equal(e, "password cannot be null, undefined or empty string.")
            }

        });

    });

    describe('#decryptObject(password, encrypted_object)', function () {

        it('should throw error when password is anull, undefined or empty string.', function () {
            var object;

            try {
                object = HotPacket.sjcl.decryptObject(null, {})
            }
            catch (e) {
                assert.equal(e, "password cannot be null, undefined or empty string.")
            }

            try {
                object = HotPacket.sjcl.decryptObject(undefined, {})
            }
            catch (e) {
                assert.equal(e, "password cannot be null, undefined or empty string.")
            }

            try {
                object = HotPacket.sjcl.decryptObject("", {})
            }
            catch (e) {
                assert.equal(e, "password cannot be null, undefined or empty string.")
            }

        });

    });


});