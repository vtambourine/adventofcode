function parseInput(reactions) {
  return reactions.split("\n").reduce((index, reaction) => {
    const [input, [output]] = reaction.split("=>").map(resources =>
      resources.split(",").map(side => {
        const [amount, resource] = side.trim().split(" ");
        return { amount: Number(amount), resource };
      })
    );
    index[output.resource] = {
      amount: output.amount,
      resources: input,
    };
    return index;
  }, {});
}

function minerals(input, fuel = 1) {
  const index = parseInput(input);

  let ore = 0;
  const pipeline = [["FUEL", fuel]];
  const stash = { ORE: 0 };

  while (pipeline.length) {
    let [resource, amount] = pipeline.shift();

    stash[resource] = stash[resource] || 0;

    let produce = 0;
    produce = Math.max(0, amount - stash[resource]);
    stash[resource] = Math.max(0, stash[resource] - amount);

    if (resource === "ORE") {
      ore += produce;
      continue;
    }

    let recipe = index[resource];
    let factor = Math.ceil(produce / recipe.amount);
    let leftover = recipe.amount * factor - produce;
    stash[resource] += Math.max(0, leftover);

    for (let ingredient of recipe.resources) {
      let required = ingredient.amount * factor;
      if (required > 0) {
        pipeline.push([ingredient.resource, required]);
      }
    }
  }

  return ore;
}

function maximumFuel(input, target = 1e12) {
  let fuel = 1;
  while (true) {
    let ore = minerals(input, fuel + 1);
    if (ore > target) {
      return fuel;
    } else {
      fuel = Math.max(fuel + 1, Math.floor(((fuel + 1) * target) / ore));
    }
  }
}

module.exports = { minerals, maximumFuel };
