// Credit https://leetcode.com/problems/adjacent-increasing-subarrays-detection-i/solutions/6028775/java-c-python-one-pass-o-1-space
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var hasIncreasingSubarrays = function(nums, k) {
	const N = nums.length;
	let up = 1, pre_max_up = 0, res = 0;
	for (let i = 1; i < N; i++) {
		if (nums[i] > nums[i - 1]) {
			up++;
		} else {
			pre_max_up = up;
			up = 1;
		}
		res = Math.max(res, Math.max(up >> 1, Math.min(pre_max_up, up)));
	}
	return res >= k;
};

import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("3349. Adjacent Increasing Subarrays Detection I", () => {
	const testcases = [
		[[2,5,7,8,9,2,3,4,3,1], 3, true],
		[[1,2,3,4,4,4,4,5,6,7], 5, false],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			assert.strictEqual(hasIncreasingSubarrays(tc[0], tc[1]), tc[2]);
		});
	}
});
