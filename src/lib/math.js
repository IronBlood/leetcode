/**
 * To get the area of a simple polygon using the shoelace formula
 * @param {number[][]} points
 * @returns {number}
 * @see {@link https://en.wikipedia.org/wiki/Shoelace_formula}
 */
export const shoelace = (points) => {
	let res = 0;
	for (let i = 0, len = points.length; i < len; i++) {
		const a = points[i];
		const b = points[(i + 1) % len];
		res += a[0] * b[1] - b[0] * a[1];
	}
	return Math.abs(res) / 2;
};
