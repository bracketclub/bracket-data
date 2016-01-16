var bracketData = require('../lib/index');
var _ = require('lodash');
var assert = require('assert');
var years = ['2012', '2013', '2014', '2015'];
var sport = 'ncaam';

describe('Bracket Data', function () {
    it('should be able to create multiple data objects', function () {
        var brackets = years.map(function (year) {
            return bracketData({sport: sport, year: year});
        });

        brackets.forEach(function (b) {
            assert.ok(b.scoring.standard);
            assert.ok(b.scoring.gooley);
        });

        var sRegionTeams = _.map(brackets, 'bracket').map(function (b) {
            return b.regions.S.teams;
        });

        assert.equal(_.map(sRegionTeams, '0').join(), 'Kentucky,Kansas,Florida,Duke');

        brackets.forEach(function (b) {
            assert.deepEqual(Object.keys(b), ['bracket', 'constants', 'regex', 'order', 'scoring', 'locks']);
        });
    });
});
