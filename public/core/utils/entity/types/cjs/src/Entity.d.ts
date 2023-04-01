export interface CustomProps {
    [key: string]: any;
}
export interface Context {
    [key: string]: any;
}
export interface EntityProps {
    parent?: Entity;
    customProps?: CustomProps;
    label?: string;
}
export declare class Entity {
    parent: Entity;
    customProps: CustomProps;
    label: string;
    private _context;
    private _cachedValueByValueKey;
    constructor(props?: EntityProps, context?: Context);
    get self(): this;
    get entityClassKey(): string;
    get context(): Object;
    setCustomProp(name: string, value: any): void;
    replaceCustomProp(name: string, value: any): void;
    setOrReplaceCustomProp(name: string, value: any): void;
    replaceContext(newContext?: {}): void;
    addToContext(newContext: object): void;
    get shortLoggingOutput(): string;
    /** Short Logging Output */
    get slo(): string;
    get mediumLoggingOutput(): string;
    /** Medium Logging Output */
    get mlo(): string;
    get longLoggingOutput(): string;
    /** Long Logging Output */
    get llo(): string;
    /** This should not change is the "business value" of the entity does not change
     * In other words, this should not contain internal ids or other things that can
     * change randomly or incrementaly  */
    get businessLoggingOutput(): string;
    get blo(): string;
    _nullifyCachedValue(key: string): void;
    _getAndSetCachedValue(key: string, computeValueFn: () => any): any;
    _getCachedValue(key: string): any;
    _setCachedValue(key: string, value: any): void;
    _nullifyAllCachedValues(): void;
}
