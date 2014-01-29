var consts = require('./constants');


module.exports = function (year) {
    var CONSTS = consts(year),
        regionAlphas = CONSTS.REGION_IDS.join(''),
        possiblePickLength = function (i) { return (i - 1) + ',' + ((i - 1) * 2); },
        regionRegEx = '([' + regionAlphas + ']{1,2})([\\d' + CONSTS.UNPICKED_MATCH + ']{' + possiblePickLength(CONSTS.TEAMS_PER_REGION) + '})',
        finalRegEx = '(' + CONSTS.FINAL_ID + ')([' + regionAlphas + 'X]{' + possiblePickLength(CONSTS.REGION_COUNT) + '})';

    return new RegExp(new Array(CONSTS.REGION_COUNT + 1).join(regionRegEx) + finalRegEx);
};