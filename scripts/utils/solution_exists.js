import { fileURLToPath } from "node:url";
import { readdirSync } from "node:fs";

/**
 * @param {number} id
 * @returns {boolean}
 */
export const solution_exists = (id) => {
	const solution_dir = fileURLToPath(new URL("../../src/solutions/", import.meta.url));
	const reg = new RegExp(`${id}\\..*\\.test\\.js$`);
	const entries = readdirSync(solution_dir, { withFileTypes: true });
	for (const entry of entries) {
		if (entry.isFile() && reg.test(entry.name)) {
			return true;
		}
	}
	return false;
};
