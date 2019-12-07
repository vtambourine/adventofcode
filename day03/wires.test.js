const fs = require("fs");
const path = require("path");
const assert = require("assert");
const { intersection } = require("./wires");

suite("Day 3: Wires", () => {
  test("part one", () => {
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

  test("answer", () => {
    const input = fs.readFileSync(
      path.join(__dirname, path.basename(__dirname) + ".input"),
      {
        encoding: "utf8",
      }
    );
    assert.doesNotThrow(() => {
      console.log("Answer is:", intersection(input));
    });
  });
});
