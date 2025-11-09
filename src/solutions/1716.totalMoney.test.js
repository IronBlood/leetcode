/**
 * @param {number} n
 * @return {number}
 */
var totalMoney = function(n) {
	const left = n % 7, week = (n - left) / 7;
	return (28 + 28 + (week - 1) * 7) * week / 2 + (1 + week + left + week) * left / 2;
};

import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("1716. Calculate Money in Leetcode Bank", () => {
	const testcases = [
		[4, 10],
		[10, 37],
		[20, 96],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			assert.strictEqual(totalMoney(tc[0]), tc[1]);
		});
	}
});
