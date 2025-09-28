import { MaxPriorityQueue } from "@datastructures-js/priority-queue";

/**
 * @param {number[]} nums
 * @return {number}
 */
var largestPerimeter = function(nums) {
	/** @type {MaxPriorityQueue<number>} */
	const pq = new MaxPriorityQueue(x => x);
	nums.forEach(x => pq.enqueue(x));

	let a = 0, b = pq.dequeue(), c = pq.dequeue();
	while (pq.size() > 0) {
		a = b;
		b = c;
		c = pq.dequeue();

		if (a >= b + c)
			continue;

		return a + b + c;
	}

	return 0;
};

import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("976. Largest Perimeter Triangle", () => {
	/** @type {[number[], number][]} */
	const testcases = [
		[[2,1,2], 5],
		[[1,2,1,10], 0],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			assert.strictEqual(largestPerimeter(tc[0]), tc[1]);
		});
	}
});
