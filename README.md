# @alg/zhangshasha

[![JSR](https://jsr.io/badges/@alg/zhangshasha)](https://jsr.io/@alg/zhangshasha)
[![License](https://img.shields.io/badge/Apache--2.0-green?label=license)](https://github.com/alg-js/zhangshasha/blob/main/LICENSE)

Tree edit distances using the Zhang-Shasha algorithm.

For generic string/sequence edit distances,
see [@alg/levenshtein](https://jsr.io/@alg/levenshtein).

## Install

```
deno add jsr:@alg/zhangshasha
```

## Example

Trees must be objects of the form `Tree<T> = {root: T, cildren: Tree<T>[]}`. A
helper function, `t(root, ...children)`, constructs trees from root node values.

```javascript
import {distance, t} from "@alg/zhangshasha";

const tree1 = t(
    "d",
    t("b", t("a"), t("c")),
    t("f", t("e"), t("g")),
);
const tree2 = t(
    "f",
    t("e", t("x")),
    t("g"),
);

// Delete d, b, a, c; Insert x
const dist1 = distance(tree1, tree2, {
    relabel: (e1, e2) => e1 === e2 ? 0 : 2,
    insertion: () => 3,
    deletion: () => 3,
});
console.log(dist1);  // 15

// Delete c, e, g; Relabel f -> g, d -> f, b -> e, a -> x
const dist2 = distance(tree1, tree2, {
    relabel: () => 2,
    insertion: () => 3,
    deletion: () => 3,
});
console.log(dist2);  // 17
```
