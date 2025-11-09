/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxDistinctElements = function(nums, k) {
	let ans = 0;
	nums.sort((a, b) => a - b);
	for (let i = 0, last = -Infinity; i < nums.length; i++) {
		const mn = nums[i] - k;
		const mx = nums[i] + k;
		if (last < mn) {
			last = mn;
			ans++;
		} else if (last < mx) {
			last++;
			ans++;
		}
	}
	return ans;
};

import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("3397. Maximum Number of Distinct Elements After Operations", () => {
	const testcases = [
		[[1,2,2,3,3,4], 2, 6],
		[[4,4,4,4], 1, 3],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			assert.strictEqual(maxDistinctElements(tc[0], tc[1]), tc[2]);
		});
	}
});
