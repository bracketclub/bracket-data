var BracketData = require('../index'),
    assert = require('assert');

describe('Bracket Data', function () {

    it('Should create a bracket with all the properties', function () {
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

});