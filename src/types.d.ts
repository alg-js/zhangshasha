/**
 * A tree type consisting of a root and an ordered list of children.
 */
export type Tree<T> = {
    root: T;
    children: Tree<T>[];
};

/**
 * A set of tree edit cost functions for deleting, inserting
 * and relabelling nodes.
 *
 * @property deletion A cost function, ``(T) -> number`` for the change
 * operation ``(T -> Λ)``.
 * @property insertion A cost function ``(T) -> number`` for the change
 * operation ``(Λ -> T)``.
 * @property relabel A cost function ``(T1, T2) -> number`` for the change
 * operation ``(T1 -> T2)``.
 */
export type Cost<T> = {
    insertion?: (n: T) => number;
    deletion?: (n: T) => number;
    relabel?: (n1: T, n2: T) => number;
};
