var _merge = require('lodash-node/modern/objects/merge');
var fs = require('fs');
var path = require('path');


module.exports = function (sport, year) {
    var sportYearPath = path.resolve(__dirname, sport, year + '.json');
    var sportDefaultPath = path.resolve(__dirname, sport, 'defaults.json');
    var yearData, defaultData;

    if (!fs.existsSync(sportDefaultPath)) {
        defaultData = {};
    } else {
        defaultData = require('.' + path.sep + path.relative(__dirname, sportDefaultPath));
    }

    if (fs.existsSync(sportYearPath)) {
        yearData = require('.' + path.sep + path.relative(__dirname, sportYearPath));
        return _merge(defaultData, yearData);
    } else {
        throw new Error('The combination of ' + sport + ' and ' + year + ' does not exist.');
    }
};
