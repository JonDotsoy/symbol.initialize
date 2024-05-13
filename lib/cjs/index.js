"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInitialized =
  exports.initialize =
  exports.initializeOne =
  exports.isInitializable =
  exports.SymbolInitialize =
    void 0;
/**
 * Global symbol to declare initialization function
 */
exports.SymbolInitialize = Symbol("Symbol.initialize");
/**
 * Weak memory to known object initialized
 */
const objectInitialized = new WeakMap();
const isInitializable = (value) =>
  typeof value === "object" &&
  value !== null &&
  Reflect.has(value, exports.SymbolInitialize) &&
  typeof Reflect.get(value, exports.SymbolInitialize) === "function";
exports.isInitializable = isInitializable;
const initializeOne = (value) => {
  if ((0, exports.isInitializable)(value)) {
    const currentInitialization = objectInitialized.get(value);
    /** Prevent multi calls */
    if (currentInitialization) return currentInitialization;
    const initialization = Promise.resolve(value[exports.SymbolInitialize]());
    objectInitialized.set(value, initialization);
    return initialization;
  }
  return null;
};
exports.initializeOne = initializeOne;
const initialize = async (object) => {
  await (0, exports.initializeOne)(object);
  return object;
};
exports.initialize = initialize;
const isInitialized = (object) => {
  if ((0, exports.isInitializable)(object)) {
    return objectInitialized.has(object);
  }
  return false;
};
exports.isInitialized = isInitialized;
