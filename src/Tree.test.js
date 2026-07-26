import Tree from "./Tree.js";

describe("Testing the Tree Class' Initialized Tree of Nodes", () => {
  test("Creation of tree should return the root Node", () => {
    const tree = new Tree([1]);
    expect(tree.root.data).toBe(1);
    expect(tree.root.left).toBe(null);
    expect(tree.root.right).toBe(null);
  });

  test("Tree class works on 3 numbers in an array", () => {
    const tree = new Tree([1, 2, 3]);
    expect(tree.root.data).toBe(2);
    expect(tree.root.left.data).toBe(1);
    expect(tree.root.right.data).toBe(3);
  });

  test("Tree class works on large number of arrays unsorted and with duplicates", () => {
    const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
    expect(tree.root.data).toBe(8);
    expect(tree.root.right.right.right.data).toBe(6345);
    expect(tree.root.left.left.right.data).toBe(3);
  });
});

describe("Testing Tree Class' query methods", () => {
  let tree;
  beforeEach(() => {
    tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
  });

  test("includes(data) works when the value is the root", () => {
    const tree2 = new Tree([100]);
    expect(tree.includes(8)).toBe(true);
    expect(tree2.includes(100)).toBe(true);
  });

  test("inlcudes(data) works when value is a leaf", () => {
    const tree2 = new Tree([50, 25, 100]);
    expect(tree2.includes(100)).toBe(true);
    expect(tree2.includes(25)).toBe(true);
    expect(tree.includes(6345)).toBe(true);
    expect(tree.includes(3)).toBe(true);
  });

  test("includes(data) works when value is anywhere in the Tree", () => {
    const tree2 = new Tree([50, 100, 25, 0]);
    expect(tree2.includes(50)).toBe(true);
    expect(tree.includes(324)).toBe(true);
    expect(tree.includes(1)).toBe(true);
  });

  test("includes(data) returns false when value is not in the Tree", () => {
    expect(tree.includes(293241)).toBe(false);
    expect(tree.includes(99)).toBe(false);
  });

  test("height returns undefined when value is not in the tree", () => {
    expect(tree.height(3245235235)).toBe(undefined);
  });

  test("height() returns the height of the Tree", () => {
    const treeHeight = new Tree([100]);
    expect(tree.height()).toBe(3);
    expect(treeHeight.height()).toBe(0);
  });

  test("height(value) returns the height of the root node with the given value", () => {
    expect(tree.height(67)).toBe(2);
  });
  test("depth(value) returns the depth of the node that has the given value [1]", () => {
    expect(tree.depth(67)).toBe(1);
  });
  test("depth(value) returns the depth of the node that has the given value [2]", () => {
    expect(tree.depth(9)).toBe(2);
  });
  test("depth(value) returns the depth of the node that has the given value [3]", () => {
    expect(tree.depth(7)).toBe(3);
  });

  test("isBalanced() work properly 1", () => {
    const treeE = new Tree([1, 7, 4]);
    treeE.insert(6);
    treeE.insert(8);
    expect(treeE.isBalanced()).toBe(true);
    treeE.insert(9);
    expect(treeE.isBalanced()).toBe(false);
  });

  test("isBalanced() work properly 2", () => {
    const treeS = new Tree([5]);
    treeS.insert(3);
    treeS.insert(8);
    treeS.insert(2);
    treeS.insert(7);
    treeS.insert(9);
    treeS.insert(1);
    expect(treeS.isBalanced()).toBe(false);
  });
});

describe("Testing Tree Class' command methods", () => {
  let deletionTesting;
  let emptyTree;
  beforeEach(() => {
    deletionTesting = new Tree([1, 2, 3]);
    emptyTree = new Tree();
  });
  test("insert(data) makes a new root if root is null", () => {
    emptyTree.insert(100);
    expect(emptyTree.root.data).toBe(100);
  });

  test("insert(data) creates a left node when it is lower than root", () => {
    emptyTree.insert(3);
    emptyTree.insert(2);
    emptyTree.insert(1);
    expect(emptyTree.root.left.data).toBe(2);
    expect(emptyTree.root.left.left.data).toBe(1);
  });

  test("insert(data) creates a left node when it is lower than root", () => {
    emptyTree.insert(5);
    emptyTree.insert(6);
    emptyTree.insert(7);
    expect(emptyTree.root.right.data).toBe(6);
    expect(emptyTree.root.right.right.data).toBe(7);
  });

  test("insert(data) should do nothing if the data inserted is already in the tree", () => {
    emptyTree.insert(5);
    emptyTree.insert(5);
    expect(emptyTree.root.data).toBe(5);
    expect(emptyTree.root.left).toBe(null);
    expect(emptyTree.root.right).toBe(null);
  });

  test("deleteItem(data) should be able to delete a leaf", () => {
    deletionTesting.deleteItem(1);
    deletionTesting.deleteItem(3);

    expect(deletionTesting.root.left).toBe(null);
    expect(deletionTesting.root.right).toBe(null);
  });

  test("deleteItem(data) should be able to delete a node with one child", () => {
    const deletionTesting2 = new Tree([2, 4, 6]);
    deletionTesting2.insert(5);
    deletionTesting2.deleteItem(6);
    expect(deletionTesting2.root.right.data).toBe(5);
  });

  test("deleteItem(data) should be able to delete a node with two child", () => {
    deletionTesting.deleteItem(2);
    expect(deletionTesting.root.data).toBe(3);
  });

  test("deleteItem(data) should be able to delete a node anywhere in the Tree", () => {
    const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
    tree.deleteItem(67);
    expect(tree.root.right.data).toBe(324);
  });

  test("deleteItem(data) should be able to delete a node anywhere in the Tree", () => {
    const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
    tree.deleteItem(4);
    expect(tree.root.left.data).toBe(5);
  });

  test("levelOrderForEach(callback) should return an error if no callback funciton is given", () => {
    expect(() => {
      emptyTree.levelOrderForEach();
    }).toThrow(Error);
  });

  test("levelOrderForEach(callback) should traverse", () => {
    const arrayTest = [];
    deletionTesting.levelOrderForEach((currentNode) => {
      arrayTest.push(currentNode.data);
    });
    expect(arrayTest).toEqual([2, 1, 3]);
  });

  test("levelOrderForEach(callback) should traverse a long Balanced BST", () => {
    const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
    const arrayTest = [];
    tree.levelOrderForEach((currentNode) => {
      arrayTest.push(currentNode.data);
    });
    expect(arrayTest).toEqual([8, 4, 67, 1, 5, 9, 324, 3, 7, 23, 6345]);
  });
});
