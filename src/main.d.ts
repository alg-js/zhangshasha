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
