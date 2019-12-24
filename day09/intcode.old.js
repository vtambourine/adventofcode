class Computer {
  constructor(codes) {
    this.base = 0;
    this.codes = codes;
    this.cursor = 0;
    this.memory = codes.reduce((memory, code, index) => {
      memory[index] = code;
      return memory;
    }, {});
    // this.output = 0;
    this.output = [];
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
    return new Array(count).fill(0).map((value, index) => {
      let address;
      switch (modes[index]) {
        case 2: // Relative mode
          address = base + this.memory[cursor + index + 1];
          this.memory[address] = this.memory[address] || 0;
          return this.memory[address];
        case 1: // Immediate mode
          return this.memory[cursor + index + 1];
        case 0: // Position mode
        default:
          address = this.memory[cursor + index + 1];
          this.memory[address] = this.memory[address] || 0;
          return this.memory[address];
      }
    });
  }

  address(index, modes) {
    const mode = modes[index] || 0;
    let address;
    switch (mode) {
      case 2: // Relative mode
        address = this.base + this.memory[this.cursor + index];
        return address;
      case 1:
        throw new Error("Cannot read address in immediate mode");
      case 0: // Position mode
        address = this.memory[this.cursor + index];
        return address;
    }
  }

  // *run() {
  run(input) {
    while (this.cursor < this.codes.length) {
      let { operator, modes } = Computer.command(this.memory[this.cursor]);
      let parameters = [];
      switch (operator) {
        case 1: // Addition
          parameters = this.read(2, modes);
          this.memory[this.address(3, modes)] = parameters[0] + parameters[1];
          this.cursor += 4;
          break;
        case 2: // Multiplication
          parameters = this.read(2, modes);
          this.memory[this.address(3, modes)] = parameters[0] * parameters[1];
          this.cursor += 4;
          break;
        case 3: // Input
          // let input = yield;
          let val = input.splice(0, 1);
          // this.memory[this.address(1, modes)] = input;
          if (val.length === 0) {
            throw new Error("Out of input");
          }
          this.memory[this.address(1, modes)] = val[0];
          this.cursor += 2;
          break;
        case 4: // Output
          parameters = this.read(1, modes);
          // this.output = parameters[0];
          this.output.push(parameters[0]);
          // yield this.output;
          // console.log(this.output);
          this.cursor += 2;
          break;
        case 5: // Jump if true
          parameters = this.read(2, modes);
          this.cursor = parameters[0] ? parameters[1] : this.cursor + 3;
          break;
        case 6: // Jump if false
          parameters = this.read(2, modes);
          this.cursor = parameters[0] === 0 ? parameters[1] : this.cursor + 3;
          break;
        case 7: // Less than
          parameters = this.read(2, modes);
          this.memory[this.address(3, modes)] =
            parameters[0] < parameters[1] ? 1 : 0;
          this.cursor += 4;
          break;
        case 8: // Equals
          parameters = this.read(2, modes);
          this.memory[this.address(3, modes)] =
            parameters[0] === parameters[1] ? 1 : 0;
          this.cursor += 4;
          break;
        case 9: // Adjust relative base
          parameters = this.read(1, modes);
          this.base += parameters[0];
          this.cursor += 2;
          break;
        case 99:
          // console.log("Done!", this.cursor);
          return this.output;
        default:
          console.log({ cursor: this.cursor });
          throw new Error("Unknown operator code: " + operator);
      }
    }
  }
}

module.exports = { Computer };
