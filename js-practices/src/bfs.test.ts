import {
  assertEquals,
  // assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
import {doesExist, NodeWithChildren} from "./bfs.ts";

Deno.test('doesExist should check the existence of a value', () => {
    const root = new NodeWithChildren(0);
    root.push([1,2,3]);
    root.children[0].push([4,5])
    root.children[0].children[0].push([6,7])
    assertEquals(doesExist(root, 7), true)
})
