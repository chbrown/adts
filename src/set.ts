/** Compare two objects and return false as soon as we find a property
 * not present in both. Otherwise return true. */
function keysEqual(a: {[index: string]: any}, b: {[index: string]: any}) {
  for (var b_element in b) {
    if (!(b_element in a)) {
      return false;
    }
  }
  for (var a_element in a) {
    if (!(a_element in b)) {
      return false;
    }
  }
  return true;
}

/** new Set(elements?: string[])

Set is an abstract data type supporting methods like .add(), .merge(),
.contains(), and .equals(). It is implemented by an object with keys that
represent elements in the set. The values of the object are all boolean true's;
the value does not matter, only their presence does.

All elements are coerced to strings by object index notation.
*/
export class Set {
  private _element_object: {[index: string]: boolean};
  /** Create a new Set, optionally initializing it with an Array of strings */
  constructor(elements?: string[]) {
    this._element_object = {};
    this._addArray(elements);
  }
  /** Clone this set, returning the copy.
   * [immutable] */
  clone() {
    var copy = new Set([]);
    for (var element in this._element_object) {
      copy._element_object[element] = true;
    }
    return copy;
  }
  /** Return an unordered Array of strings representing this Set.
   * [immutable] */
  toJSON() {
    return Object.keys(this._element_object);
  }

  //
  // mutable methods
  //

  /** Add a single element to this set.
   * [mutable, chainable] */
  _add(element: string) {
    this._element_object[element] = true;
    return this;
  }
  /** Add multiple elements to this set.
   * [mutable, chainable] */
  _addArray(elements: string[]) {
    for (var i = 0, element; (element = elements[i]) !== undefined; i++) {
      this._element_object[element] = true;
    }
    return this;
  }
  /** Add all elements from another Set.
   * [mutable, chainable] */
  _addSet(other: Set) {
    for (var element in other._element_object) {
      this._element_object[element] = true;
    }
    return this;
  }
  /** Remove a single element from this set. No-op if the element doesn't exist.
   * [mutable, chainable] */
  _remove(element: string) {
    delete this._element_object[element];
  }
  /** Remove multiple elements from this set.
   * [mutable, chainable] */
  _removeArray(elements: string) {
    for (var i = 0, element; (element = elements[i]) !== undefined; i++) {
      delete this._element_object[element];
    }
    return this;
  }
  /** Remove all elements from another Set.
   * [mutable, chainable] */
  _removeSet(other: Set) {
    for (var element in other._element_object) {
      delete this._element_object[element];
    }
    return this;
  }

  //
  // immutable methods
  //

  /** Return a new Set representing the union of this set and the given
   * element.
   * [immutable, chainable] */
  add(element: string) {
    return this.clone()._add(element);
  }
  /** Return a new Set representing the union of this set and the given
   * elements.
   * [immutable, chainable] */
  addArray(elements: string[]) {
    return this.clone()._addArray(elements);
  }
  /** Return a new Set representing the union of this set and another set.
   * [immutable, chainable] */
  addSet(other: Set) {
    return this.clone()._addSet(other);
  }
  /** Return a new Set representing the subtraction of the given element from
   * this Set.
   * [immutable, chainable] */
  remove(element: string) {
    return this.clone()._remove(element);
  }
  /** Return a new Set representing the subtraction of the given elements from
   * this Set.
   * [immutable, chainable] */
  removeArray(elements: string) {
    return this.clone()._removeArray(elements);
  }
  /** Return a new Set representing the subtraction of the given Set from
   * this Set.
   * [immutable, chainable] */
  removeSet(other: Set) {
    return this.clone()._removeSet(other);
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
    return keysEqual(this._element_object, other._element_object);
  }
  /** Check if the given element is contained in this set. */
  contains(element: string) {
    return element in this._element_object;
  }
  /** Simply . */
  get size() {
    // TODO: use an actual property and update it whenever mutating the
    // underlying _element_object
    var count = 0;
    for (var element in this._element_object) {
      count++;
    }
    return count;
  }

  //
  // static set operations
  //

  /** Compare an Array of Sets, returning true if they're all equal.
   */
  static equal(sets: Set[]) {
    if (sets.length == 0) return undefined; // undefined
    if (sets.length == 1) return true; // trivially true
    // return on the first mismatch
    var prototype_set = sets[0];
    // use a for loop to allow immediate return
    for (var i = 1, other; (other = sets[i]) !== undefined; i++) {
      var prototype_other_equal = keysEqual(prototype_set._element_object, other._element_object);
      if (!prototype_other_equal) {
        return false;
      }
    }
    return true;
  }
  /** Return true if all the given Sets contain the given element.
   * Returns false on the first mismatch. */
  static contain(sets: Set[], element: string) {
    for (var i = 0, set; (set = sets[i]) !== undefined; i++) {
      if (!(element in set._element_object)) {
        return false;
      }
    }
    return true;
  }
  /** Return a new Set that contains all the elements from the given Sets.
   * [immutable] */
  static union(sets: Set[]) {
    if (sets.length == 0) return undefined; // undefined
    if (sets.length == 1) return sets[0].clone(); // trivial

    var union_set = new Set([]);
    for (var i = 0, set; (set = sets[i]) !== undefined; i++) {
      union_set._addSet(set);
    }
    return union_set;
  }

  /** Return a new Set representing the intersection of all given Sets.
   * [immutable] */
  static intersection(sets: Set[]) {
    if (sets.length == 0) return undefined; // undefined
    if (sets.length == 1) return sets[0].clone(); // trivial

    // reorder sets from smallest to largest
    sets = sets.sort(function(a, b) {
      return a.size - b.size;
    });
    var prototype_set = sets[0];
    var other_sets = sets.slice(1);

    var intersection_set = new Set([]);
    for (var element in prototype_set._element_object) {
      var other_sets_contain_element = Set.contain(other_sets, element);
      if (other_sets_contain_element) {
        intersection_set._element_object[element] = true;
      }
    }
    return intersection_set;
  }
}
