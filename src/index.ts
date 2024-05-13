/**
 * Global symbol to declare initialization function
 */
export const SymbolInitialize = Symbol("Symbol.initialize");

/**
 * Weak memory to known object initialized
 */
const objectInitialized = new WeakMap<WeakKey, Promise<any>>();

export type Initializable = {
  [SymbolInitialize](): Promise<any>;
};

export const isInitializable = (value: unknown): value is Initializable =>
  typeof value === "object" &&
  value !== null &&
  Reflect.has(value, SymbolInitialize) &&
  typeof Reflect.get(value, SymbolInitialize) === "function";

export const initializeOne = (value: unknown) => {
  if (isInitializable(value)) {
    const currentInitialization = objectInitialized.get(value);
    /** Prevent multi calls */
    if (currentInitialization) return currentInitialization;
    const initialization = Promise.resolve(value[SymbolInitialize]());
    objectInitialized.set(value, initialization);
    return initialization;
  }
  return null;
};

export const initialize = async <T>(object: T) => {
  await initializeOne(object);
  return object;
};

export const isInitialized = (object: unknown) => {
  if (isInitializable(object)) {
    return objectInitialized.has(object);
  }
  return false;
};
