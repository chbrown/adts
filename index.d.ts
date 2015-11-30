/**
Bag: a multiset; i.e., a Set with counts. The underlying datatype
is a object, `._element_object`. The effective default of members
of `._element_object` is 0. Being undefined, having a value of undefined,
null, false, etc., is all equivalent to having a 0 count.

`Bag()` and `new Bag()` both return an empty bag.
*/
export declare class Bag {
    private _element_object;
    constructor(elements?: Array<string>);
}
/** new Set(elements?: string[])

Set is an abstract data type supporting methods like .add(), .merge(),
.contains(), and .equals(). It is implemented by an object with keys that
represent elements in the set. The values of the object are all boolean true's;
the value does not matter, only their presence does.

All elements are coerced to strings by object index notation.
*/
export declare class Set {
    private _element_object;
    /** Create a new Set, optionally initializing it with an Array of strings */
    constructor(elements?: string[]);
    /** Clone this set, returning the copy.
     * [immutable] */
    clone(): Set;
    /** Return an unordered Array of strings representing this Set.
     * [immutable] */
    toJSON(): string[];
    /** Add a single element to this set.
     * [mutable, chainable] */
    _add(element: string): Set;
    /** Add multiple elements to this set.
     * [mutable, chainable] */
    _addArray(elements?: string[]): Set;
    /** Add all elements from another Set.
     * [mutable, chainable] */
    _addSet(other: Set): Set;
    /** Remove a single element from this set. No-op if the element doesn't exist.
     * [mutable, chainable] */
    _remove(element: string): void;
    /** Remove multiple elements from this set.
     * [mutable, chainable] */
    _removeArray(elements: string): Set;
    /** Remove all elements from another Set.
     * [mutable, chainable] */
    _removeSet(other: Set): Set;
    /** Return a new Set representing the union of this set and the given
     * element.
     * [immutable, chainable] */
    add(element: string): Set;
    /** Return a new Set representing the union of this set and the given
     * elements.
     * [immutable, chainable] */
    addArray(elements: string[]): Set;
    /** Return a new Set representing the union of this set and another set.
     * [immutable, chainable] */
    addSet(other: Set): Set;
    /** Return a new Set representing the subtraction of the given element from
     * this Set.
     * [immutable, chainable] */
    remove(element: string): void;
    /** Return a new Set representing the subtraction of the given elements from
     * this Set.
     * [immutable, chainable] */
    removeArray(elements: string): Set;
    /** Return a new Set representing the subtraction of the given Set from
     * this Set.
     * [immutable, chainable] */
    removeSet(other: Set): Set;
    /** Pairwise set comparison. Return false at the first mismatch, otherwise
     * return true.
     *
     * new Set([1, 4, 9]).equal(new Set([9, 4, 1])) == true
     * new Set(['a', 'b', 'z']).equal(new Set(['a', 'b'])) == false
     * [immutable] */
    equals(other: Set): boolean;
    /** Check if the given element is contained in this set. */
    contains(element: string): boolean;
    /** Simply . */
    size: number;
    /** Compare an Array of Sets, returning true if they're all equal.
     */
    static equal(sets: Set[]): boolean;
    /** Return true if all the given Sets contain the given element.
     * Returns false on the first mismatch. */
    static contain(sets: Set[], element: string): boolean;
    /** Return a new Set that contains all the elements from the given Sets.
     * [immutable] */
    static union(sets: Set[]): Set;
    /** Return a new Set representing the intersection of all given Sets.
     * [immutable] */
    static intersection(sets: Set[]): Set;
}
/**
A simplified Array wrapper. Differences:

* Provides `top` and `bottom` getters/setters
* Renames `length` to `size`

When initialized with an Array, the last element in the array will be the top of
the Stack. The constructor's elements argment is optional, and defaults to an
empty array.
*/
export declare class Stack<T> {
    protected elements: T[];
    constructor(elements?: T[]);
    /**
    Returns the contents of the stack, from bottom to top.
    */
    getElements(): T[];
    /**
    Return the size (length) of the stack.
    */
    size: number;
    /**
    Add a new element to the top of the stack and return the new size of the stack.
    */
    push(element: T): number;
    /**
    Remove the element at the top of the stack and return it.
  
    Returns undefined if the stack is empty.
    */
    pop(): T;
    /**
    Retrieve the bottom element of the stack.
  
    Returns undefined if the stack is empty.
    */
    /**
    Replace the bottom element of the stack.
  
    Has the same effect as `Stack#push(element)` if the stack is empty.
    */
    bottom: T;
    /**
    Retrieve the top element of the stack.
  
    Returns undefined if the stack is empty.
    */
    /**
    Replace the top element of the stack.
  
    Has the same effect as `Stack#push(element)` if the stack is empty.
    */
    top: T;
}
