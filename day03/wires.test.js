const assert = require("assert");

const { intersection, length } = require("./wires");
const { fetchInput } = require("../utils");

suite("Day 3: Crossed Wires", () => {
  suite("Part 1", () => {
    test("Test cases are valid", () => {
      [
        ["R2,U2\nU2,R2", 4],
        ["R8,U5,L5,D3\nU7,R6,D4,L4", 6],
        [
          "R75,D30,R83,U83,L12,D49,R71,U7,L72\n" +
            "U62,R66,U55,R34,D71,R55,D58,R83",
          159,
        ],
        [
          "R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\n" +
            "U98,R91,D20,R16,D67,R40,U7,R15,U6,R7",
          135,
        ],
      ].forEach(([input, expected]) => {
        assert.equal(intersection(input), expected);
      });
    });

    const expectedAnswer = 1519;
    test(`Answer is ${expectedAnswer}`, () => {
      const input = fetchInput();
      assert.equal(intersection(input), expectedAnswer);
    });
  });

  suite("Part 2", () => {
    test("Test cases are valid", () => {
      [
        ["R8,U5,L5,D3\nU7,R6,D4,L4", 30],
        [
          "R75,D30,R83,U83,L12,D49,R71,U7,L72\n" +
            "U62,R66,U55,R34,D71,R55,D58,R83",
          610,
        ],
        [
          "R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\n" +
            "U98,R91,D20,R16,D67,R40,U7,R15,U6,R7",
          410,
        ],
      ].forEach(([input, expected]) => {
        assert.equal(length(input), expected);
      });
    });

    const expectedAnswer = 14358;
    test(`Answer is ${expectedAnswer}`, () => {
      const input = fetchInput();
      assert.equal(length(input), expectedAnswer);
    });
  });
});
