# Contest Framework 2025

A TypeScript-based monorepo framework for competitive programming solutions that handles input/output operations and provides a clean, modular structure for your solutions.

## Features

- Monorepo structure with NX for efficient builds and dependency management
- Support for both file and console I/O
- Customizable input parsing
- Type-safe implementation
- Easy to extend with custom I/O handlers
- Built-in solution templates
- Modular solution structure
- Built-in testing framework (Jest)
- Code quality tools (ESLint, Prettier)
- Modern development environment

## Project Structure

```
.
├── apps/                 # Solution applications
│   ├── example/            # Example solution
│   └── ...
├── libs/                 # Shared libraries
│   ├── core/               # Core framework implementation
│   ├── io/                 # Input/Output handling
│   ├── parsers/            # Input parsing utilities
│   ├── utils/              # Shared utilities (constants, etc.)
│   └── impls/              # Solution implementations
├── dist/                 # Compiled output
└── node_modules/         # Dependencies
```

## Prerequisites

- Node.js (version specified in `.nvmrc`)
- Yarn (version 4.x)

## Installation

```bash
# Install dependencies
yarn install
```

## Creating a New Solution

1. Create a new solution app using NX:
```bash
nx g @nx/node:application my-solution
```

2. Implement your solution by extending the ContestFramework:
```typescript
import { ContestFramework } from '@contest/core';
import { ConsoleInputReader } from '@contest/io';

const LINES_COUNT = 2; // Number of input lines to read

class MySolution extends ContestFramework {
  protected solve(input: string[][]): unknown {
    // Your solution logic here
    // input[0] - first line split by spaces
    // input[1] - second line split by spaces
    return 'solution';
  }
}

// Run the solution
new MySolution(new ConsoleInputReader(LINES_COUNT)).run();
```

## Using Parsers

The framework provides a default parser that converts space-separated strings into arrays of numbers. You can also create custom parsers for specific input formats.

### Default Parser

The default parser splits input lines by spaces and converts each item to a number:

```typescript
import { ContestFramework } from '@contest/core';
import { ConsoleInputReader } from '@contest/io';
import { defaultParser } from '@contest/parsers';

class MySolution extends ContestFramework {
  constructor() {
    // The default parser is used automatically if not specified
    super(new ConsoleInputReader(2));
  }

  protected solve(input: number[][]): unknown {
    // Input is already parsed as numbers
    // For input "1 2 3\n4 5 6", input will be [[1, 2, 3], [4, 5, 6]]
    return input[0][0] + input[1][0]; // 1 + 4 = 5
  }
}
```

### Custom Parsers

You can create custom parsers for different input formats:

```typescript
import { ContestFramework } from '@contest/core';
import { ConsoleInputReader } from '@contest/io';
import { ParserFunction } from '@contest/parsers';

// Custom parser for comma-separated values
const commaParser: ParserFunction = (data: string): number[] => {
  return data
    .trim()
    .split(',')
    .map(Number);
};

// Custom parser that extracts words
const wordParser = (data: string): string[] => {
  return data
    .trim()
    .split(' ')
    .filter(word => word !== '');
};

class MySolution extends ContestFramework {
  constructor() {
    // Use the comma parser as the default parser
    super(new ConsoleInputReader(2), undefined, commaParser);
  }

  protected solve(input: number[][]): unknown {
    // For input "1,2,3\n4,5,6", input will be [[1, 2, 3], [4, 5, 6]]
    return input[0][0] + input[1][0]; // 1 + 4 = 5
  }
}
```

### Line-Specific Parsers

You can also use different parsers for specific lines:

```typescript
import { ContestFramework } from '@contest/core';
import { ConsoleInputReader } from '@contest/io';
import { ParserFunction } from '@contest/parsers';

// Parse first line as comma-separated numbers
const commaParser: ParserFunction = (data: string): number[] => {
  return data
    .trim()
    .split(',')
    .map(Number);
};

// Parse second line as space-separated strings
const wordParser = (data: string): string[] => {
  return data
    .trim()
    .split(' ')
    .filter(word => word !== '');
};

class MySolution extends ContestFramework {
  constructor() {
    const customParsers = {
      0: commaParser,  // Use commaParser for line 0
      1: wordParser    // Use wordParser for line 1
      // For non-provided lines, the default parser will be used
    };
    
    super(new ConsoleInputReader(2), undefined, undefined, customParsers);
  }

  protected solve(input: unknown[][]): unknown {
    // For input "1,2,3\nfoo bar baz"
    // input[0] will be [1, 2, 3] (numbers)
    // input[1] will be ["foo", "bar", "baz"] (strings)
    
    return `First number: ${input[0][0]}, First word: ${input[1][0]}`;
  }
}
```

## Building and Running Solutions

```bash
# Build a specific solution
nx build my-solution

# Run a specific solution
nx serve my-solution

# Run tests for a solution
nx test my-solution

# Run tests for all projects
nx run-many -t test

# Build all projects
nx run-many -t build
```

## Development Workflow

1. Write your solution implementation in `libs/impls/src/lib/`
2. Create tests for your implementation in the same directory
3. Create a new app in `apps/` that uses your implementation
4. Build and test your solution

## Available Libraries

- `@contest/core`: Core framework functionality
- `@contest/io`: Input/Output handling (console and file)
- `@contest/parsers`: Input parsing utilities
- `@contest/utils`: Shared utilities
- `@contest/impls`: Solution implementations

## Code Quality

```bash
# Run linting
nx lint my-solution

# Format code
nx format:write

# Check formatting
nx format:check
```

## Testing

```bash
# Run tests with coverage
nx test my-solution --coverage

# Run tests in watch mode
nx test my-solution --watch
```

## Debugging

1. Use the provided VS Code launch configurations
2. Add breakpoints in your code
3. Run the solution in debug mode

## Contributing

1. Create a feature branch
2. Make your changes
3. Write tests
4. Submit a pull request

## License

MIT License 