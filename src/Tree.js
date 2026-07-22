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
    if (start > end) {
      return null;
    }
    let mid = Math.floor((end + start) / 2);
    const node = new Node(arr[mid]);

    node.left = this.#sortedArrayToBSTRecur(arr, start, mid - 1);
    node.right = this.#sortedArrayToBSTRecur(arr, mid + 1, end);

    return node;
  }
  #buildTree(array) {
    const sortedUniqueArray = removeDuplicatesSorted(mergeSort(array));
    return this.#sortedArrayToBSTRecur(
      sortedUniqueArray,
      0,
      sortedUniqueArray.length - 1,
    );
  }

  prettyPrint(node = this.#root, prefix = "", isLeft = true) {
    if (node === null || node === undefined) {
      return;
    }

    this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }

  includes(data, root = this.#root) {
    if (root == null) return false;
    if (root.data == data) return true;
    if (data < root.data) {
      return this.includes(data, root.left);
    }
    if (data > root.data) {
      return this.includes(data, root.right);
    }

    return false;
  }

  insert(data, root = this.#root) {
    if (this.#root == null) {
      this.#root = new Node(data);
      return;
    }
    if (this.includes(data)) return;

    if (root == null) return new Node(data);

    if (data < root.data) {
      root.left = this.insert(data, root.left);
    }
    if (data > root.data) {
      root.right = this.insert(data, root.right);
    }

    return root;
  }
}

const emptyTree = new Tree();
emptyTree.insert(3);
emptyTree.insert(2);
emptyTree.insert(1);

emptyTree.prettyPrint();
