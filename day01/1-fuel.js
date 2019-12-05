function totalMass(input) {
  const modules = input.split("\n").map(n => parseInt(n, 10));
  return modules.reduce((fuel, mass) => {
    return fuel + Math.floor(mass / 3) - 2;
  }, 0);
}

function totalExtraMass(input) {
  const modules = input.split("\n").map(n => parseInt(n, 10));

  let totalFuel = 0;

  return modules.reduce((fuel, mass) => {
    let extra = Math.floor(mass / 3) - 2;
    while (extra > 0) {
      fuel += extra;
      extra = Math.floor(extra / 3) - 2;
    }
    return fuel;
  }, 0);
}

module.exports = { totalMass, totalExtraMass };
