# @alg/zhangshasha

[![JSR](https://jsr.io/badges/@alg/zhangshasha)](https://jsr.io/@alg/zhangshasha)
[![License](https://img.shields.io/badge/MIT-green?label=license)](https://github.com/alg-js/zhangshasha/blob/main/LICENSE)

Tree edit distances using the Zhang-Shasha algorithm

## Install

```
deno add jsr:@alg/zhangshasha
```

## Example

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
let dist1 = distance(tree1, tree2, {
    relabel: (e1, e2) => e1 === e2 ? 0 : 2,
    insertion: (_) => 3,
    deletion: (_) => 3,
});
console.log(dist1);  // 15

// Delete c, e, g; Relabel f -> g, d -> f, b -> e, a -> x
let dist2 = distance(tree1, tree2, {
    relabel: () => 2,
    insertion: (_) => 3,
    deletion: (_) => 3,
});
console.log(dist2);  // 17
```
