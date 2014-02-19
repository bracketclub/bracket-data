var _map = require('lodash-node/modern/collections/map');
var _keys = require('lodash-node/modern/objects/keys');
var _values = require('lodash-node/modern/objects/values');
var _find = require('lodash-node/modern/collections/find');


module.exports = function (data) {
    var finalData = data.finalData;
    var regionIds = _map(data.regions, function (r) { return r.id; });
    var finalId = _keys(finalData)[0];
    var finalName = _values(finalData)[0].name;
    var allIds = regionIds.concat(finalId);
    var teamsPerRegion = _find(data.teams, function () { return true; }).length;
    var unpickedMatch = 'X';

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
