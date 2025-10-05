/**
 * @param {number} numBottles
 * @param {number} numExchange
 * @return {number}
 */
var numWaterBottles = function(numBottles, numExchange) {
	return numBottles + Math.trunc((numBottles - 1) / (numExchange - 1));
};

import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("1518. Water Bottles", () => {
	const testcases = [
		[9, 3, 13],
		[15, 4, 19],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			assert.strictEqual(numWaterBottles(tc[0], tc[1]), tc[2]);
		});
	}
});
