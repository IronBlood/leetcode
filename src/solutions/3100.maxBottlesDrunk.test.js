/**
 * @param {number} numBottles
 * @param {number} numExchange
 * @return {number}
 */
var maxBottlesDrunk = function(numBottles, numExchange) {
	let drunk = numBottles;
	while (numBottles >= numExchange) {
		numBottles -= numExchange;
		drunk++;
		numExchange++;
		numBottles++;
	}
	return drunk;
};

/**
 * Credit: https://leetcode.com/problems/water-bottles-ii/solutions/4969481/no-loops-one-liner-solution-closed-form-algebraic-truly-o-1/
 * @param {number} numBottles
 * @param {number} numExchange
 * @return {number}
 */
var maxBottlesDrunk_math = function(numBottles, numExchange) {
	return numBottles + Math.trunc(((-2 * numExchange) + 3 + Math.sqrt(4 * numExchange * numExchange + 8 * numBottles - 12 * numExchange + 1)) / 2);
};

import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("3100. Water Bottles II", () => {
	const testcases = [
		[13, 6, 15],
		[10, 3, 13],
		[100, 2, 113],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			assert.strictEqual(maxBottlesDrunk(tc[0], tc[1]), tc[2]);
			assert.strictEqual(maxBottlesDrunk_math(tc[0], tc[1]), tc[2]);
		});
	}
});
