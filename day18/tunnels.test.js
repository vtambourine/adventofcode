const assert = require("assert");

const { path, multipath } = require("./tunnels");
const { fetchInput } = require("../utils");

suite("Day 18: Many-Worlds Interpretation", () => {
  suite("Part 1", () => {
    test("Test cases are valid", () => {
      [
        ["#########\n" + "#b.A.@.a#\n" + "#########", 8],
        [
          "########################\n" +
            "#f.D.E.e.C.b.A.@.a.B.c.#\n" +
            "######################.#\n" +
            "#d.....................#\n" +
            "########################",
          86,
        ],
        [
          "########################\n" +
            "#...............b.C.D.f#\n" +
            "#.######################\n" +
            "#.....@.a.B.c.d.A.e.F.g#\n" +
            "########################",
          132,
        ],
        [
          "########################\n" +
            "#@..............ac.GI.b#\n" +
            "###d#e#f################\n" +
            "###A#B#C################\n" +
            "###g#h#i################\n" +
            "########################",
          81,
        ],
      ].forEach(([input, expected]) => {
        assert.equal(path(input), expected);
      });
    });

    test("Large test cases are valid", () => {
      [
        [
          "#################\n" +
            "#i.G..c...e..H.p#\n" +
            "########.########\n" +
            "#j.A..b...f..D.o#\n" +
            "########@########\n" +
            "#k.E..a...g..B.n#\n" +
            "########.########\n" +
            "#l.F..d...h..C.m#\n" +
            "#################",
          136,
        ],
      ].forEach(([input, expected]) => {
        assert.equal(path(input), expected);
      });
    });

    const expectedAnswer = 5182;
    test(`Answer is ${expectedAnswer}`, () => {
      const input = fetchInput();
      assert.equal(path(input), expectedAnswer);
    });
  });

  suite("Part 2", () => {
    test("Test cases are valid", () => {
      [
        [
          "#######\n" +
            "#a.#Cd#\n" +
            "##...##\n" +
            "##.@.##\n" +
            "##...##\n" +
            "#cB#Ab#\n" +
            "#######",
          8,
        ],
        [
          "###############\n" +
            "#d.ABC.#.....a#\n" +
            "######...######\n" +
            "######.@.######\n" +
            "######...######\n" +
            "#b.....#.....c#\n" +
            "###############",
          24,
        ],
        [
          "#############\n" +
            "#DcBa.#.GhKl#\n" +
            "#.###...#I###\n" +
            "#e#d#.@.#j#k#\n" +
            "###C#...###J#\n" +
            "#fEbA.#.FgHi#\n" +
            "#############",
          32,
        ],
        [
          "#############\n" +
            "#g#f.D#..h#l#\n" +
            "#F###e#E###.#\n" +
            "#dCba...BcIJ#\n" +
            "#####.@.#####\n" +
            "#nK.L...G...#\n" +
            "#M###N#H###.#\n" +
            "#o#m..#i#jk.#\n" +
            "#############",
          72,
        ],
      ].forEach(([input, expected]) => {
        assert.equal(multipath(input), expected);
      });
    });

    const expectedAnswer = 2154;
    test(`Answer is ${expectedAnswer}`, () => {
      const input = fetchInput();
      assert.equal(multipath(input), expectedAnswer);
    });
  });
});
