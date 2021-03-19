/* eslint-env mocha */

var bracketData = require("../lib/index");
var assert = require("assert");

describe("Bracket Data", function () {
  it("should have correct data for ncaam", function () {
    var b = bracketData({
      year: "2012",
      sport: "ncaam"
    });

    assert.strictEqual(b.constants.REGION_COUNT, 4);
    assert.strictEqual(b.constants.FINAL_ID, "FF");
    assert.strictEqual(b.constants.ALL_IDS.join(" "), "S W E MW FF");
    assert.strictEqual(b.constants.FINAL_NAME, "Final Four");
    assert.strictEqual(
      b.constants.FINAL_CHAMPIONSHIP_NAME,
      "National Championship"
    );
    assert.strictEqual(b.constants.UNPICKED_MATCH, "X");
    assert.strictEqual(b.constants.TEAMS_PER_REGION, 16);
    assert.strictEqual(b.constants.BEST_OF, 1);
  });
});
