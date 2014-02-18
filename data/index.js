var _merge = require('lodash-node/modern/objects/merge');
var _omit = require('lodash-node/modern/objects/omit');


module.exports = function (sport, year) {
    var data = require('./' + (sport || 'ncaa-mens-basketball'));
    var yearData = data.years[year || new Date().getFullYear()];
    return _merge(yearData, _omit(data, 'years'));
};