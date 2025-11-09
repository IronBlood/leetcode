/**
 * @param {number[]} spells
 * @param {number[]} potions
 * @param {number} success
 * @return {number[]}
 */
var successfulPairs = function(spells, potions, success) {
	const N = spells.length;
	const M = potions.length;
	potions.sort((a, b) => a - b);
	for (let i = 0; i < N; i++) {
		const spell = spells[i];
		let lo = 0, hi = M - 1;
		while (lo < hi) {
			const mi = (lo + hi) >> 1;
			const product = spell * potions[mi];
			if (product >= success) {
				hi = mi;
			} else {
				lo = mi + 1;
			}
		}
		spells[i] = (spell * potions[lo] >= success) ? M - lo : 0;
	}
	return spells;
};

import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("2300. Successful Pairs of Spells and Potions", () => {
	const testcases = [
		[[5,1,3], [1,2,3,4,5], 7, [4,0,3]],
		[[3,1,2], [8,5,8], 16, [2,0,2]],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			const res = successfulPairs(tc[0], tc[1], tc[2]);
			assert.deepStrictEqual(res, tc[3]);
		});
	}
});
