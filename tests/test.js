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

import {assertEquals} from "jsr:@std/assert";
import {distance} from "@alg/zhangshasha";
import {postorder, keyroots, leftmosts, parents, lambda} from "../src/tree.js";

function t(root, ...children) {
    return {
        root: root,
        children: children,
    };
}

const tree1 = t("f", t("d", t("a"), t("c", t("b"))), t("e"));
const tree2 = t("f", t("c", t("d", t("a"), t("b"))), t("e"));
const tree3 = t(
    "g",
    t("e", t("a"), t("c", t("b")), t("d")),
    t("f"),
);
const tree4 = t(
    "o",
    t("g", t("a"), t("c", t("b")), t("f", t("d"), t("e"))),
    t("n", t("i", t("h")), t("j"), t("k"), t("m", t("l"))),
);
const tree5 = t(
    "d",
    t("b", t("a"), t("c")),
    t("f", t("e"), t("g")),
);
const tree6 = t("f", t("e", t("x")), t("g"));

Deno.test({
    name: "Two identical trees have an edit distance of zero",
    fn: () => {
        assertEquals(distance(t("a"), t("a")), 0);
        assertEquals(distance(t("a", t("b")), t("a", t("b"))), 0);
        assertEquals(distance(
            t("a", t("b"), t("c")),
            t("a", t("b"), t("c")),
        ), 0);
    },
});

Deno.test({
    name: "Relabelling a single node will cost one relabel",
    fn: () => {
        const cost = {
            relabel: () => 10,
            insertion: () => 100,
            deletion: () => 100,
        };
        assertEquals(distance(t("a"), t("b"), cost), 10);
    },
});


Deno.test({
    name: "tree edit distance will find the minimum edit distance",
    fn: () => {
        let cost = {
            relabel: (e1, e2) => e1 === e2 ? 0 : 2,
            insertion: (_) => 3,
            deletion: (_) => 3,
        };
        // Delete d, b, a, c; Insert x
        assertEquals(distance(tree5, tree6, cost), 15);
        assertEquals(distance(tree6, tree5, cost), 15);
        cost = {
            relabel: () => 2,
            insertion: (_) => 3,
            deletion: (_) => 3,
        };
        // Delete c, e, g; Relabel f -> g, d -> f, b -> e, a -> x
        assertEquals(distance(tree5, tree6, cost), 17);
        assertEquals(distance(tree6, tree5, cost), 17);

        assertEquals(distance(tree1, tree1), 0);
        assertEquals(distance(tree1, tree2), 2);
        assertEquals(distance(tree1, tree3), 4);
        assertEquals(distance(tree1, tree4), 12);
        assertEquals(distance(tree2, tree2), 0);
        assertEquals(distance(tree2, tree3), 6);
        assertEquals(distance(tree2, tree4), 14);
        assertEquals(distance(tree3, tree3), 0);
        assertEquals(distance(tree3, tree4), 11);
        assertEquals(distance(tree4, tree4), 0);

        assertEquals(distance(tree2, tree1), 2);
        assertEquals(distance(tree3, tree1), 4);
        assertEquals(distance(tree4, tree1), 12);
        assertEquals(distance(tree3, tree2), 6);
        assertEquals(distance(tree4, tree2), 14);
        assertEquals(distance(tree4, tree3), 11);

        cost = {
            relabel: (e1, e2) => e1 === e2 ? 0 : 10,
            insertion: () => 10,
            deletion: () => 10,
        };
        assertEquals(distance(tree1, tree2, cost), 20);
        assertEquals(distance(tree2, tree1, cost), 20);
    },
});

Deno.test({
    name: "test keyroots",
    fn: () => {
        assertEquals(keyroots(tree1), [2, 4, 5]);
        assertEquals(keyroots(tree2), [1, 4, 5]);
        assertEquals(keyroots(tree3), [2, 3, 5, 6]);
        assertEquals(keyroots(tree4), [2, 4, 5, 9, 10, 12, 13, 14]);
    },
});

Deno.test({
    name: "test postorder",
    fn: () => {
        assertEquals(postorder(tree1), ["a", "b", "c", "d", "e", "f"]);
        assertEquals(postorder(tree2), ["a", "b", "d", "c", "e", "f"]);
        assertEquals(postorder(tree3), ["a", "b", "c", "d", "e", "f", "g"]);
        assertEquals(
            postorder(tree4),
            ["a", "b", "c", "d", "e", "f", "g",
                "h", "i", "j", "k", "l", "m", "n", "o"],
        );
    },
});

Deno.test({
    name: "test leftmosts",
    fn: () => {
        assertEquals(leftmosts(tree1), [0, 1, 1, 0, 4, 0]);
        assertEquals(leftmosts(tree2), [0, 1, 0, 0, 4, 0]);
        assertEquals(leftmosts(tree3), [0, 1, 1, 3, 0, 5, 0]);
        assertEquals(
            leftmosts(tree4),
            [0, 1, 1, 3, 4, 3, 0, 7, 7, 9, 10, 11, 11, 7, 0],
        );
    },
});

Deno.test({
    name: "test parents",
    fn: () => {
        assertEquals(parents(tree1), [3, 2, 3, 5, 5, lambda]);
        assertEquals(parents(tree2), [2, 2, 3, 5, 5, lambda]);
        assertEquals(parents(tree3), [4, 2, 4, 4, 6, 6, lambda]);
        assertEquals(
            parents(tree4),
            [6, 2, 6, 5, 5, 6, 14, 8, 13, 13, 13, 12, 13, 14, lambda],
        );
    },
});
