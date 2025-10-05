import { PriorityQueue } from "@datastructures-js/priority-queue";

/**
 * @param {number[][]} heightMap
 * @return {number}
 */
var trapRainWater = function(heightMap) {
	const m = heightMap.length, n = heightMap[0].length;
	if (m < 3 || n < 3) {
		return 0;
	}

	/** @type {PriorityQueue<[number, number, number]>} */
	const pq = new PriorityQueue(
		(a, b) => a[0] - b[0]
	);

	for (let i = 0; i < m; i++) {
		pq.enqueue([heightMap[i][0], i, 0]);
		pq.enqueue([heightMap[i][n - 1], i, n - 1]);
		heightMap[i][0] = heightMap[i][n - 1] = -1;
	}
	for (let j = 0; j < n; j++) {
		pq.enqueue([heightMap[0][j], 0, j]);
		pq.enqueue([heightMap[m - 1][j], m - 1, j]);
		heightMap[0][j] = heightMap[m - 1][j] = -1;
	}

	let level = 0, res = 0;
	const dirs = [0, 1, 0, -1, 0];
	while (pq.size() > 0) {
		let [height, x, y] = pq.dequeue();
		level = Math.max(level, height);

		for (let i = 0; i < 4; i++) {
			const nx = x + dirs[i];
			const ny = y + dirs[i + 1];
			if (nx < 0 || nx >= m || ny < 0 || ny >= n || heightMap[nx][ny] === -1) {
				continue;
			}

			pq.enqueue([heightMap[nx][ny], nx, ny]);
			if (heightMap[nx][ny] < level) {
				res += level - heightMap[nx][ny];
			}
			heightMap[nx][ny] = -1;
		}
	}

	return res;
};

import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("407. Trapping Rain Water II", () => {
	const testcases = [
		[[[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]], 4],
		[[[3,3,3,3,3],[3,2,2,2,3],[3,2,1,2,3],[3,2,2,2,3],[3,3,3,3,3]], 10],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			assert.strictEqual(trapRainWater(tc[0]), tc[1]);
		});
	}
});
