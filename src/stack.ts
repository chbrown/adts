/** new Stack<T>(elements?: T[])

Basically a simplified Array wrapper, with Stack#bottom and Stack#top getters.

When initialized with an Array, the last element in the array will be the top of
the Stack. The constructor's elements argment is optional, and defaults to an
empty array.
*/
export class Stack<T> {
  private _array: T[];
  constructor(elements: T[] = []) {
    this._array = elements;
  }
  /** Stack#length

  Returns size of stack.
  */
  get length(): number {
    return this._array.length;
  }
  /** Stack#push(element)

  Returns size of stack after adding element.
  */
  push(element: T): number {
    return this._array.push(element);
  }
  pop(): T {
    return this._array.pop();
  }
  get bottom(): T {
    return this._array[0];
  }
  peek(): T {
    return this._array[this._array.length - 1];
  }
  get top(): T {
    return this._array[this._array.length - 1];
  }
}
