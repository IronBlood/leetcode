/**
 * @param {number[]} nums
 * @return {number}
 */
var triangularSum = function(nums) {
	let n;
	while ((n = nums.length) > 1) {
		const next = Array(n - 1);
		for (let i = 0; i < n - 1; i++) {
			next[i] = (nums[i] + nums[i + 1]) % 10;
		}
		nums = next;
	}
	return nums[0];
};

import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("2221. Find Triangular Sum of an Array", () => {
	/** @type {[number[], number][]} */
	const testcases = [
		[[1,2,3,4,5], 8],
		[[5], 5],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			assert.strictEqual(triangularSum(tc[0]), tc[1]);
		});
	}
});
