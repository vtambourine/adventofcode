class Computer {
  constructor(codes, getInput, logOutput) {
    this.memory = codes.reduce((result, code, index) => {
      result[index] = code;
      return result;
    }, {});
    this.getInput = getInput;
    this.logOutput = logOutput;
    this.cursor = -1;
    this.modes = [];
    this.relativeBase = 0;
  }

  eof() {
    return !this.memory.hasOwnProperty(this.cursor + 1);
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
      case 2: // relative mode
        return this.memory[this.relativeBase + value] || 0;
      case 1: // immediate mode
        return value;
      case 0: // positional mode
        return this.memory[value] || 0;
      default:
        throw new Error(`Unexpected mode ${mode} at position ${this.cursor}`);
    }
  }

  nextPosition() {
    let mode = this.modes.shift() || 0;
    let value = this.next();
    switch (mode) {
      case 2: // relative mode
        return this.relativeBase + value;
      case 1: // immediate mode
        throw new Error(
          `Immediate mode is not supported at position ${this.cursor}`
        );
      case 0: // positional mode
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
    1: () => {
      this.runOperation((x, y) => x + y);
    },
    2: () => {
      this.runOperation((x, y) => x * y);
    },
    3: () => {
      // input
      let target = this.nextPosition();
      this.memory[target] = this.getInput();
    },
    4: () => {
      // output
      this.logOutput(this.nextValue());
    },
    5: () => {
      // jump if true
      this.executeJump(Boolean);
    },
    6: () => {
      // jump if false
      this.executeJump(x => !x);
    },
    7: () => {
      // less than
      this.runOperation((x, y) => (x < y ? 1 : 0));
    },
    8: () => {
      // equals
      this.runOperation((x, y) => (x === y ? 1 : 0));
    },
    9: () => {
      // adjust
      this.relativeBase += this.nextValue();
    },
  };

  run() {
    while (!this.eof()) {
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
