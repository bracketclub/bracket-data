var _ = require('lodash');
var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');

var argv = require('minimist')(process.argv.slice(2), {
    default: {
        sport: 'ncaa-mens-basketball'
    },
    alias: {
        y: 'year',
        s: 'sport'
    }
});
var sport = argv.sport;
var year = argv.year;

var order = require('../data/' + sport + '/defaults').order;
var url = 'http://espn.go.com/ncb/bracketology';
var regionMap = {
    'midwest': 'MW'
};

var specialNames = {
    'a&m': 'A&M',
    'a&t': 'A&T',
    'smu': 'SMU',
    'nc': 'NC',
    'lsu': 'LSU',
    'ny': 'NY',
    'uc': 'UC',
    'byu': 'BYU',
    'uab': 'UAB',
    'fl': 'FL',
    'ul': 'UL',
    'ucla': 'UCLA',
    'st': 'State',
    'utep': 'UTEP',
    '-little': '-Little'
};
var replaceSpecialNames = function (name) {
    _.each(specialNames, function (newName, oldName) {
        var regexp = new RegExp('\\b' + oldName + '\\b', 'i');
        var match = name.match(regexp);
        if (match) {
            name = name.replace(match[0], newName);
        }
    });
    return name;
};


request(url, function(err, resp, body) {
    var $ = cheerio.load(body);
    var teams = $('.team').map(function () { return $(this).text(); }).get();
    var regions = $('.region h3').map(function () { return $(this).text(); }).get();

    teams = _.chain(teams).map(function (team) {
        return team
        .trim()
        .replace(/\d/g, '')
        .toLowerCase().split(' ').map(replaceSpecialNames).map(function (word) {
            return _.capitalize(word);
        }).join(' ');
    }).chunk(16).map(function (region) {
        return _.sortBy(region, function (value, index) {
            return order[index];
        });
    }).map(function (teams, index) {
        var region = regions[index].toLowerCase();
        if (regionMap[region]) {
            region = regionMap[region];
        } else {
            region = region.charAt(0);
        }

        return [region.toUpperCase(), teams];
    }).map(function (r) {
        var o = {};
        o[r[0]] = r[1];
        return o;
    }).value();

    teams = _.assign.apply(_, teams);

    if (year) {
        var dataDir = path.resolve(__dirname, '../data/' + sport);
        var jsonPath = dataDir + '/' + year + '.json';
        var data = require(jsonPath);
        data.teams = teams;
        fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
    } else {
        process.stdout.write(JSON.stringify(teams, null, 2));
    }
});


