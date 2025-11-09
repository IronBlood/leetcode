/**
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */
var countOperations = function(num1, num2) {
	return num1 * num2 === 0 ? 0 : (Math.trunc(num1 / num2) + countOperations(num2, num1 % num2));
};

import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("2169. Count Operations to Obtain Zero", () => {
	const testcases = [
		[2, 3, 3],
		[10, 10, 1],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			assert.strictEqual(countOperations(tc[0], tc[1]), tc[2]);
		});
	}
});
