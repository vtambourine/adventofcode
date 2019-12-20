const assert = require("assert");

const { boost } = require("./boost");
const { Computer } = require("./intcode");
const { fetchInput } = require("../utils");

suite("Day 9: Sensor Boost", () => {
  suite("Part 1", () => {
    test("Test cases are valid", () => {
      [
        // [
        //   "109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99",
        //   1219070632396864,
        // ],
        ["1102,34915192,34915192,7,4,7,99,0", 1219070632396864],
        ["104,1125899906842624,99", 1125899906842624],
      ].forEach(([program, expected]) => {
        assert.equal(boost(program, expected), expected);
      });
    });

    test("Quine", () => {
      const program =
        "109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99";
      let result = [];
      const computer = new Computer(
        program.split(",").map(n => parseInt(n, 10))
      ).run();
      let guard = 100;
      let output = computer.next();
      while (!output.done && guard--) {
        result.push(output.value);
        output = computer.next();
      }
      assert.equal(result.join(","), program);
    });

    test("fff", () => {
      const program = "1101,0,555,1985,109,2000,109,19,204,-34,99";
      assert.equal(boost(program), expectedAnswer);
    });

    const expectedAnswer = 0;
    test.only(`Answer is ${expectedAnswer}`, () => {
      const program = fetchInput();
      assert.equal(boost(program), expectedAnswer);
    });
  });
});
