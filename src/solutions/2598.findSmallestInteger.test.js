/**
 * @param {number[]} nums
 * @param {number} value
 * @return {number}
 */
var findSmallestInteger = function(nums, value) {
	let stop = 0, count = Array(value).fill(0);
	for (const x of nums) {
		count[(x % value + value) % value]++;
	}
	for (let i = 0; i < value; i++) {
		if (count[i] < count[stop])
			stop = i;
	}
	return value * count[stop] + stop;
};

import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("2598. Smallest Missing Non-negative Integer After Operations", () => {
	const testcases = [
		[[1,-10,7,13,6,8], 5, 4],
		[[1,-10,7,13,6,8], 7, 2],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			assert.strictEqual(findSmallestInteger(tc[0], tc[1]), tc[2]);
		});
	}
});
