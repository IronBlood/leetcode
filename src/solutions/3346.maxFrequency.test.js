/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} numOperations
 * @return {number}
 */
var maxFrequency = function(nums, k, numOperations) {
	/** @type {Map<number, number>} */
	const count = new Map();
	nums.sort((a, b) => a - b);

	let res = 0, i = 0, j = 0;
	const n = nums.length;

	/**
	 * @param {number} x
	 * @param {-1|1} delta
	 */
	const count_update = (x, delta) => count.set(x, (count.get(x) ?? 0) + delta);

	for (const num of nums) {
		while (j < n && nums[j] <= num + k) {
			count_update(nums[j++], 1);
		}
		while (i < n && nums[i] < num - k) {
			count_update(nums[i++], -1);
		}
		res = Math.max(res, Math.min(
			j - i, (count.get(num) ?? 0) + numOperations
		));
	}

	for (i = 0, j = 0; j < n; j++) {
		while (nums[i] + k + k < nums[j]) {
			i++;
		}
		res = Math.max(res, Math.min(numOperations, j - i + 1));
	}
	return res;
};

import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("3346. Maximum Frequency of an Element After Performing Operations I", () => {
	const testcases = [
		[[1,4,5], 1, 2, 2],
		[[5,11,20,20], 5, 1, 2],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			assert.strictEqual(maxFrequency(tc[0], tc[1], tc[2]), tc[3]);
		});
	}
});
