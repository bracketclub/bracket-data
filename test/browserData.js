var bracketData = require('../browser/index');
var _ = require('lodash');
var assert = require('assert');
var years = ['2012', '2013', '2014', '2015'];
var sport = 'ncaam';

describe('Bracket Data', function () {
    it('should be able to create multiple data objects', function () {
        var brackets = years.map(function (year) {
            return [
                // require both ways
                bracketData({sport: sport, year: year}),
                require('../browser/' + sport + '-' + year + '.js')
            ];
        });

        var sRegionTeams = _.map(brackets, function (b) {
            return [
                b[0].bracket.regions.S.teams,
                b[1].bracket.regions.S.teams
            ];
        });

        sRegionTeams.forEach(function (s) {
            assert.deepEqual(s[0], s[1]);
        });

        assert.equal(_.map(sRegionTeams, '0.0').join(), 'Kentucky,Kansas,Florida,Duke');
        assert.equal(_.map(sRegionTeams, '1.0').join(), 'Kentucky,Kansas,Florida,Duke');

        brackets.forEach(function (b) {
            assert.deepEqual(Object.keys(b[0]), ['bracket', 'constants', 'regex', 'order', 'scoring', 'locks']);
            assert.deepEqual(Object.keys(b[1]), ['bracket', 'constants', 'regex', 'order', 'scoring', 'locks']);
        });
    });
});
