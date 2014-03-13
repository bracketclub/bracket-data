var _merge = require('lodash-node/modern/objects/merge');
var _each = require('lodash-node/modern/collections/forEach');
var _filter = require('lodash-node/modern/collections/filter');
var _groupBy = require('lodash-node/modern/collections/groupBy');
var data = {};
var path = require('path');
var walkdir = require('walkdir');
var dataPaths = walkdir.sync('./data');
var dataFiles = _filter(dataPaths, function (dataPath) {
    return path.extname(dataPath) === '.json' && path.basename(dataPath, '.json') !== 'defaults';
});
dataFiles = _groupBy(dataFiles, function (dataPath) {
    return path.basename(path.dirname(dataPath));
});

_each(dataFiles, function (files, sport) {
    data[sport] || (data[sport] = {});
    data[sport].defaults = require('./' + sport + '/defaults');
    _each(files, function (file) {
        var year = path.basename(file, '.json');
        data[sport][year] = require('./' + sport + '/' + year);
    });
});

module.exports = function (sport, year) {
    var defaultData = data[sport] && data[sport].defaults || {};
    var yearData = data[sport] && data[sport][year];

    if (yearData) {
        return _merge(defaultData, yearData);
    } else {
        throw new Error('The combination of ' + sport + ' and ' + year + ' does not exist.');
    }
};
