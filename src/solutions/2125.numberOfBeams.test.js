/**
 * @param {string[]} bank
 * @return {number}
 */
var numberOfBeams = function(bank) {
	let count = 0, prev = 0, curr = 0;
	for (const str of bank) {
		curr = 0;
		for (let i = 0, len = str.length; i < len; i++) {
			curr += str.charCodeAt(i) - 48;
		}
		if (curr === 0) {
			continue;
		}
		count += prev * curr;
		prev = curr;
	}
	return count;
};

import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("2125. Number of Laser Beams in a Bank", () => {
	const testcases = [
		[["011001","000000","010100","001000"], 8],
		[["000","111","000"], 0],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			assert.strictEqual(numberOfBeams(tc[0]), tc[1]);
		});
	}
});
