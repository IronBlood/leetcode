/**
 * @param {number} val
 * @param {number[]} arr
 */
const binary_search = (val, arr) => {
	let i = 0, j = arr.length - 1;
	while (i <= j) {
		const mid = (i + j) >> 1;
		if (arr[mid] > val && (mid === 0 || arr[mid - 1] <= val)) {
			return mid;
		}
		if (arr[mid] > val) {
			j = mid - 1;
		} else {
			i = mid + 1;
		}
	}
	return -1;
};

/**
 * @param {number[]} rains
 * @return {number[]}
 */
var avoidFlood = function(rains) {
	const N = rains.length;
	/** @type {Map<number, number>} */
	const map = new Map();
	/** @type {number[]} */
	let dry_days = [];
	const res = [];

	for (let i = 0; i < N; i++) {
		if (rains[i] === 0) {
			dry_days.push(i);
			res.push(1);
		} else {
			const lake = rains[i];
			if (!map.has(lake)) {
				map.set(lake, i);
				res.push(-1);
			} else {
				res.push(-1);
				const prev = map.get(lake);
				const chosen_idx = binary_search(prev, dry_days);
				if (chosen_idx === -1) {
					return [];
				}

				const dry_day = dry_days[chosen_idx];
				dry_days.splice(chosen_idx, 1);
				map.set(lake, i);
				res[dry_day] = lake;
			}
		}
	}

	return res;
};

import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("1488. Avoid Flood in The City", () => {
	const testcases = [
		[[1,2,3,4], [-1,-1,-1,-1]],
		[[1,2,0,0,2,1], [-1,-1,2,1,-1,-1]],
		[[1,2,0,1,2], []],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			assert.strictEqual(JSON.stringify(avoidFlood(tc[0])), JSON.stringify(tc[1]));
		});
	}
});
