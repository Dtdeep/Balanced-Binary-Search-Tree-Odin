import Node from "./Node.js";

describe("Testing Node methods", () => {
  let node1;
  let node2;
  let node3;
  beforeEach(() => {
    node1 = new Node(5);
    node2 = new Node(4);
    node3 = new Node(3);
  });

  test("1 get Data method should return the right data", () => {
    expect(node1.data).toBe(5);
    expect(node2.data).toBe(4);
    expect(node3.data).toBe(3);
  });

  test("2 set Data method should edit the Node's data", () => {
    node1.data = "Mikay";
    node2.data = "Lina";
    node3.data = "Tikay";
    expect(node1.data).toBe("Mikay");
    expect(node2.data).toBe("Lina");
    expect(node3.data).toBe("Tikay");
  });

  test("3 set and get left method should work", () => {
    node1.left = node2;
    node2.left = node3;
    expect(node1.left).toEqual(node2);
    expect(node2.left).toEqual(node3);
    expect(node3.left).toEqual(null);
  });

  test("4 set and get right method should work", () => {
    node3.right = node2;
    node2.right = node1;
    expect(node3.right).toEqual(node2);
    expect(node2.right).toEqual(node3);
    expect(node1.right).toEqual(null);
  });
});
