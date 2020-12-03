const assert = require("assert");

const { checksum, transfers } = require("./orbits");
const { fetchInput } = require("../utils");

suite("Day 6: Universal Orbit Map", () => {
  suite("Part 1", () => {
    test("Test cases are valid", () => {
      [
        [
          "COM)B\n" +
            "B)C\n" +
            "C)D\n" +
            "D)E\n" +
            "E)F\n" +
            "B)G\n" +
            "G)H\n" +
            "D)I\n" +
            "E)J\n" +
            "J)K\n" +
            "K)L",
          42,
        ],
      ].forEach(([input, expected]) => {
        assert.equal(checksum(input), expected);
      });
    });

    const expectedAnswer = 204521;
    test(`Answer is ${expectedAnswer}`, () => {
      const input = fetchInput();
      assert.equal(checksum(input), expectedAnswer);
    });
  });

  suite("Part 2", () => {
    test("Test cases are valid", () => {
      [
        [
          "COM)B\n" +
            "B)C\n" +
            "C)D\n" +
            "D)E\n" +
            "E)F\n" +
            "B)G\n" +
            "G)H\n" +
            "D)I\n" +
            "E)J\n" +
            "J)K\n" +
            "K)L\n" +
            "K)YOU\n" +
            "I)SAN",
          4,
        ],
      ].forEach(([input, expected]) => {
        assert.equal(transfers(input), expected);
      });
    });

    const expectedAnswer = 307;
    test(`Answer is ${expectedAnswer}`, () => {
      const input = fetchInput();
      assert.equal(transfers(input), expectedAnswer);
    });
  });
});
