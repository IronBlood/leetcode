/**
 * @param {number} n
 * @return {number}
 */
var smallestNumber = function(n) {
	let res = 1;
	while (res <= n) {
		res <<= 1;
	}
	return res - 1;
};

import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("3370. Smallest Number With All Set Bits", () => {
	const testcases = [
		[5, 7],
		[10, 15],
		[3, 3],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			assert.strictEqual(smallestNumber(tc[0]), tc[1]);
		});
	}
});
