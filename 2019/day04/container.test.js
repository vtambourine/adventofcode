const assert = require("assert");

const { passwords, detailedPasswords } = require("./contaiter");
const { fetchInput } = require("../utils");

suite("Day 4: Secure Container", () => {
  suite("Part 1", () => {
    test("Test cases are valid", () => {
      [
        ["111111-111111", 1],
        ["223450-223450", 0],
        ["123789-123789", 0],
      ].forEach(([input, expected]) => {
        assert.equal(passwords(input), expected);
      });
    });

    const expectedAnswer = 1890;
    test(`Answer is ${expectedAnswer}`, () => {
      const input = fetchInput();
      assert.equal(passwords(input), expectedAnswer);
    });
  });

  suite("Part 2", () => {
    test("Test cases are valid", () => {
      [
        ["111111-111111", 0],
        ["112233-112233", 1],
        ["123444-123444", 0],
        ["111122-111122", 1],
      ].forEach(([input, expected]) => {
        assert.equal(detailedPasswords(input), expected);
      });
    });

    const expectedAnswer = 1277;
    test(`Answer is ${expectedAnswer}`, () => {
      const input = fetchInput();
      assert.equal(detailedPasswords(input), expectedAnswer);
    });
  });
});
