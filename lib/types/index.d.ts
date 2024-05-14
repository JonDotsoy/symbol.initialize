/**
 * Global symbol to declare initialization function
 */
export declare const SymbolInitialize: unique symbol;
export type Initializable = {
    [SymbolInitialize](): Promise<any>;
};
export declare const isInitializable: (value: unknown) => value is Initializable;
export declare const initializeOne: (value: unknown) => Promise<any> | null;
export declare const initialize: <T>(object: T) => Promise<T>;
export declare const isInitialized: (object: unknown) => boolean;
