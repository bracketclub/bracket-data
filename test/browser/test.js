var BracketData = require('../../built/ncaa-mens-basketball-2013.js');
var assert = require('assert');

describe('Bracket Data', function () {
    it('should create a bracket with only the default property: bracket', function () {
        var b = new BracketData({
            year: '2013'
        });

        assert.strictEqual(true, b.hasOwnProperty('bracket'));
    });

    it('should create a bracket with the specifed properties', function () {
        var b = new BracketData({
            year: '2013',
            props: 'bracket constants regex order scoring locks'.split(' ')
        });

        assert.strictEqual(true, b.hasOwnProperty('bracket'));
        assert.strictEqual(true, b.hasOwnProperty('constants'));
        assert.strictEqual(true, b.hasOwnProperty('regex'));
        assert.strictEqual(true, b.hasOwnProperty('order'));
        assert.strictEqual(true, b.hasOwnProperty('scoring'));
        assert.strictEqual(true, b.hasOwnProperty('locks'));
    });

    it('should not add certain properties to instance', function () {
        var b = new BracketData({
            year: '2013',
            props: 'bracket constants regex order scoring locks'.split(' ')
        });

        assert.strictEqual(false, b.hasOwnProperty('props'));
        assert.strictEqual(false, b.hasOwnProperty('year'));
        assert.strictEqual(false, b.hasOwnProperty('sport'));
    });

    it('should set default properties on instance', function () {
        var b = new BracketData({
            year: '2013',
            defaults: {
                flatBracket: 1
            }
        });

        assert.strictEqual(true, b.hasOwnProperty('flatBracket'));
        assert.strictEqual(1, b.flatBracket);
    });

    it('should throw an error if a default property will overwrite data', function () {
        assert.throws(function () {
            new BracketData({
                year: '2013',
                defaults: {
                    bracket: 1
                }
            });
        }, Error);
    });

    it('should throw an error if year+sport is non-existant', function () {
        assert.throws(function () {
            new BracketData({
                year: '9',
                sport: 'world-crazyball-championship'
            });
        }, Error);
    });
});
