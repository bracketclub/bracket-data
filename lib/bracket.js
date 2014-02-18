var _extend = require('lodash-node/modern/objects/assign'),
    _each = require('lodash-node/modern/collections/forEach'),
    capitalize = function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
    regionNameToId = require('../helpers/regionNameToId');


module.exports = function (data) {
    var exportData = {regions: {}};

    _each(data.regions, function (region, index) {
        exportData.regions[regionNameToId(region)] = {
            name: capitalize(region.toLowerCase()),
            sameSideAs: regionNameToId(index % 2 ? data.regions[index - 1] : data.regions[index + 1]),
            teams: data.teams[region]
        };
    });

    return _extend(exportData, data.finalData);
};
