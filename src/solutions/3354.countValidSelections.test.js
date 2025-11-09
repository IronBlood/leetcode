// Credit https://leetcode.com/problems/make-array-elements-equal-to-zero/solutions/6053328/o-n-partial-sum
/**
 * @param {number[]} nums
 * @return {number}
 */
var countValidSelections = function(nums) {
	const N = nums.length;
	const ps = Array(N + 1);
	ps[0] = 0;
	for (let i = 0; i < N; i++) {
		ps[i + 1] = ps[i] + nums[i];
	}
	let res = 0;
	for (let i = 0; i < N; i++) {
		if (nums[i] === 0) {
			if (ps[N] === 2 * ps[i]) {
				res += 2;
			} else if (Math.abs(ps[N] - 2 * ps[i]) === 1) {
				res++;
			}
		}
	}
	return res;
};

import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("3354. Make Array Elements Equal to Zero", () => {
	const testcases = [
		[[1,0,2,0,3], 2],
		[[2,3,4,0,4,1,0], 0],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			assert.strictEqual(countValidSelections(tc[0]), tc[1]);
		});
	}
});
