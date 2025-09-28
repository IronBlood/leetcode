/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function(triangle) {
	if (triangle == null || triangle.length == 0)
		return 0;

	const n = triangle.length,
		dp = triangle[n - 1].slice();

	for (let k = n - 2; k >= 0; k--) {
		for (let i = 0; i <= k; i++) {
			dp[i] = triangle[k][i] + ((dp[i] < dp[i + 1]) ? dp[i] : dp[i + 1])
		}
	}

	return dp[0];
};

import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("120. Triangle", () => {
	/** @type {[number[][], number][]} */
	const testcases = [
		[[[2],[3,4],[6,5,7],[4,1,8,3]], 11],
		[[[-10]], -10],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			assert.strictEqual(minimumTotal(tc[0]), tc[1]);
		});
	}
});
