/**
 * 110ms 100%
 * 89.70MB 100%
 * @param {number} m
 * @param {number} n
 * @param {number[][]} guards
 * @param {number[][]} walls
 * @return {number}
 */
var countUnguarded = function(m, n, guards, walls) {
	const mat = Array.from({ length: m }, () => Array(n).fill(0));

	walls.forEach(([x, y]) => {
		mat[x][y] = 4;
	});

	const dirs = [-1, 0, 1, 0, -1];
	guards.forEach(([x, y]) => {
		mat[x][y] = 2;
	});
	guards.forEach(([x, y]) => {
		for (let i = 0; i < 4; i++) {
			let j = 0;
			while (true) {
				j++;
				let x1 = x + dirs[i] * j,
					y1 = y + dirs[i + 1] * j;
				if (x1 < 0 || x1 == m || y1 < 0 || y1 == n || mat[x1][y1] > 1)
					break;
				mat[x1][y1] = 1;
			}
		}
	});

	return mat.reduce((prev, curr) => prev + curr.reduce((p, c) => {
		if (c == 0) p++;
		return p;
	}, 0), 0);
};

import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("2257. Count Unguarded Cells in the Grid", () => {
	const testcases = [
		{
			m: 4,
			n: 6,
			g: [[0,0],[1,1],[2,3]],
			w: [[0,1],[2,2],[1,4]],
			o: 7,
		},
		{
			m: 3,
			n: 3,
			g: [[1,1]],
			w: [[0,1],[1,0],[2,1],[1,2]],
			o: 4
		},
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const { m, n, g, w, o } = testcases[i];
			assert.strictEqual(countUnguarded(m, n, g, w), o);
		});
	}
});
