class Computer {
  constructor(codes) {
    this.base = 0;
    this.codes = codes;
    this.cursor = 0;
    this.memory = {};
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
    console.log(cursor, codes, modes);
    return new Array(count).fill(0).map((value, index) => {
      let address;
      switch (modes[index]) {
        case 0: // Position mode
        case undefined:
          address = codes[cursor + index + 1];
          if (address >= codes.length) {
            address = address - codes.length;
            memory[String(address)] = memory[String(address)] || 0;
            return memory[String(address)];
          } else {
            return codes[codes[cursor + index + 1]];
          }
        case 1: // Immediate mode
          return codes[cursor + index + 1];
        case 2: // Relative mode
          address = base + codes[cursor + index + 1];
          if (address >= codes.length) {
            address = address - codes.length;
            memory[String(address)] = memory[String(address)] || 0;
            return memory[String(address)];
          } else {
            return codes[address];
          }
      }
    });
  }

  write(address, value) {}

  *run() {
    const { base, cursor, codes, memory } = this;
    while (this.cursor < this.codes.length) {
      let { operator, modes } = Computer.command(codes[cursor]);
      let address;
      let parameters = [];
      switch (operator) {
        case 1: // Addition
          parameters = this.read(3, modes);
          // this.write(
          //   parameters[2],
          //   parameters.reduce((result, value) => result + value, 0)
          // );
          address = codes[cursor + 3];
          // if (address >= codes.length) {
          //   address -= codes.length;
          //   memory[String(address)] = parameters.reduce(
          //     (result, value) => result + value,
          //     0
          //   );
          // } else {
          codes[parameters[2]] = parameters.reduce(
            (result, value) => result + value,
            0
          );
          // }
          this.cursor += 4;
          break;
        case 2: // Multiplication
          parameters = this.read(3, modes);
          codes[parameters[2]] = parameters.reduce(
            (result, value) => result * value,
            1
          );
          console.log(codes);
          this.cursor += 4;
          // parameters = this.read(2, modes);
          // codes[codes[cursor + 3]] = parameters.reduce(
          //   (result, value) => result * value,
          //   1
          // );
          // this.cursor += 4;
          break;
        case 3: // Input
          let input = yield;
          codes[codes[cursor + 1]] = input;
          this.cursor += 2;
          break;
        case 4: // Output
          parameters = this.read(1, modes);
          this.output = parameters[0];
          yield output;
          this.cursor += 2;
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
          codes[codes[cursor + 3]] = parameters[0] < parameters[1] ? 1 : 0;
          this.cursor += 4;
          break;
        case 8: // Equals
          parameters = this.read(2, modes);
          codes[codes[cursor + 3]] = parameters[0] === parameters[1] ? 1 : 0;
          this.cursor += 4;
          break;
        case 9: // Adjust relative base
          parameters = this.read(1, modes);
          this.base += parameters[0];
          this.cursor += 2;
          // console.log("adjust !", base);
          break;
        case 99:
          console.log("Done", output);
          return this.output;
        default:
          throw new Error("Unknown operator code: " + operator);
      }
    }
  }
}

function* intcode(codes) {}

module.exports = { Computer };
