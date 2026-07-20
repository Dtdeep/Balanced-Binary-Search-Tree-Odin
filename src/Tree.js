import Node from "./Node.js";
import mergeSort from "./mergeSort.js";
import removeDuplicatesSorted from "./removeDuplicates.js";

export default class Tree {
  #root;
  constructor(arrayOfNumbers) {
    this.#root = this.#buildTree(arrayOfNumbers);
  }

  get root() {
    return this.#root;
  }

  #sortedArrayToBSTRecur(arr, start, end) {
    if (start > end) return null;
    let mid = start + Math.floor((end - start) / 2);
    let root = new Node(arr[mid]);

    // Divide from middle element
    root.left = this.#sortedArrayToBSTRecur(arr, start, mid - 1);
    root.right = this.#sortedArrayToBSTRecur(arr, mid + 1, end);

    return root;
  }

  #buildTree(array) {
    const sortedUniqueArray = removeDuplicatesSorted(mergeSort(array));
    return this.#sortedArrayToBSTRecur(
      sortedUniqueArray,
      0,
      sortedUniqueArray.length - 1,
    );
  }
}
