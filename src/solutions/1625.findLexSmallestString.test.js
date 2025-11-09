import { rotate } from "../lib/array.js";

/**
 * @param {string} s
 * @param {number} a
 * @param {number} b
 * @return {string}
 */
var findLexSmallestString = function(s, a, b) {
	/** @type {Set<number>} */
	const visited = new Set();

	/**
	 * @param {string} str
	 */
	const str_to_digits = (str) => Array.from({ length: str.length }, (_, i) => str.charCodeAt(i) - 48);

	/**
	 * @param {number[]} digits
	 */
	const digits_to_number = (digits) => digits.reduce((res, curr) => res * 10 + curr, 0);

	/**
	 * @param {number[]} arr
	 * @param {number} x
	 */
	const arr_rotate = (arr, x) => rotate(arr, x);

	/**
	 * @param {number[]} arr
	 * @param {number} x
	 */
	const arr_add = (arr, x) => {
		for (let i = 1; i < arr.length; i += 2) {
			arr[i] = (arr[i] + x) % 10;
		}
		return arr;
	};

	let ans = str_to_digits(s);
	const N = ans.length;

	/**
	 * @param {number[]} arr
	 */
	const update_min = (arr) => {
		for (let i = 0; i < N; i++) {
			const d = arr[i] - ans[i];
			if (d === 0)
				continue;
			if (d < 0) {
				ans = arr;
			}
			return;
		}
	};

	/**
	 * @param {number[]} arr
	 */
	const dfs = (arr) => {
		const num = digits_to_number(arr);
		if (visited.has(num))
			return;
		visited.add(num);

		update_min(arr);
		dfs(arr_rotate(arr.slice(), b));
		dfs(arr_add(arr.slice(), a));
	};

	dfs(ans);
	return ans.join("");
};

import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("1625. Lexicographically Smallest String After Applying Operations", () => {
	const testcases = [
		["5525", 9, 2, "2050"],
		["74", 5, 1, "24"],
		["0011", 4, 2, "0011"],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			assert.strictEqual(findLexSmallestString(tc[0], tc[1], tc[2]), tc[3]);
		});
	}
});
