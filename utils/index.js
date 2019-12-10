const fs = require("fs");
const path = require("path");

function fetchInput() {
  const projectName = path
    .resolve(__dirname, "..")
    .split(path.sep)
    .reverse()[0];

  const stack = new Error().stack;
  const dayName = stack
    .split("at ")[2]
    .trim()
    .match(`${projectName}\/([0-9a-z]+)\/`)[1];

  const input = fs
    .readFileSync(path.resolve(process.cwd(), dayName, `${dayName}.input`), {
      encoding: "utf8",
    })
    .trim();

  return input;
}

module.exports = {
  fetchInput,
};
