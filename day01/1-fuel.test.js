const fs = require("fs");
const path = require("path");
const assert = require("assert");
const { totalMass, totalExtraMass } = require("./1-fuel");

suite("Day 1: The Tyranny of the Rocket Equation", () => {
  [
    ["12", 2],
    ["14", 2],
    ["1969", 654],
    ["100756", 33583]
  ].forEach(([input, expected]) => {
    test(`${input}`, () => {
      assert.equal(totalMass(input), expected);
    });
  });

  test("answer", () => {
    const input = fs.readFileSync(
      path.join(__dirname, path.basename(__dirname) + ".input"),
      {
        encoding: "utf8"
      }
    );
    assert.doesNotThrow(() => {
      console.log("Answer is:", totalMass(input));
    });
  });

  test("part two", () => {
    [
      ["14", 2],
      ["1969", 966],
      ["100756", 50346]
    ].forEach(([input, expected]) => {
      assert.equal(totalExtraMass(input), expected);
    });
  });

  test("answer 2", () => {
    const input = fs.readFileSync(
      path.join(__dirname, path.basename(__dirname) + ".input"),
      {
        encoding: "utf8"
      }
    );
    assert.doesNotThrow(() => {
      console.log("Answer is:", totalExtraMass(input));
    });
  });
});
