var _map = require('lodash-node/modern/collections/map'),
    _keys = require('lodash-node/modern/objects/keys'),
    _values = require('lodash-node/modern/objects/values'),
    _find = require('lodash-node/modern/collections/find'),
    regionNameToId = require('../helpers/regionNameToId');


module.exports = function (data) {
    var finalData = data.finalData,
        regionIds = _map(data.regions, regionNameToId),
        finalId = _keys(finalData)[0],
        finalName = _values(finalData)[0].name,
        allIds = regionIds.concat(finalId),
        teamsPerRegion = _find(data.teams, function () { return true; }).split(',').length,
        unpickedMatch = 'X';

    return {
        REGION_COUNT: regionIds.length,
        REGION_IDS: regionIds,
        FINAL_ID: finalId,
        ALL_IDS: allIds,
        EMPTY: allIds.join(new Array(teamsPerRegion).join(unpickedMatch)) + new Array(regionIds.length).join(unpickedMatch),
        FINAL_NAME: finalName,
        UNPICKED_MATCH: unpickedMatch,
        TEAMS_PER_REGION: teamsPerRegion
    };
};