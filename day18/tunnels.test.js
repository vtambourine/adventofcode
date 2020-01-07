const assert = require("assert");

const { path } = require("./tunnels");
const { fetchInput } = require("../utils");

suite("Day 17: Set and Forget", () => {
  suite("Part 1", () => {
    test("Test cases are valid", () => {
      [
        // ["#########\n" + "#b.A.@.a#\n" + "#########", 8],
        [
          "########################\n" +
            "#f.D.E.e.C.b.A.@.a.B.c.#\n" +
            "######################.#\n" +
            "#d.....................#\n" +
            "########################",
          86,
        ],
      ].forEach(([input, expected]) => {
        assert.equal(path(input), expected);
      });
    });

    const expectedAnswer = 0;
    test.skip(`Answer is ${expectedAnswer}`, () => {
      const input = fetchInput();
      assert.equal(path(input), expectedAnswer);
    });
  });

  suite("Part 2", () => {});
});
