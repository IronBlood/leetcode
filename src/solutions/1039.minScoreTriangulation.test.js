// Credit https://leetcode.com/problems/minimum-score-triangulation-of-polygon/solutions/286705/java-c-python-dp
/**
 * @param {number[]} values
 * @return {number}
 */
var minScoreTriangulation = function(values) {
	const n = values.length;
	const dp = Array.from({ length: n }, () => Array(n).fill(0));
	for (let d = 2; d < n; d++) {
		for (let i = 0; i + d < n; i++) {
			const j = i + d;
			dp[i][j] = Infinity;
			for (let k = i + 1; k < j; k++) {
				dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k][j] + values[i] * values[j] * values[k]);
			}
		}
	}
	return dp[0][n - 1];
};

import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("1039. Minimum Score Triangulation of Polygon", () => {
	/** @type {[number[], number][]} */
	const testcases = [
		[[1,2,3], 6],
		[[3,7,4,5], 144],
		[[1,3,1,4,1,5], 13],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			assert.strictEqual(minScoreTriangulation(tc[0]), tc[1]);
		});
	}
});
