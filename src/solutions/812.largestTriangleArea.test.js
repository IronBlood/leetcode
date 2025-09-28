import { shoelace } from "../lib/math.js";

/**
 * @param {number[][]} points
 * @return {number}
 */
var largestTriangleArea = function(points) {
	let max = 0;

	for (let i = 0, len = points.length; i < len - 2; i++) {
		const a = points[i];
		for (let j = i + 1; j < len - 1; j++) {
			const b = points[j];
			for (let k = j + 1; k < len; k++) {
				const c = points[k];
				max = Math.max(max, shoelace([a, b, c]));
			}
		}
	}

	return max;
};

import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("812. Largest Triangle Area", () => {
	/** @type {[number[][], number][]} */
	const testcases = [
		[[[0,0],[0,1],[1,0],[0,2],[2,0]], 2.0],
		[[[1,0],[0,0],[0,1]], 0.5],
	];
	const EPS = 1e-5;
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			assert.ok(Math.abs(largestTriangleArea(tc[0]) - tc[1]) <= EPS);
		});
	}
});
