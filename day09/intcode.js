class Computer {
  constructor(codes) {
    this.base = 0;
    this.codes = codes;
    this.cursor = 0;
    this.memory = codes.reduce((memory, code, index) => {
      memory[index] = code;
      return memory;
    }, {});
    this.output = 0;
  }

  static command(code) {
    const operator = code % 100;

    const modes = [];
    let mode = Math.floor(code / 100);
    do {
      modes.push(mode % 10);
      mode = Math.floor(mode / 10);
    } while (mode);

    return { operator, modes };
  }

  read(count, modes) {
    const { base, codes, cursor, memory } = this;
    // console.log(cursor, codes, modes);
    return new Array(count).fill(0).map((value, index) => {
      let address;
      switch (modes[index]) {
        case 2: // Relative mode
          address = base + codes[cursor + index + 1];
          memory[address] = memory[address] || 0;
          return memory[address];
        case 1: // Immediate mode
          return codes[cursor + index + 1];
        case 0: // Position mode
        default:
          address = codes[cursor + index + 1];
          memory[address] = memory[address] || 0;
          return memory[address];
      }
    });
  }

  address(index, modes) {
    const { base, codes, cursor, memory } = this;
    const mode = modes[index] || 0;
    let address;
    switch (mode) {
      case 2: // Relative mode
        address = base + codes[cursor + index];
        return address;
      case 1:
        throw new Error("Cannot read address in immediate mode");
      case 0: // Position mode
        address = codes[cursor + index];
        // console.log("> mode", address, memory["" + address], "=", mode, memory);
        return address;
    }
  }

  write(address, value) {
    this.map[address] = value;
  }

  *run() {
    const { base, cursor, codes, memory } = this;
    while (this.cursor < this.codes.length) {
      let { operator, modes } = Computer.command(codes[this.cursor]);
      let address;
      let parameters = [];
      let target;
      switch (operator) {
        case 1: // Addition
          parameters = this.read(2, modes);
          memory[this.address(3, modes)] = parameters.reduce(
            (result, value) => result + value,
            0
          );
          console.log("sum", parameters, this.address(3, modes));
          this.cursor += 4;
          break;
        case 2: // Multiplication
          parameters = this.read(2, modes);
          memory[this.address(3, modes)] = parameters.reduce(
            (result, value) => result * value,
            1
          );
          this.cursor += 4;
          break;
        case 3: // Input
          let input = yield;
          codes[this.address(1, modes)] = input;
          this.cursor += 2;
          break;
        case 4: // Output
          parameters = this.read(1, modes);
          this.output = parameters[0];
          yield this.output;
          this.cursor += 2;
          console.log("<", memory);
          break;
        case 5: // Jump if true
          parameters = this.read(2, modes);
          this.cursor = parameters[0] ? parameters[1] : cursor + 3;
          break;
        case 6: // Jump if false
          parameters = this.read(2, modes);
          this.cursor = parameters[0] === 0 ? parameters[1] : cursor + 3;
          console.log("jump !", parameters, memory);
          break;
        case 7: // Less than
          parameters = this.read(2, modes);
          memory[this.address(3, modes)] =
            parameters[0] < parameters[1] ? 1 : 0;
          this.cursor += 4;
          break;
        case 8: // Equals
          parameters = this.read(2, modes);
          memory[this.address(3, modes)] =
            parameters[0] === parameters[1] ? 1 : 0;
          this.cursor += 4;
          console.log("equals !", parameters, memory);
          break;
        case 9: // Adjust relative base
          parameters = this.read(1, modes);
          this.base += parameters[0];
          this.cursor += 2;
          // console.log("adjust !", base);
          break;
        case 99:
          console.log("Done", this.output);
          return this.output;
        default:
          throw new Error("Unknown operator code: " + operator);
      }
    }
  }
}

function* intcode(codes) {}

module.exports = { Computer };
