/**
 * A singleton used in change operations
 */
export const lambda: string;

/**
 * A tree type consisting of a root and an ordered list of children.
 */
export type Tree<T> = {
  root: T;
  children: Tree<T>[];
};

/**
 * A postordering of the nodes in the given tree.
 *
 * @template T
 * @param {Tree<T>} tree
 */
export function postorder<T>(tree: Tree<T>): T[];

/**
 * Postorder traversal of keyroot indices for keyroots in the given tree
 *
 * @template T
 * @param {Tree<T>} tree
 */
export function keyroots<T>(tree: Tree<T>): number[];

/**
 * The postorder traversal of `l(i)` for each index, i, in the given tree
 *
 * @template T
 * @param {Tree<T>} tree
 */
export function leftmosts<T>(tree: Tree<T>): number[];


/**
 * The postorder enumeration of the indices of the parent of each node,
 * The root of the tree has the parent Lambda (i.e. indicating no parent)
 *
 * @template T
 * @param {Tree<T>} tree
 */
export function parents<T>(tree: Tree<T>): (number | "Λ")[];
