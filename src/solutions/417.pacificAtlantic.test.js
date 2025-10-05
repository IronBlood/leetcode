import { PriorityQueue } from "@datastructures-js/priority-queue";

/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
var pacificAtlantic = function(heights) {
	const M = heights.length, N = heights[0].length;
	/** @type {number[][]} */
	const dp = Array.from({ length: M }, () => Array(N).fill(0));
	const FLAG_P = 0x1, FLAG_A = 0x2;

	/** @type {PriorityQueue<[number, number, number, number]>} height, x, y, flag*/
	const pq = new PriorityQueue(
		(a, b) => (b[4] - a[4]) || (a[0] - b[0]) || (a[1] - b[1]) || (a[2] - b[2])
	);

	for (let i = 0; i < M; i++) {
		pq.enqueue([
			heights[i][0],
			i,
			0,
			(dp[i][0] |= FLAG_P),
		]);
		pq.enqueue([
			heights[i][N - 1],
			i,
			N - 1,
			(dp[i][N - 1] |= FLAG_A),
		]);
	}

	for (let i = 0; i < N; i++) {
		pq.enqueue([
			heights[0][i],
			0,
			i,
			(dp[0][i] |= FLAG_P),
		]);
		pq.enqueue([
			heights[M - 1][i],
			M - 1,
			i,
			(dp[M - 1][i] |= FLAG_A),
		]);
	}

	const dirs = [0, 1, 0, -1, 0];
	const in_grid = (x, y) => x >= 0 && x < M && y >= 0 && y < N;
	const visited = (f0, f1) => f0 === f1 || f0 === 3;

	while (pq.size() > 0) {
		let [h, x, y, f] = pq.dequeue();
		f = (dp[x][y] |= f);

		for (let i = 0; i < 4; i++) {
			const nx = x + dirs[i];
			const ny = y + dirs[i + 1];

			if (in_grid(nx, ny) && heights[nx][ny] >= h && !visited(dp[nx][ny], f)) {
				pq.enqueue([
					heights[nx][ny],
					nx,
					ny,
					(dp[nx][ny] |= f),
				]);
			}
		}
	}

	const res = [];
	for (let i = 0; i < M; i++) {
		for (let j = 0; j < N; j++) {
			if (dp[i][j] === 3) {
				res.push([i, j]);
			}
		}
	}
	return res;
};

import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("417. Pacific Atlantic Water Flow", () => {
	/** @param {number[][]} arr */
	const helper_sort = (arr) => arr.sort(
		(a, b) => (a[0] - b[0]) || (a[1] - b[1])
	);

	const testcases = [
		[
			[[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]],
			[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]],
		],
		[
			[[1]],
			[[0,0]],
		],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			const res = pacificAtlantic(tc[0]);

			helper_sort(res);
			helper_sort(tc[1]);
			assert.strictEqual(JSON.stringify(res), JSON.stringify(tc[1]));
		});
	}
});
