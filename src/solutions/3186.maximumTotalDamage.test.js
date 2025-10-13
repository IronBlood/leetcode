/**
 * @param {number[]} power
 * @return {number}
 */
var maximumTotalDamage = function(power) {
	/** @type {Map<number, number>} */
	const freq = new Map();
	for (const p of power) {
		freq.set(p, (freq.get(p) ?? 0) + 1);
	}

	const unique_damages = Array.from(freq.keys()).sort((a, b) => a - b);
	const total = unique_damages.length;
	const max = Array(total).fill(0);
	max[0] = unique_damages[0] * freq.get(unique_damages[0]);

	for (let i = 1; i < total; i++) {
		const curr_damage = unique_damages[i];
		const curr_damage_total = curr_damage * freq.get(curr_damage);
		max[i] = max[i - 1];
		let prev_idx = i - 1, prev;
		while (prev_idx >= 0 && (((prev = unique_damages[prev_idx]) === curr_damage - 1) || prev === curr_damage - 2)) {
			prev_idx--;
		}

		max[i] = Math.max(max[i], (prev_idx >= 0)
			? (max[prev_idx] + curr_damage_total)
			: curr_damage_total
		);
	}

	return max[total - 1];
};

import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("3186. Maximum Total Damage With Spell Casting", () => {
	const testcases = [
		[[1,1,3,4], 6],
		[[7,1,6,6], 13],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			assert.strictEqual(maximumTotalDamage(tc[0]), tc[1]);
		});
	}
});
