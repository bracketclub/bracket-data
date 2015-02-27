var _map = require('lodash/collection/map');
var _find = require('lodash/collection/find');


module.exports = function (data) {
    var finalData = data.finalRegion;
    var regionIds = _map(data.regions, function (r) { return r.id; });
    var finalId = finalData.id;
    var finalName = finalData.name;
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
