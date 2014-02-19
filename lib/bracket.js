var _extend = require('lodash-node/modern/objects/assign');
var _each = require('lodash-node/modern/collections/forEach');


module.exports = function (data) {
    var exportData = {regions: {}};

    _each(data.regions, function (region, index) {
        exportData.regions[region.id] = {
            name: region.name,
            fullname: region.fullname,
            sameSideAs: index % 2 ? data.regions[index - 1].id : data.regions[index + 1].id,
            teams: data.teams[region.id]
        };
    });

    return _extend(exportData, data.finalData);
};
