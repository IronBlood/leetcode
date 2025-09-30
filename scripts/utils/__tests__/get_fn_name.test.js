import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { get_fn_name } from "../get_fn_name.js";

/**
 * @param {string} name
 */
const load_snippet = (name) => readFileSync(new URL(`./${name}.js`, import.meta.url), "utf8");

describe("test function name extraction from snippet", () => {
	const testcases = [
		["function", "foo"],
		["class", "foo"],
	];
	for (let i = 0; i < testcases.length; i++) {
		const tc = testcases[i];
		it(`test-${i}: parse ${tc[0]} should get ${tc[1]}`, () => {
			assert.strictEqual(get_fn_name(load_snippet(tc[0])), tc[1]);
		});
	}
});
