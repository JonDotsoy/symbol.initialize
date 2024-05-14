/**
 * Global symbol to declare initialization function
 */
export const SymbolInitialize = Symbol("Symbol.initialize");
/**
 * Weak memory to known object initialized
 */
const objectInitialized = new WeakMap();
export const isInitializable = (value) => typeof value === "object" &&
    value !== null &&
    Reflect.has(value, SymbolInitialize) &&
    typeof Reflect.get(value, SymbolInitialize) === "function";
export const initializeOne = (value) => {
    if (isInitializable(value)) {
        const currentInitialization = objectInitialized.get(value);
        /** Prevent multi calls */
        if (currentInitialization)
            return currentInitialization;
        const initialization = Promise.resolve(value[SymbolInitialize]());
        objectInitialized.set(value, initialization);
        return initialization;
    }
    return null;
};
export const initialize = async (object) => {
    await initializeOne(object);
    return object;
};
export const isInitialized = (object) => {
    if (isInitializable(object)) {
        return objectInitialized.has(object);
    }
    return false;
};
