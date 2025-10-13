import { PriorityQueue } from "@datastructures-js/priority-queue";

/**
 * @param {number[][]} grid
 * @return {number}
 */
var swimInWater = function(grid) {
	const N = grid.length;
	/** @type {(0|1)[][]} */
	const visited = Array.from({ length: N }, () => Array(N).fill(0));
	const in_grid = (x, y) => x >= 0 && y >= 0 && x < N && y < N;
	const dirs = [0, 1, 0, -1, 0];

	/** @type {PriorityQueue<[number, number, number]>} */
	const pq = new PriorityQueue(
		(a, b) => a[2] - b[2],
	);
	pq.enqueue([0, 0, grid[0][0]]);

	while (pq.size() > 0) {
		const [x, y, t] = pq.dequeue();

		if (x === N - 1 && y === N - 1) {
			return t;
		}

		if (visited[x][y])
			continue;
		visited[x][y] = 1;

		for (let i = 0; i < 4; i++) {
			const nx = x + dirs[i];
			const ny = y + dirs[i + 1];

			if (!in_grid(nx, ny) || visited[nx][ny])
				continue;

			pq.enqueue([
				nx,
				ny,
				Math.max(t, grid[nx][ny]),
			]);
		}
	}
};

import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("778. Swim in Rising Water", () => {
	const testcases = [
		[[[0,2],[1,3]], 3],
		[[[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]], 16],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			assert.strictEqual(swimInWater(tc[0]), tc[1]);
		});
	}
});
