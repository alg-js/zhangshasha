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

/* @ts-self-types="./main.d.ts" */

import * as tree from "./tree.js";


export function t(root, ...children) {
    return {root: root, children: children};
}


export function distance(
    tree1,
    tree2,
    {
        insertion = (_) => 1,
        deletion = (_) => 1,
        relabel = (e1, e2) => e1 === e2 ? 0 : 1,
    } = {},
) {
    const keyroots1 = tree.keyroots(tree1);
    const keyroots2 = tree.keyroots(tree2);
    const postorder1 = tree.postorder(tree1);
    const postorder2 = tree.postorder(tree2);
    const l1 = tree.leftmosts(tree1);
    const l2 = tree.leftmosts(tree2);

    const memo = postorder1.map(() => new Array(postorder2.length).fill(0));

    for (const i of keyroots1) {
        for (const j of keyroots2) {
            const forestDist = [];
            for (let k = 0; k < i - l1[i] + 2; k++) {
                forestDist.push(new Array(j - l2[j] + 2).fill(0));
            }

            let i1 = 1;
            for (let ni = l1[i]; ni < i + 1; ni++) {
                const deleteCost = deletion(postorder1[ni]);
                forestDist[i1][0] = forestDist[i1 - 1][0] + deleteCost;
                i1 += 1;
            }

            let j1 = 1;
            for (let nj = l2[j]; nj < j + 1; nj++) {
                const insertCost = insertion(postorder2[nj]);
                forestDist[0][j1] = forestDist[0][j1 - 1] + insertCost;
                j1 += 1;
            }

            i1 = 1;
            for (let ni = l1[i]; ni < i + 1; ni++) {
                j1 = 1;
                const nodeI = postorder1[ni];
                for (let nj = l2[j]; nj < j + 1; nj++) {
                    const nodeJ = postorder2[nj];
                    if (l1[ni] === l1[i] && l2[nj] === l2[j]) {
                        forestDist[i1][j1] = Math.min(
                            forestDist[i1 - 1][j1] + deletion(nodeI),
                            forestDist[i1][j1 - 1] + insertion(nodeJ),
                            forestDist[i1 - 1][j1 - 1] + relabel(nodeI, nodeJ),
                        );
                        memo[ni][nj] = forestDist[i1][j1];
                    } else {
                        const m = l1[ni] - l1[i];
                        const n = l2[nj] - l2[j];
                        forestDist[i1][j1] = Math.min(
                            forestDist[i1 - 1][j1] + deletion(nodeI),
                            forestDist[i1][j1 - 1] + insertion(nodeJ),
                            forestDist[m][n] + memo[ni][nj],
                        );
                    }
                    j1 += 1;
                }
                i1 += 1;
            }
        }
    }
    return memo.at(-1).at(-1);
}
