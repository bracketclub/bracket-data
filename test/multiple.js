var BracketData = require('../index');
var _ = require('lodash');
var assert = require('assert');
var years = ['2012', '2013', '2014', '2015'];
var sport = 'ncaa-mens-basketball';

describe('Bracket Data', function () {
    it('should be able to create multiple data objects', function () {
        var brackets = years.map(function (year) {
            return new BracketData({sport: sport, year: year});
        });

        var sRegionTeams = _.chain(brackets).pluck('bracket').map(function (b) {
            return b.regions.S.teams;
        }).value();

        assert.equal(_.pluck(sRegionTeams, '0').join(), 'Kentucky,Kansas,Florida,Duke');
    });
});
