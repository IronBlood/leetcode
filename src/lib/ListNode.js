/**
 * @template T
 * Definition for singly-linked list.
 */
export class ListNode {
	/**
	 * @param {T} val
	 * @param {ListNode<T>} [next]
	 */
	constructor(val, next) {
		/** @type {T} */
		this.val = (val === undefined ? 0 : val);
		/** @type {ListNode<T>?} */
		this.next = (next === undefined ? null : next);
	}

	/**
	 * @template T
	 * @param {(T|null)[]} arr
	 * @param {number?} pos
	 * @return {ListNode<T>}
	 */
	static fromArray(arr, pos = -1) {
		const root = new ListNode(null, null);
		let curr = root;
		let end = null, target = null;

		arr.forEach(el => {
			curr.next = new ListNode(el);
			curr = curr.next;

			if (curr)
				end = curr;
			if (pos == 0) {
				target = curr;
			}
			pos--;
		});

		if (end)
			end.next = target;

		return root.next;
	}

	/**
	 * @template T
	 * @param {ListNode<T>}
	 * @return {T[]}
	 */
	static toArray(list) {
		const arr = [];

		while (list != null) {
			arr.push(list.val);
			list = list.next;
		}

		return arr;
	}

	/**
	 * @param {ListNode} l1
	 * @param {ListNode} l2
	 */
	static concat(l1, l2) {
		while (l1 && l1.next)
			l1 = l1.next;

		l1.next = l2;
	}
}

