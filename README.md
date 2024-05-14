# symbol.initialize

A javascript solution to initialize pending objects. This package provide of a function `initialize(object)` than call just one time the `[SymbolInitialize]` function.

```ts
import { SymbolInitialize, initialize } from "symbol.initialize";

class MyConnection {
  async [SymbolInitialize]() {
    this.connection = await connect();
  }
}

const connection = new MyConnection();

await initialize(connection); // 🪩
```

Or inline initialization

```ts
const connection = await initialize(new MyConnection());
```

## Install

```shell
npm i @jondotsoy/symbol.initialize
```

## Contributing Guide

See [CONTRIBUTING.md](./CONTRIBUTING.md)
