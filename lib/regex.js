var consts = require('./constants');


module.exports = function (data) {
    var CONSTS = consts(data);
    var regionAlphas = CONSTS.REGION_IDS.join('');
    var possiblePickLength = function (i) { return (i - 1) + ',' + ((i - 1) * 2); };
    var regionRegEx = '([' + regionAlphas + ']{1,2})([\\d' + CONSTS.UNPICKED_MATCH + ']{' + possiblePickLength(CONSTS.TEAMS_PER_REGION) + '})';
    var finalRegEx = '(' + CONSTS.FINAL_ID + ')([' + regionAlphas + 'X]{' + possiblePickLength(CONSTS.REGION_COUNT) + '})';

    return new RegExp(new Array(CONSTS.REGION_COUNT + 1).join(regionRegEx) + finalRegEx);
};
