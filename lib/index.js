var assign = require("lodash.merge");
var methods = {
  bracket: require("./bracket"),
  constants: require("./constants"),
  regex: require("./regex"),
  order: function (data) {
    return data.order;
  },
  scoring: function (data) {
    return data.scoring;
  },
  locks: function (data) {
    return data.locks;
  },
  complete: function (data) {
    return data.complete || null;
  }
};

module.exports = function (o) {
  var bracketData = assign(
    {},
    require("../data/" + o.sport + "/defaults.json"),
    require("../data/" + o.sport + "/" + o.year + ".json")
  );
  var output = {};

  Object.keys(methods).forEach(function (prop) {
    output[prop] = methods[prop](bracketData);
  });

  return output;
};
