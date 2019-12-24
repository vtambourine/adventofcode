function parseInput(input) {
  return input.split("\n").map(Number);
}

function fuelMass(mass) {
  return Math.floor(mass / 3) - 2;
}

function fuel(input) {
  const modules = parseInput(input);
  return modules.reduce((fuel, mass) => fuel + fuelMass(mass), 0);
}

function totalFuel(input) {
  const modules = parseInput(input);
  return modules.reduce((fuel, mass) => {
    let extra = fuelMass(mass);
    while (extra > 0) {
      fuel += extra;
      extra = fuelMass(extra);
    }
    return fuel;
  }, 0);
}

module.exports = { fuel, totalFuel };
