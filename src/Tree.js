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

  #getSuccessor(currentRoot = this.root) {
    currentRoot = currentRoot.right;
    while (currentRoot !== null && currentRoot.left !== null) {
      currentRoot = currentRoot.left;
    }
    return currentRoot;
  }

  deleteItem(value, root = this.root) {
    if (root === null) {
      return root;
    }

    if (root.data > value) {
      root.left = this.deleteItem(value, root.left);
    } else if (root.data < value) {
      root.right = this.deleteItem(value, root.right);
    } else {
      if (root.left === null) {
        return root.right;
      }
      if (root.right === null) {
        return root.left;
      }

      const successor = this.#getSuccessor(root);
      root.data = successor.data;
      root.right = this.deleteItem(successor.data, successor);
    }

    return root;
  }

  levelOrderForEach(callback) {
    if (callback == undefined) throw new Error("Callback function is required");
    const queue = [this.root];

    while (queue.length !== 0) {
      const currentNode = queue.shift();
      if (currentNode == null) continue;
      callback(currentNode);
      queue.push(currentNode.left);
      queue.push(currentNode.right);
    }
  }

  preOrderForEach(callback, rootNode = this.root) {
    if (callback == undefined) throw new Error("Callback function is required");

    if (rootNode == null) return;
    callback(rootNode);
    this.preOrderForEach(callback, rootNode.left);
    this.preOrderForEach(callback, rootNode.right);
  }

  inOrderForEach(callback, rootNode = this.root) {
    if (callback == undefined) throw new Error("Callback function is required");

    if (rootNode == null) return;
    this.inOrderForEach(callback, rootNode.left);
    callback(rootNode);
    this.inOrderForEach(callback, rootNode.right);
  }

  postOrderForEach(callback, rootNode = this.root) {
    if (callback == undefined) throw new Error("Callback function is required");

    if (rootNode == null) return;
    this.postOrderForEach(callback, rootNode.left);
    this.postOrderForEach(callback, rootNode.right);
    callback(rootNode);
  }

  #findHeight(rootNode) {
    if (rootNode == null) return -1;

    const leftHeight = this.#findHeight(rootNode.left);
    const rightHeight = this.#findHeight(rootNode.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  #findNode(data, root = this.#root) {
    if (root == null) return null;
    if (root.data == data) return root;
    if (data < root.data) {
      return this.#findNode(data, root.left);
    }
    if (data > root.data) {
      return this.#findNode(data, root.right);
    }

    return root;
  }

  height(value = null) {
    if (value == null) return this.#findHeight(this.root);
    if (!this.includes(value)) return undefined;
    const nodeToFind = this.#findNode(value);
    return this.#findHeight(nodeToFind);
  }

  #findDepth(value, root = this.root) {
    if (root == null) return undefined;
    let depth = 0;
    if (root.data == value) return depth;
    if (value < root.data) {
      depth += this.#findDepth(value, root.left) + 1;
    }

    if (value > root.data) {
      depth += this.#findDepth(value, root.right) + 1;
    }

    return depth;
  }

  depth(value) {
    if (!this.includes(value)) return undefined;
    return this.#findDepth(value);
  }

  isBalanced() {
    let isBalanced = true;

    this.postOrderForEach((currentNode) => {
      const rightHeight = this.#findHeight(currentNode.right);
      const leftHeight = this.#findHeight(currentNode.left);
      const difference = Math.abs(rightHeight - leftHeight);

      if (difference > 1) {
        isBalanced = false;
      }
    });

    return isBalanced;
  }

  reBalance() {
    const newArray = [];
    this.inOrderForEach((currentNode) => {
      newArray.push(currentNode.data);
    });
    this.#root = this.#buildTree(newArray);
  }
}

const tree = new Tree([5, 5, 8, 46, 89, 44, 99, 67]);

console.log(tree.isBalanced());
console.log("--- level order ---");
tree.levelOrderForEach((currentNode) => {
  console.log(currentNode.data);
});
console.log("---  preOrder ---");
tree.preOrderForEach((currentNode) => {
  console.log(currentNode.data);
});
console.log("---  postOrder ---");
tree.postOrderForEach((currentNode) => {
  console.log(currentNode.data);
});
console.log("---  inOrder ---");
tree.inOrderForEach((currentNode) => {
  console.log(currentNode.data);
});
console.log("---  ENDD ---");

tree.insert(103);
tree.insert(5464);
tree.insert(567);
tree.insert(444);
tree.insert(180);
console.log("b4 rebalace", tree.isBalanced());
tree.reBalance();
console.log("after rebalance", tree.isBalanced());

console.log("--- level order ---");
tree.levelOrderForEach((currentNode) => {
  console.log(currentNode.data);
});
console.log("---  preOrder ---");
tree.preOrderForEach((currentNode) => {
  console.log(currentNode.data);
});
console.log("---  postOrder ---");
tree.postOrderForEach((currentNode) => {
  console.log(currentNode.data);
});
console.log("---  inOrder ---");
tree.inOrderForEach((currentNode) => {
  console.log(currentNode.data);
});
console.log("---  ENDD ---");
