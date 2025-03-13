# Contest Framework

A TypeScript framework for competitive programming solutions that handles input/output operations and provides a clean structure for your solutions.

## Features

- Support for both file and console I/O
- Customizable input parsing
- Type-safe implementation
- Easy to extend with custom I/O handlers
- Built-in factory for quick setup

## Installation

```bash
npm install contest-framework
```

## Usage

### Basic Usage

```typescript
import { ContestFramework, ioHandlers } from "contest-framework";

class Solution extends ContestFramework {
  constructor() {
    const { input, output } = ioHandlers["console"];
    super(2, input, output); // 2 is the number of input lines
  }

  protected solve(input: number[][]): unknown {
    // Your solution goes here
    // input[0] - first line of input
    // input[1] - second line of input
    return input;
  }
}

// Run the solution
new Solution().run();
```

### Using the Factory

```typescript
import { ContestFrameworkFactory } from "contest-framework";

class Solution extends ContestFrameworkFactory.create(2, "file") {
  protected solve(input: number[][]): unknown {
    // Your solution goes here
    return input;
  }
}

// Run the solution
new Solution().run();
```

### Custom Parsers

```typescript
import { ContestFramework, ioHandlers, ParserFunction } from "contest-framework";

const customParser: ParserFunction = (data: string) => 
  data.split(",").map(Number);

class Solution extends ContestFramework {
  constructor() {
    const { input, output } = ioHandlers["console"];
    super(2, input, output, customParser);
  }

  protected solve(input: number[][]): unknown {
    return input;
  }
}
```

### Custom I/O Handlers

```typescript
import { InputReader, OutputWriter } from "contest-framework";

class CustomInputReader implements InputReader {
  read(): string[] {
    // Your custom input logic
  }
}

class CustomOutputWriter implements OutputWriter {
  write(data: unknown): void {
    // Your custom output logic
  }
}

class Solution extends ContestFramework {
  constructor() {
    super(2, new CustomInputReader(), new CustomOutputWriter());
  }

  protected solve(input: number[][]): unknown {
    return input;
  }
}
```

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test
```

## License

MIT 