/**
 * A singleton used in change operations
 */
export const lambda = "Λ";

/**
 * A postordering of the nodes in the given tree.
 *
 * @template T
 * @param {Tree<T>} tree
 */
export function postorder(tree) {
    const s1 = [tree];
    const s2 = [];
    while (s1.length !== 0) {
        const current = s1.pop();
        s2.push(current.root);
        s1.push(...current.children);
    }
    s2.reverse();
    return s2;
}

/**
 * Postorder traversal of keyroot indices for keyroots in the given tree
 *
 * @template T
 * @param {Tree<T>} tree
 */
export function keyroots(tree) {
    const s1 = [[true, tree]];
    const s2 = [];
    while (s1.length !== 0) {
        const [isKeyroot, {children}] = s1.pop();
        s2.push(isKeyroot);
        if (children.length !== 0) {
            s1.push(...children.map((e, i) => [i !== 0, e]));
        }
    }
    s2.reverse();
    return [...s2.entries().filter(([_, e]) => e).map(([i, _]) => i)];
}

/**
 * The postorder traversal of `l(i)` for each index, i, in the given tree
 *
 * @template T
 * @param {Tree<T>} tree
 */
export function leftmosts(tree) {
    const s1 = [tree];
    const s2 = [];
    while (s1.length !== 0) {
        const current = s1.pop();
        s2.push(current);
        s1.push(...current.children);
    }
    s2.reverse();
    const memo = new Map();
    const indices = [];
    for (const [i, node] of s2.entries()) {
        if (node.children.length !== 0) {
            const child = node.children[0];
            const index = memo.get(child);
            memo.set(node, index);
            indices.push(index);
        } else {
            memo.set(node, i);
            indices.push(i);
        }
    }
    return indices;
}

/**
 * The postorder enumeration of the indices of the parent of each node,
 * The root of the tree has the parent Lambda (i.e. indicating no parent)
 *
 * @template T
 * @param {Tree<T>} tree
 */
export function parents(tree) {
    const s1 = [[tree, lambda]];
    const s2 = [];
    while (s1.length !== 0) {
        const [current, parent] = s1.pop();
        s2.push([current, parent]);
        s1.push(...current.children.map((e) => [e, current]));
    }
    s2.reverse();
    const memo = new Map();
    for (const [i, [node, _]] of s2.entries()) {
        memo.set(node, i);
    }
    memo.set(lambda, lambda);
    return s2.map(([_, e]) => memo.get(e));
}