export default class Node {
  #data = null;
  #left = null;
  #right = null;

  constructor(data = null, left = null, right = null) {
    this.#data = data;
    this.#left = left;
    this.#right = right;
  }

  set data(newData) {
    this.#data = newData;
  }

  set left(newLeft) {
    this.#left = newLeft;
  }

  set right(newRigth) {
    this.#right = newRigth;
  }

  get data() {
    return this.#data;
  }

  get left() {
    return this.#left;
  }

  get right() {
    return this.#right;
  }
}

//should have data,left,right
///should have a getter and setter for all 3
