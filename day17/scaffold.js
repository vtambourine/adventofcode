const readline = require("readline");
const { Computer } = require("../intcode/intcode");

function parseInput(input) {
  return input.split(",").map(Number);
}

const SCAFFOLD = "#";

function alignment(program) {
  const codes = parseInput(program);
  let output = "";
  const computer = new Computer(codes).run(
    () => {},
    char => {
      output += String.fromCharCode(char);
    }
  );

  // output =
  //   "..#..........\n" +
  //   "..#..........\n" +
  //   "#######...###\n" +
  //   "#.#...#...#.#\n" +
  //   "#############\n" +
  //   "..#...#...#..\n" +
  //   "..#####...^..";

  console.log(output);

  const screen = output.split("\n").map(row => row.split(""));
  const width = screen[0].length;
  const height = screen.length;

  let alignments = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (
        screen[y][x] === SCAFFOLD &&
        screen[y - 1] &&
        screen[y - 1][x] === SCAFFOLD &&
        screen[y + 1] &&
        screen[y + 1][x] === SCAFFOLD &&
        screen[y][x - 1] === SCAFFOLD &&
        screen[y][x + 1] === SCAFFOLD
      ) {
        screen[y][x] = "O";
        console.log("a:", x, y, x * y);
        alignments += x * y;
      }
    }

    // console.log(screen[y]);
  }

  console.log(screen.map(row => row.join("")).join("\n"));

  return alignments;
}

module.exports = { alignment };
