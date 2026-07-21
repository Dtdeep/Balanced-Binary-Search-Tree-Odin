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

describe("Testing Tree Class' methods", () => {
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
});
