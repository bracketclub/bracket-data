/* eslint-env mocha */

var bracketData = require("../lib/index");
var assert = require("assert");
var year = "2013";
var sport = "ncaam";

var hasOwn = function (obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};

describe("Bracket Data", function () {
  it("should create a bracket with only the default property: bracket", function () {
    var b = bracketData({
      year: year,
      sport: sport
    });

    var b2 = bracketData({
      year: year,
      sport: sport
    });

    assert.strictEqual(true, hasOwn(b, "bracket"));
    assert.strictEqual(true, hasOwn(b2, "bracket"));

    assert.strictEqual(
      b.bracket.regions.MW.teams[0],
      b2.bracket.regions.MW.teams[0]
    );
    assert.strictEqual(
      b.bracket.regions.MW.teams[15],
      b2.bracket.regions.MW.teams[15]
    );
  });

  it("should create a bracket with the specifed properties", function () {
    var b = bracketData({
      year: year,
      sport: sport
    });

    assert.strictEqual(true, hasOwn(b, "bracket"));
    assert.strictEqual(true, hasOwn(b, "constants"));
    assert.strictEqual(true, hasOwn(b, "regex"));
    assert.strictEqual(true, hasOwn(b, "order"));
    assert.strictEqual(true, hasOwn(b, "scoring"));
    assert.strictEqual(true, hasOwn(b, "locks"));
  });

  it("should not add certain properties to instance", function () {
    var b = bracketData({
      year: year,
      sport: sport
    });

    assert.strictEqual(false, hasOwn(b, "props"));
    assert.strictEqual(false, hasOwn(b, "year"));
    assert.strictEqual(false, hasOwn(b, "sport"));
  });

  it("should throw an error if year+sport is non-existant", function () {
    assert.throws(function () {
      bracketData({
        year: "9",
        sport: "world-ball-championship"
      });
    }, Error);
  });
});
