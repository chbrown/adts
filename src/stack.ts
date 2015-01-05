export class Stack<T> {
  /** Stack is mostly an impoverished Array wrapper,
  but with a .top helper */
  private _array: Array<T>;
  constructor() {
    this._array = [];
  }
  get length(): number {
    return this._array.length;
  }
  push(item: T): void {
    this._array.push(item);
  }
  pop(): T {
    return this._array.pop();
  }
  get root(): T {
    return this._array[0];
  }
  get top(): T {
    return this._array[this._array.length - 1];
  }
}
