declare module "adts" {
    class Bag {
        /**
        Bag: a multiset; i.e., a Set with counts. The underlying datatype
        is a object, `._element_object`. The effective default of members
        of `._element_object` is 0. Being undefined, having a value of undefined,
        null, false, etc., is all equivalent to having a 0 count.
    
        `Bag()` and `new Bag()` both return an empty bag.
        */
        private _element_object;
        constructor(elements?: string[]);
    }
}
declare module "adts" {
    class Set {
        /**
         S = Set: a helper around an object with keys that represent elements in the set.
         The values of the object are all true; they do not really matter.
         This object is available at the private member `._element_object`.
    
         S(), S([]), new S(), and new S([]) will all return the empty set.
    
         */
        private _element_object;
        constructor(elements?: string[]);
        _add(element: string): void;
        add(element: string): Set;
        _merge(other_set: Set): void;
        _remove(element: string): void;
        equal(other_set: Set): boolean;
        contains(element: any): boolean;
        toArray(): string[];
        static union(sets: Set[]): Set;
        static equal(sets: Set[]): boolean;
    }
}
declare module "adts" {
    class Stack<T> {
        /** Stack is mostly an impoverished Array wrapper,
        but with a .top helper */
        private _array;
        constructor();
        length: number;
        push(item: T): void;
        pop(): T;
        root: T;
        top: T;
    }
}
