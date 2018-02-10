/**
Bag: a multiset; i.e., a Set with counts. The underlying datatype
is a object, `._element_object`. The effective default of members
of `._element_object` is 0. Being undefined, having a value of undefined,
null, false, etc., is all equivalent to having a 0 count.

`Bag()` and `new Bag()` both return an empty bag.
*/
export class Bag {
  //if (counts instanceof Bag) {
  //  return counts.clone()
  //}
  //else if (elements instanceof Set) {
  //  // creating a new S from another S will create a copy
  //  elements = elements.toArray()
  //}
  private _element_object: {[index: string]: number}
  constructor(elements: Array<string> = []) {
    this._element_object = {}
    for (var i = 0, element; (element = elements[i]); i++) {
      this._element_object[element] = 1
    }
  }
  // handle overloading constructor without `new` keyword
  //if (!(this instanceof Bag)) {
  //  return new Bag(counts)
  //}

  //countOf(element) {
  //  /**
  //   * Return the number of times `element` shows up in this Bag, a.k.a., the
  //   * multiplicity of `element` */
  //  //return this._element_object[element]
  //}
  //_add(elements) {
  //  /** */
  //  //return this._element_object[element]
  //}
  //
  //static fromSet(element) {
  //  /** Return the number of times `element` shows up in this Bag, a.k.a., the
  //   multiplicity of `element` */
  //  //return this._element_object[element]
  //}
}

/** Compare two objects and return false as soon as we find a property
 * not present in both. Otherwise return true. */
function keysEqual(a: {[index: string]: any}, b: {[index: string]: any}) {
  for (var b_element in b) {
    if (!(b_element in a)) {
      return false
    }
  }
  for (var a_element in a) {
    if (!(a_element in b)) {
      return false
    }
  }
  return true
}

/** new Set(elements?: string[])

Set is an abstract data type supporting methods like .add(), .merge(),
.contains(), and .equals(). It is implemented by an object with keys that
represent elements in the set. The values of the object are all boolean true's;
the value does not matter, only their presence does.

All elements are coerced to strings by object index notation.
*/
export class Set {
  private _element_object: {[index: string]: boolean}
  /** Create a new Set, optionally initializing it with an Array of strings */
  constructor(elements?: string[]) {
    this._element_object = {}
    this._addArray(elements)
  }
  /** Clone this set, returning the copy.
   * [immutable] */
  clone() {
    var copy = new Set([])
    for (var element in this._element_object) {
      copy._element_object[element] = true
    }
    return copy
  }
  /** Return an unordered Array of strings representing this Set.
   * [immutable] */
  toJSON() {
    return Object.keys(this._element_object)
  }

  //
  // mutable methods
  //

  /** Add a single element to this set.
   * [mutable, chainable] */
  _add(element: string) {
    this._element_object[element] = true
    return this
  }
  /** Add multiple elements to this set.
   * [mutable, chainable] */
  _addArray(elements: string[] = []) {
    for (var i = 0, element; (element = elements[i]) !== undefined; i++) {
      this._element_object[element] = true
    }
    return this
  }
  /** Add all elements from another Set.
   * [mutable, chainable] */
  _addSet(other: Set) {
    for (var element in other._element_object) {
      this._element_object[element] = true
    }
    return this
  }
  /** Remove a single element from this set. No-op if the element doesn't exist.
   * [mutable, chainable] */
  _remove(element: string) {
    delete this._element_object[element]
  }
  /** Remove multiple elements from this set.
   * [mutable, chainable] */
  _removeArray(elements: string) {
    for (var i = 0, element; (element = elements[i]) !== undefined; i++) {
      delete this._element_object[element]
    }
    return this
  }
  /** Remove all elements from another Set.
   * [mutable, chainable] */
  _removeSet(other: Set) {
    for (var element in other._element_object) {
      delete this._element_object[element]
    }
    return this
  }

  //
  // immutable methods
  //

  /** Return a new Set representing the union of this set and the given
   * element.
   * [immutable, chainable] */
  add(element: string) {
    return this.clone()._add(element)
  }
  /** Return a new Set representing the union of this set and the given
   * elements.
   * [immutable, chainable] */
  addArray(elements: string[]) {
    return this.clone()._addArray(elements)
  }
  /** Return a new Set representing the union of this set and another set.
   * [immutable, chainable] */
  addSet(other: Set) {
    return this.clone()._addSet(other)
  }
  /** Return a new Set representing the subtraction of the given element from
   * this Set.
   * [immutable, chainable] */
  remove(element: string) {
    return this.clone()._remove(element)
  }
  /** Return a new Set representing the subtraction of the given elements from
   * this Set.
   * [immutable, chainable] */
  removeArray(elements: string) {
    return this.clone()._removeArray(elements)
  }
  /** Return a new Set representing the subtraction of the given Set from
   * this Set.
   * [immutable, chainable] */
  removeSet(other: Set) {
    return this.clone()._removeSet(other)
  }

  //
  // set analysis
  //

  /** Pairwise set comparison. Return false at the first mismatch, otherwise
   * return true.
   *
   * new Set([1, 4, 9]).equal(new Set([9, 4, 1])) == true
   * new Set(['a', 'b', 'z']).equal(new Set(['a', 'b'])) == false
   * [immutable] */
  equals(other: Set) {
    return keysEqual(this._element_object, other._element_object)
  }
  /** Check if the given element is contained in this set. */
  contains(element: string) {
    return element in this._element_object
  }
  /** Simply . */
  get size() {
    // TODO: use an actual property and update it whenever mutating the
    // underlying _element_object
    var count = 0
    for (var element in this._element_object) {
      count++
    }
    return count
  }

  //
  // static set operations
  //

  /** Compare an Array of Sets, returning true if they're all equal.
   */
  static equal(sets: Set[]) {
    if (sets.length == 0) return undefined // undefined
    if (sets.length == 1) return true // trivially true
    // return on the first mismatch
    var prototype_set = sets[0]
    // use a for loop to allow immediate return
    for (var i = 1, other; (other = sets[i]) !== undefined; i++) {
      var prototype_other_equal = keysEqual(prototype_set._element_object, other._element_object)
      if (!prototype_other_equal) {
        return false
      }
    }
    return true
  }
  /** Return true if all the given Sets contain the given element.
   * Returns false on the first mismatch. */
  static contain(sets: Set[], element: string) {
    for (var i = 0, set; (set = sets[i]) !== undefined; i++) {
      if (!(element in set._element_object)) {
        return false
      }
    }
    return true
  }
  /** Return a new Set that contains all the elements from the given Sets.
   * [immutable] */
  static union(sets: Set[]) {
    if (sets.length == 0) return undefined // undefined
    if (sets.length == 1) return sets[0].clone() // trivial

    var union_set = new Set([])
    for (var i = 0, set; (set = sets[i]) !== undefined; i++) {
      union_set._addSet(set)
    }
    return union_set
  }

  /** Return a new Set representing the intersection of all given Sets.
   * [immutable] */
  static intersection(sets: Set[]) {
    if (sets.length == 0) return undefined // undefined
    if (sets.length == 1) return sets[0].clone() // trivial

    // reorder sets from smallest to largest
    sets = sets.sort(function(a, b) {
      return a.size - b.size
    })
    var prototype_set = sets[0]
    var other_sets = sets.slice(1)

    var intersection_set = new Set([])
    for (var element in prototype_set._element_object) {
      var other_sets_contain_element = Set.contain(other_sets, element)
      if (other_sets_contain_element) {
        intersection_set._element_object[element] = true
      }
    }
    return intersection_set
  }
}

/**
A simplified Array wrapper. Differences:

* Provides `top` and `bottom` getters/setters
* Renames `length` to `size`

When initialized with an Array, the last element in the array will be the top of
the Stack. The constructor's elements argment is optional, and defaults to an
empty array.
*/
export class Stack<T> {
  constructor(protected elements: T[] = []) { }
  /**
  Returns the contents of the stack, from bottom to top.
  */
  getElements(): T[] {
    return this.elements
  }
  /**
  Return the size (length) of the stack.
  */
  get size(): number {
    return this.elements.length
  }
  /**
  Add a new element to the top of the stack and return the new size of the stack.
  */
  push(element: T): number {
    return this.elements.push(element)
  }
  /**
  Remove the element at the top of the stack and return it.

  Returns undefined if the stack is empty.
  */
  pop(): T {
    return this.elements.pop()
  }
  /**
  Retrieve the bottom element of the stack.

  Returns undefined if the stack is empty.
  */
  get bottom(): T {
    return this.elements[0]
  }
  /**
  Replace the bottom element of the stack.

  Has the same effect as `Stack#push(element)` if the stack is empty.
  */
  set bottom(element: T) {
    this.elements[0] = element
  }
  /**
  Retrieve the top element of the stack.

  Returns undefined if the stack is empty.
  */
  get top(): T {
    return this.elements[this.elements.length - 1]
  }
  /**
  Replace the top element of the stack.

  Has the same effect as `Stack#push(element)` if the stack is empty.
  */
  set top(element: T) {
    var index = Math.max(this.elements.length - 1, 0)
    this.elements[index] = element
  }
}
