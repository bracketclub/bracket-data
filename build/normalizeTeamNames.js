var _ = require('lodash');
var request = require('request');
var cheerio = require('cheerio');

var order = require('../data/ncaa-mens-basketball/defaults').order;
var url = 'http://espn.go.com/ncb/bracketology';
var regionMap = {
    'midwest': 'MW'
};

var specialNames = {
    'a&m': 'A&M',
    'smu': 'SMU',
    'nc': 'NC',
    'lsu': 'LSU',
    'ny': 'NY',
    'uc': 'UC'
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
    }).object().value();

    process.stdout.write(JSON.stringify(teams, null, 2));
});


