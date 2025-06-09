/* Copyright 2025 @alg/zhangshasha contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
