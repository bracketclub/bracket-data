var _extend = require('lodash-node/modern/objects/assign'),
    _each = require('lodash-node/modern/collections/forEach'),
    capitalize = function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
    data = require('./data'),
    regionNameToId = require('./helpers/regionNameToId');


module.exports = function (year) {
    var yearData = data(year),
        exportData = {regions: {}};

    _each(yearData.regions, function (region, index) {
        exportData.regions[regionNameToId(region)] = {
            name: capitalize(region.toLowerCase()),
            sameSideAs: regionNameToId(index % 2 ? yearData.regions[index - 1] : yearData.regions[index + 1]),
            teams: yearData.teams[region].split(',')
        };
    });

    return _extend(exportData, yearData.finalData);
};
