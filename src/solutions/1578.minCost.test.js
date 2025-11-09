/**
 * @param {string} colors
 * @param {number[]} neededTime
 * @return {number}
 */
var minCost = function(colors, neededTime) {
	let res = 0, max_cost = 0, sum_cost = 0;
	for (let i = 0; i < colors.length; i++) {
		if (i > 0 && colors[i] != colors[i-1]) {
			res += sum_cost - max_cost;
			sum_cost = max_cost = 0;
		}
		sum_cost += neededTime[i];
		max_cost = Math.max(max_cost, neededTime[i]);
	}
	res += sum_cost - max_cost;
	return res;
};

import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("1578. Minimum Time to Make Rope Colorful", () => {
	const testcases = [
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
		});
	}
});
