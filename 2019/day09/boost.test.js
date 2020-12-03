const assert = require("assert");

const { boost } = require("./boost");
const { fetchInput } = require("../utils");

suite("Day 9: Sensor Boost", () => {
  suite("Part 1", () => {
    test("Test cases are valid", () => {
      [
        ["1102,34915192,34915192,7,4,7,99,0", 1219070632396864],
        ["104,1125899906842624,99", 1125899906842624],
      ].forEach(([program, expected]) => {
        assert.equal(boost(program).pop(), expected);
      });
    });

    test("Quine", () => {
      const program =
        "109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99";
      assert.equal(boost(program).join(","), program);
    });

    const expectedAnswer = 3100786347;
    test(`Answer is ${expectedAnswer}`, () => {
      const program = fetchInput();
      assert.equal(boost(program).pop(), expectedAnswer);
    });
  });

  suite("Part 2", () => {
    const expectedAnswer = 87023;
    test(`Answer is ${expectedAnswer}`, () => {
      const program = fetchInput();
      assert.equal(boost(program, 2).pop(), expectedAnswer);
    });
  });
});
