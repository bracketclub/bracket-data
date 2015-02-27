var walkdir = require('walkdir');
var path = require('path');
var _ = require('lodash');
var fs = require('fs');
var dataPaths = walkdir.sync('./data');

var dataFiles = _.chain(dataPaths).filter(function (dataPath) {
    return path.extname(dataPath) === '.json' && path.basename(dataPath, '.json') !== 'defaults';
}).groupBy(function (dataPath) {
    return path.basename(path.dirname(dataPath));
}).value();

var replaceStr = ['var data = {'];
var sports = [];
_.each(dataFiles, function (files, sportName) {
    var sport = ['    "' + sportName + '": {'];
    var years = [];
    years.push('        "defaults": require("./' + sportName + '/defaults.json")');
    _.each(files, function (file) {
        var year = path.basename(file, '.json');
        years.push('        "' + year + '": require("./' + sportName + '/' + year + '.json")');
    });
    sport.push(years.join(',\n'));
    sport.push('    }');
    sports.push(sport.join('\n'));
});
replaceStr.push(sports.join(',\n'));
replaceStr.push('};');
replaceStr = replaceStr.join('\n');

var dataIndex = fs.readFileSync('./data/index.js', {encoding: 'utf8'});
dataIndex = dataIndex.replace(/var data = \{[\s\S.]*(^module)/m, replaceStr + '\n\n\n$1');
fs.writeFileSync('./data/index.js', dataIndex);