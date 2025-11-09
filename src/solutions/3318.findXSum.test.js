import { PriorityQueue } from "@datastructures-js/priority-queue";

/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
var findXSum = function(nums, k, x) {
	const n = nums.length;
	const ans = Array(n - k + 1).fill(0);
	const freq = Array(51).fill(0);

	for (let i = 0; i < k; i++) {
		freq[nums[i]]++;
	}

	/**
	 * @param {number[]} freq
	 */
	const x_sum = (freq) => {
		/** @type {PriorityQueue<[number, number]>} */
		const pq = new PriorityQueue(
			(a, b) => a[1] === b[1] ? b[0] - a[0] : b[1] - a[1]
		);
		for (let i = 1; i < 51; i++) {
			pq.enqueue([i, freq[i]]);
		}
		let sum = 0;
		for (let i = 0; i < x; i++) {
			const arr = pq.dequeue();
			sum += arr[0] * arr[1];
		}
		return sum;
	};

	ans[0] = x_sum(freq);
	for (let i = 1; i < ans.length; i++) {
		const L = i - 1;
		const R = i + k - 1;

		freq[nums[L]]--;
		freq[nums[R]]++;
		ans[i] = x_sum(freq);
	}

	return ans;
};

import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("3318. Find X-Sum of All K-Long Subarrays I", () => {
	const testcases = [
		[[1,1,2,2,3,4,2,3], 6, 2, [6,10,12]],
		[[3,8,7,8,7,5], 2, 2, [11,15,15,15,12]],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			assert.deepStrictEqual(findXSum(tc[0], tc[1], tc[2]), tc[3]);
		});
	}
});
