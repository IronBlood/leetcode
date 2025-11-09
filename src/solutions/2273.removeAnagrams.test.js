/**
 * @param {string[]} words
 * @return {string[]}
 */
var removeAnagrams = function(words) {
	/**
	 * @param {string} word
	 */
	const get_freq = (word) => {
		/** @type {number[]} */
		const freq = Array(26).fill(0);
		for (let i = 0, len = word.length; i < len; i++) {
			freq[word.charCodeAt(i) - 97]++;
		}
		return freq;
	};

	/**
	 * @param {number[]} a
	 * @param {number[]} b
	 */
	const is_same_freq = (a, b) => {
		for (let i = 0; i < 26; i++) {
			if (a[i] !== b[i])
				return false;
		}
		return true;
	};

	const res = [], N = words.length;
	let i = 0, curr_freq = null;
	while (i < N) {
		const curr = words[i];
		res.push(curr);

		if (!curr_freq)
			curr_freq = get_freq(curr);
		let j = i + 1;
		while (j < N) {
			const next_freq = get_freq(words[j]);
			if (is_same_freq(curr_freq, next_freq)) {
				j++;
			} else {
				curr_freq = next_freq;
				break;
			}
		}

		i = j;
	}

	return res;
};

import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("2273. Find Resultant Array After Removing Anagrams", () => {
	const testcases = [
		[["abba","baba","bbaa","cd","cd"], ["abba","cd"]],
		[["a","b","c","d","e"], ["a","b","c","d","e"]],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			assert.deepStrictEqual(removeAnagrams(tc[0]), tc[1]);
		});
	}
});
