class Computer {
  constructor(codes, input, output) {
    this.memory = codes.reduce(
      (result, code, index) => ((result[index] = code), result),
      {}
    );
    this.input = input;
    this.output = output;
    this.cursor = -1;
    this.modes = [];
    this.base = 0;
    this.halted = false;
  }

  eof() {
    return !this.memory.hasOwnProperty(this.cursor + 1);
  }

  halt() {
    this.halted = true;
  }

  next() {
    if (this.eof()) {
      throw new Error("EOF");
    }
    return this.memory[++this.cursor];
  }

  nextCommand() {
    let code = this.next();
    const operator = code % 100;
    this.modes = [];
    let mode = Math.floor(code / 100);
    do {
      this.modes.push(mode % 10);
      mode = Math.floor(mode / 10);
    } while (mode);
    return operator;
  }

  nextValue() {
    let mode = this.modes.shift() || 0;
    let value = this.next();
    switch (mode) {
      case 2: // Relative mode
        return this.memory[this.base + value] || 0;
      case 1: // Immediate mode
        return value;
      case 0: // Position mode
        return this.memory[value] || 0;
      default:
        throw new Error(`Unexpected mode ${mode} at position ${this.cursor}`);
    }
  }

  nextPosition() {
    let mode = this.modes.shift() || 0;
    let value = this.next();
    switch (mode) {
      case 2: // Relative mode
        return this.base + value;
      case 1: // Immediate mode
        throw new Error(
          `Immediate mode is not supported at position ${this.cursor}`
        );
      case 0: // Position mode
        return value;
      default:
        throw new Error(`Unexpected mode ${mode} at position ${this.cursor}`);
    }
  }

  runOperation(callback) {
    let first = this.nextValue();
    let second = this.nextValue();
    let target = this.nextPosition();
    this.memory[target] = callback(first, second);
  }

  executeJump(callback) {
    let argument = this.nextValue();
    let value = this.nextValue();
    if (callback(argument)) {
      this.cursor = value - 1;
    }
  }

  operations = {
    // Addition
    1: () => {
      this.runOperation((x, y) => x + y);
    },
    // Multiplication
    2: () => {
      this.runOperation((x, y) => x * y);
    },
    // Input
    3: () => {
      let target = this.nextPosition();
      this.memory[target] = this.input();
    },
    // Output
    4: () => {
      this.output(this.nextValue());
    },
    // Jump if true
    5: () => {
      this.executeJump(Boolean);
    },
    // Jump if false
    6: () => {
      this.executeJump(x => !x);
    },
    // Less than
    7: () => {
      this.runOperation((x, y) => (x < y ? 1 : 0));
    },
    // Equals
    8: () => {
      this.runOperation((x, y) => (x === y ? 1 : 0));
    },
    // Adjust relative base
    9: () => {
      this.base += this.nextValue();
    },
  };

  run(input, output) {
    this.input = input;
    this.output = output;
    while (!this.halted && !this.eof()) {
      let command = this.nextCommand();
      if (command === 99) {
        return;
      } else {
        this.operations[command]();
      }
    }
  }
}

module.exports = { Computer };
