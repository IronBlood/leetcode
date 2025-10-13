/**
 * @param {number[]} energy
 * @param {number} k
 * @return {number}
 */
var maximumEnergy = function(energy, k) {
	const n = energy.length;
	const dp = Array(n).fill(0);
	let res = -Infinity;
	for (let i = n - 1; i >= 0; i--) {
		res = Math.max(res, (dp[i] = energy[i] + ((i + k < n) ? dp[i + k] : 0)));
	}
	return res;
};

import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("3147. Taking Maximum Energy From the Mystic Dungeon", () => {
	const testcases = [
		[[5,2,-10,-5,1], 3, 3],
		[[-2,-3,-1], 2, -1],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			assert.strictEqual(maximumEnergy(tc[0], tc[1]), tc[2]);
		});
	}
});
