var BracketData = require('../index'),
    assert = require('assert');

describe('Bracket Data', function () {

    it('should create a bracket with all the properties', function () {
        var b = new BracketData({
            year: process.env.BRACKET_YEAR
        });
        
        assert.equal(true, b.hasOwnProperty('bracket'));
        assert.equal(true, b.hasOwnProperty('constants'));
        assert.equal(true, b.hasOwnProperty('locks'));
        assert.equal(true, b.hasOwnProperty('order'));
        assert.equal(true, b.hasOwnProperty('regex'));
        assert.equal(true, b.hasOwnProperty('scoring'));
    });

    it('should be reset', function () {
        var b = new BracketData({
            year: process.env.BRACKET_YEAR,
            flatBracket: 1
        });
        
        assert.equal(true, b.hasOwnProperty('bracket'));
        assert.equal(true, b.hasOwnProperty('constants'));
        assert.equal(true, b.hasOwnProperty('locks'));
        assert.equal(true, b.hasOwnProperty('order'));
        assert.equal(true, b.hasOwnProperty('regex'));
        assert.equal(true, b.hasOwnProperty('scoring'));
        assert.equal(1, b.flatBracket);

        b.reset({
            flatBracket: 0
        });
        assert.equal(0, b.flatBracket);
    });

});