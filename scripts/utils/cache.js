import {
	existsSync,
	readFileSync,
	writeFileSync,
} from "node:fs";
import { resolve } from "node:path";
import "dotenv/config";
import { colors } from "./colors.js";

const LEETCODE_LIST_CACHE = process.env["LEETCODE_LIST_CACHE"] ?? "";

const IS_CACHE_ENABLED = LEETCODE_LIST_CACHE.length > 0;

const INIT_CWD = process.env["INIT_CWD"];

if (IS_CACHE_ENABLED && !INIT_CWD) {
	console.log(`${colors.error("[ERROR]")} cache is enabled, please use ${colors.cyan}npm run${colors.reset} instead.`);
	console.log(`${colors.info("[INFO]")} check out ${colors.cyan}scripts${colors.reset} from ${colors.cyan}package.json${colors.reset} for details`);
	process.exit(0);
}

console.log(INIT_CWD, LEETCODE_LIST_CACHE);
const cache_path = resolve(INIT_CWD, LEETCODE_LIST_CACHE);

/**
 * @typedef {Object} CacheEntry
 * @property {number} id
 * @property {string} titleSlug
 */

/**
 * @returns {CacheEntry[]}
 */
const load_cache = () => JSON.parse(readFileSync(cache_path, "utf8"));

/**
 * @param {string|number} id
 * @returns {CacheEntry?}
 */
const find_from_cache = (id) => {
	if (!IS_CACHE_ENABLED || !existsSync(cache_path)) {
		return null;
	}

	if (typeof id === "string") {
		id = +id;
	}

	const cached = load_cache();

	return cached.find(x => x.id === id);
};

/**
 * @param {CacheEntry[]} arr
 * @returns {void}
 */
const write_to_cache = (arr) => {
	if (!IS_CACHE_ENABLED)
		return;

	// merge with a HashMap
	if (existsSync(cache_path)) {
		/** @type {Map<number, CacheEntry>} */
		const map = new Map();
		for (const entry of load_cache()) {
			map.set(entry.id, entry);
		}
		arr.forEach(entry => {
			if (!map.has(entry.id)) {
				map.set(entry.id, entry);
			}
		});

		arr = Array(map.values());
	}
	arr.sort((a, b) => a.id - b.id);

	writeFileSync(cache_path, JSON.stringify(arr), { encoding: "utf8" });
}

export {
	find_from_cache,
	write_to_cache,
};
