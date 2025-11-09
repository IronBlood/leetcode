/**
 * @param {string[]} operations
 * @return {number}
 */
var finalValueAfterOperations = function(operations) {
	let x = 0;
	operations.forEach(cmd => {
		if (cmd === "X++" || cmd === "++X") {
			x++;
		} else {
			x--;
		}
	});
	return x;
};

import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("2011. Final Value of Variable After Performing Operations", () => {
	const testcases = [
		[["--X","X++","X++"], 1],
		[["++X","++X","X++"], 3],
		[["X++","++X","--X","X--"], 0],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			assert.strictEqual(finalValueAfterOperations(tc[0]), tc[1]);
		});
	}
});
