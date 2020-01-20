const assert = require("assert");

const { cycle, multiverse } = require("./bugs");
const { fetchInput } = require("../utils");

suite("Day 24: Planet of Discord", () => {
  suite("Part 1", () => {
    test("Test cases are valid", () => {
      [
        [
          "....#\n" + // prettier-ignore
            "#..#.\n" +
            "#..##\n" +
            "..#..\n" +
            "#....",
          2129920,
        ],
      ].forEach(([input, expected]) => {
        assert.equal(cycle(input), expected);
      });
    });

    const answer = 30442557;
    test(`Answer is ${answer}`, () => {
      const input = fetchInput();
      assert.equal(cycle(input), answer);
    });
  });

  suite("Part 2", () => {
    test("Test cases are valid", () => {
      [
        [
          "....#\n" + // prettier-ignore
            "#..#.\n" +
            "#..##\n" +
            "..#..\n" +
            "#....",
          99,
        ],
      ].forEach(([input, expected]) => {
        assert.equal(multiverse(input, 10), expected);
      });
    });

    const answer = 1987;
    test(`Answer is ${answer}`, () => {
      const input = fetchInput();
      assert.equal(multiverse(input, 200), answer);
    });
  });
});
