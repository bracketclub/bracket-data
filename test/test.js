var BracketData = require('../index');
var assert = require('assert');
var year = '2013';
var sport = 'ncaa-mens-basketball';

describe('Bracket Data', function () {
    it('should create a bracket with only the default property: bracket', function () {
        var b = new BracketData({
            year: year,
            sport: sport
        });

        assert.strictEqual(true, b.hasOwnProperty('bracket'));
    });

    it('should create a bracket with the specifed properties', function () {
        var b = new BracketData({
            year: year,
            sport: sport,
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
            year: year,
            sport: sport,
            props: 'all'
        });

        assert.strictEqual(false, b.hasOwnProperty('props'));
        assert.strictEqual(false, b.hasOwnProperty('year'));
        assert.strictEqual(false, b.hasOwnProperty('sport'));
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
