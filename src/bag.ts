export class Bag {
  /**
  Bag: a multiset; i.e., a Set with counts. The underlying datatype
  is a object, `._element_object`. The effective default of members
  of `._element_object` is 0. Being undefined, having a value of undefined,
  null, false, etc., is all equivalent to having a 0 count.

  `Bag()` and `new Bag()` both return an empty bag.
  */
  // handle overloading constructor without `new` keyword
  //if (!(this instanceof Bag)) {
  //  return new Bag(counts);
  //}

  //if (counts instanceof Bag) {
  //  return counts.clone();
  //}
  //else if (elements instanceof Set) {
  //  // creating a new S from another S will create a copy
  //  elements = elements.toArray();
  //}
  private _element_object: {[index: string]: number};
  constructor(elements: Array<string> = []) {
    this._element_object = {};
    for (var i = 0, element; (element = elements[i]); i++) {
      this._element_object[element] = 1;
    }
  }

  //countOf(element) {
  //  /**
  //   * Return the number of times `element` shows up in this Bag, a.k.a., the
  //   * multiplicity of `element` */
  //  //return this._element_object[element];
  //}
  //_add(elements) {
  //  /** */
  //  //return this._element_object[element];
  //}
  //
  //static fromSet(element) {
  //  /** Return the number of times `element` shows up in this Bag, a.k.a., the
  //   multiplicity of `element` */
  //  //return this._element_object[element];
  //}
}
