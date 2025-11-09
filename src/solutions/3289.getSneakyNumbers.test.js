// Credit https://leetcode.com/problems/the-two-sneaky-numbers-of-digitville/solutions/5788383/one-liner-no-extra-space-by-votrubac-vl1q
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var getSneakyNumbers = function(nums) {
	const n = nums.length - 2;

	let xor_n = 0;
	for (let i = 0; i < n; i++) {
		xor_n ^= i;
	}

	const xor_n2 = nums.reduce((a, b) => a ^ b);

	const xor_ab = xor_n2 ^ xor_n;
	const diff_bit = xor_ab & -xor_ab;

	// split into two buckets
	let xor_n2_bit = 0, xor_n2_no_bit = 0;
	for (const x of nums) {
		if (x & diff_bit) {
			xor_n2_bit ^= x;
		} else {
			xor_n2_no_bit ^= x;
		}
	}

	// now in each bucket, there's a single "one extra" number
	let xor_n_bit = 0, xor_n_no_bit = 0;
	for (let i = 0; i < n; i++) {
		if (i & diff_bit) {
			xor_n_bit ^= i;
		} else {
			xor_n_no_bit ^= i;
		}
	}

	return [
		xor_n_bit ^ xor_n2_bit,
		xor_n_no_bit ^ xor_n2_no_bit,
	];
};

import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("3289. The Two Sneaky Numbers of Digitville", () => {
	const testcases = [
		[[0,1,1,0], [0,1]],
		[[0,3,2,1,3,2], [2,3]],
		[[7,1,5,4,3,4,6,0,9,5,8,2], [4,5]],
	];
	const helper = (a, b) => a - b;
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			assert.deepStrictEqual(getSneakyNumbers(tc[0]).sort(helper), tc[1]);
		});
	}
});
