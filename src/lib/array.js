/**
 * @template T
 * @param {T[]} arr
 * @param {number} l
 * @param {number} r
 */
const do_rotate = (arr, l, r = arr.length - 1) => {
	while (l < r) {
		const tmp = arr[l];
		arr[l] = arr[r];
		arr[r] = tmp;
		l++;
		r--;
	}
}

/**
 * @template T
 * @param {T[]} arr
 * @param {number} x
 */
export const rotate = (arr, x) => {
	do_rotate(arr, 0, x - 1);
	do_rotate(arr, x);
	return arr.reverse();
};
