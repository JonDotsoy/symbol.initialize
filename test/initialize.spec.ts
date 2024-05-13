import { test, expect } from "bun:test";
import {
  SymbolInitialize,
  initialize,
  isInitialized,
  isInitializable,
} from "../src/index.js";

test("async return same object when initilize function is called", async () => {
  class M {
    async [SymbolInitialize]() {}
  }
  const m = new M();
  const r = await initialize(m);

  expect(r).toEqual(m);
});

test("should initialize object just one time", async () => {
  const calls: any[] = [];
  class M {
    async [SymbolInitialize]() {
      calls.push(1);
    }
  }
  const m = new M();

  // Multiple initialization
  await initialize(m);
  await initialize(m);
  await initialize(m);
  await initialize(m);

  expect(calls).toHaveLength(1);
});

test("should try to initialize any objects without problems", async () => {
  await initialize({ [SymbolInitialize]: 3 });
  await initialize(3);
  await initialize(null);
  await initialize(undefined);
  await initialize("");
  await initialize([]);
  await initialize(Symbol("foo"));
});

test("isInitialized function should return true", async () => {
  const o = { [SymbolInitialize]: () => {} };
  await initialize(o);

  expect(isInitialized(o)).toBeTrue();
  expect(isInitialized({})).toBeFalse();
});

test("isInitializable function should return true", async () => {
  const o = { [SymbolInitialize]: () => {} };

  expect(isInitializable(o)).toBeTrue();
  expect(isInitializable({})).toBeFalse();
});
