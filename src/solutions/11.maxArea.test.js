/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
	let max = 0,
		lo = 0,
		hi = height.length - 1;

	while (lo < hi) {
		max = Math.max(Math.min(height[lo], height[hi]) * (hi - lo), max);
		if (height[lo] < height[hi]) {
			lo++;
		} else {
			hi--;
		}
	}

	return max;
};

import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("11. Container With Most Water", () => {
	const testcases = [
		[[1,8,6,2,5,4,8,3,7], 49],
		[[1,1], 1],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
		});
	}
});
