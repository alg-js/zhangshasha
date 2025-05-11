import type { Cost, Tree } from "./types.d.ts";

/**
 * A helper function to create trees
 *
 * @template T
 * @param {T} root
 * @param {Tree<T>[]} children
 */
export function t<T>(root: T, ...children: Tree<T>[]): Tree<T>;


/**
 * Tree edit cost using the given cost function.
 *
 * By default, `cost` is:
 * - insertion: ``(T) -> 1``
 * - deletion: ``(T) -> 1``
 * - relabel: ``(T1, T2) -> T1 === T2 ? 0 : 1``
 *
 * @template T
 * @param {Tree<T>} tree1 the initial tree
 * @param {Tree<T>} tree2 the target tree
 * @param {Cost<T>} cost a Cost object defining cost functions
 *
 * @returns number The edit distance between `tree1` and `tree2`
 */
export function distance<T>(
  tree1: Tree<T>,
  tree2: Tree<T>,
  cost?: Cost<T>,
): number;
