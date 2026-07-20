import Tree from "./Tree.js";

describe("Testing the Tree Class' Initialized Tree of Nodes", () => {
  test("Creation of tree should return the root Node", () => {
    const tree1 = new Tree([1]);
    expect(tree1.root.data).toBe(1);
    expect(tree1.root.left).toBe(null);
    expect(tree1.root.right).toBe(null);
  });
});
