const assert = require("assert");

const { energy, loop } = require("./moons");
const { fetchInput } = require("../utils");

suite("Day 12: The N-Body Problem", () => {
  suite("Part 1", () => {
    test("Test cases are valid", () => {
      [
        [
          "<x=-1, y=0, z=2>\n" +
            "<x=2, y=-10, z=-7>\n" +
            "<x=4, y=-8, z=8>\n" +
            "<x=3, y=5, z=-1>",
          10,
          179,
        ],
        [
          "<x=-8, y=-10, z=0>\n" +
            "<x=5, y=5, z=10>\n" +
            "<x=2, y=-7, z=3>\n" +
            "<x=9, y=-8, z=-3>",
          100,
          1940,
        ],
      ].forEach(([input, steps, expected]) => {
        assert.equal(energy(input, steps), expected);
      });
    });

    const expectedAnswer = 13399;
    test(`Answer is ${expectedAnswer}`, () => {
      const input = fetchInput();
      assert.equal(energy(input, 1000), expectedAnswer);
    });
  });

  suite("Part 2", () => {
    test("Test cases are valid", () => {
      [
        [
          "<x=-1, y=0, z=2>\n" +
            "<x=2, y=-10, z=-7>\n" +
            "<x=4, y=-8, z=8>\n" +
            "<x=3, y=5, z=-1>",
          2772,
        ],
        [
          "<x=-8, y=-10, z=0>\n" +
            "<x=5, y=5, z=10>\n" +
            "<x=2, y=-7, z=3>\n" +
            "<x=9, y=-8, z=-3>",
          4686774924,
        ],
      ].forEach(([input, expected]) => {
        assert.equal(loop(input), expected);
      });
    });

    const expectedAnswer = 312992287193064;
    test(`Answer is ${expectedAnswer}`, () => {
      const input = fetchInput();
      assert.equal(loop(input, 1000), expectedAnswer);
    });
  });
});
