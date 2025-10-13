/**
 * @param {number[]} skill
 * @param {number[]} mana
 * @return {number}
 */
var minTime = function(skill, mana) {
	const N = skill.length;
	const M = mana.length;
	const done = Array(N + 1).fill(0);

	for (let j = 0; j < M; j++) {
		for (let i = 0; i < N; i++) {
			done[i + 1] = Math.max(done[i + 1], done[i]) + mana[j] * skill[i];
		}
		for (let i = N - 1; i > 0; i--) {
			done[i] = done[i + 1] - mana[j] * skill[i];
		}
	}

	return done[N];
};

import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("3494. Find the Minimum Amount of Time to Brew Potions", () => {
	const testcases = [
		[[1,5,2,4], [5,1,4,2], 110],
		[[1,1,1], [1,1,1], 5],
		[[1,2,3,4], [1,2], 21],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			assert.strictEqual(minTime(tc[0], tc[1]), tc[2]);
		});
	}
});
