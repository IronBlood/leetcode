import { ListNode } from "../lib/ListNode.js";

/**
 * 12ms    - 100%
 * 99.10MB - 64.56%
 * @template T
 * @param {number[]} nums
 * @param {ListNode<T>} head
 * @return {ListNode<T>}
 */
var modifiedList = function(nums, head) {
	const bitset = new Uint32Array(1e5 / 32 + 1); // IMPORTANT 1e5 / 32 = 3125
	/** @param {number} n */
	const bucket = (n) => n >>> 5;
	/** @param {number} n */
	const flag   = (n) => 1 << (n & 31);
	/** @param {number} n */
	const has    = (n) => bitset[bucket(n)] & flag(n);

	nums.forEach(x => bitset[bucket(x)] |= flag(x));

	const dummy = new ListNode(0, head);
	head = dummy;
	while (head.next) {
		if (has(head.next.val)) {
			head.next = head.next.next;
		} else {
			head = head.next;
		}
	}

	return dummy.next;
};

import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("3217. Delete Nodes From Linked List Present in Array", () => {
	const testcases = [
		[[1,2,3], [1,2,3,4,5], [4,5]],
		[[1], [1,2,1,2,1,2], [2,2,2]],
		[[5], [1,2,3,4], [1,2,3,4]],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			const list = ListNode.fromArray(tc[1]);
			const res = ListNode.toArray(modifiedList(tc[0], list));
			assert.deepStrictEqual(res, tc[2]);
		});
	}
});
