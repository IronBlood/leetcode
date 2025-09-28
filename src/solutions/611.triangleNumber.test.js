/**
 * @param {number[]} nums
 * @return {number}
 */
var triangleNumber = function(nums) {
	let count = 0;
	nums.sort((a, b) => a - b);

	let i, lo, hi;
	for (i = 2; i < nums.length; i++) {
		lo = 0;
		hi = i - 1;

		while (lo < hi) {
			if (nums[i] < nums[lo] + nums[hi]) {
				count += (hi - lo);
				hi--;
			} else {
				lo++;
			}
		}
	}

	return count;
};

import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("611. Valid Triangle Number", () => {
	/** @type {[number[], number][]} */
	const testcases = [
		[[2,2,3,4], 3],
		[[4,2,3,4], 4],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			assert.strictEqual(triangleNumber(tc[0]), tc[1]);
		});
	}
});
