/**
 * @param {string} s
 * @return {boolean}
 */
var hasSameDigits = function(s) {
	let len = s.length;
	/** @type {number[]} */
	const arr = Array(len);
	for (let i = 0; i < len; i++) {
		arr[i] = s.charCodeAt(i) - 48;
	}

	while (len > 2) {
		for (let i = 0; i < len - 1; i++) {
			arr[i] = (arr[i] + arr[i + 1]) % 10;
		}
		len--;
	}

	return arr[0] === arr[1];
};

import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("3461. Check If Digits Are Equal in String After Operations I", () => {
	const testcases = [
		["3902", true],
		["34789", false],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			assert.strictEqual(hasSameDigits(tc[0]), tc[1]);
		});
	}
});
