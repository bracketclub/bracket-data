var _merge = require('lodash/object/merge');
var data = {
    "ncaa-mens-basketball": {
        "defaults": require("./ncaa-mens-basketball/defaults.json"),
        "2012": require("./ncaa-mens-basketball/2012.json"),
        "2013": require("./ncaa-mens-basketball/2013.json"),
        "2014": require("./ncaa-mens-basketball/2014.json"),
        "2015": require("./ncaa-mens-basketball/2015.json")
    },
    "ncaa-mens-hockey": {
        "defaults": require("./ncaa-mens-hockey/defaults.json"),
        "2013": require("./ncaa-mens-hockey/2013.json")
    }
};


module.exports = function (sport, year) {
    var defaultData = data[sport] && data[sport].defaults || {};
    var yearData = data[sport] && data[sport][year];

    if (yearData) {
        return _merge({}, defaultData, yearData);
    } else {
        throw new Error('The combination of ' + sport + ' and ' + year + ' does not exist.');
    }
};
