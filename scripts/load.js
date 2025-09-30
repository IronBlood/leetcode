import { LeetcodeClient } from "@ironblood/leetcode-loader";
import { colors } from "./utils/colors.js";
import { solution_exists } from "./utils/solution_exists.js";
import {
	find_from_cache,
	write_to_cache,
} from "./utils/cache.js";
import { load_question } from "./utils/load_question.js";

/**
 * @param {number} id
 */
const calc_skip = (id, limit = 100) => {
	// the last item, e.g.:
	// - id = 100 => skip = 0
	// - id = 200 => skip = 100
	if ((id % limit) === 0) {
		return id - limit;
	}

	// e.g.:
	// - id = 50 => skip = 0
	// - id = 101 => skip = 1
	return limit * Math.trunc(id / limit);
};

/**
 * @param {LeetcodeClient} client
 * @param {number} id
 */
const prepare_file_for = async (client, id) => {
	if (solution_exists(id)) {
		console.log(`${colors.info("[INFO]")} Solution for ${colors.cyan}${id}${colors.reset} exists, skip...`);
		return;
	}

	let entry = find_from_cache(id);
	if (!entry) {
		const skip = calc_skip(id);
		const resp = await client.GetQuestionList(skip);
		const entries = resp.data.problemsetQuestionListV2.questions.map(({ questionFrontendId, titleSlug }) => ({
			id: Number(questionFrontendId),
			titleSlug,
		}));
		// TODO dup
		write_to_cache(entries);
		entry = entries.find(x => x.id === id);
		if (!entry) {
			console.log(`${colors.error("[INFO]")} Cannot find metadata for ${colors.cyan}${id}${colors.reset}, skip...`);
			return;
		}
	}

	await load_question(client, entry.titleSlug);
};

async function main() {
	const argv = process.argv
		.slice(2)
		.filter(x => /\d+/.test(x))
		.map(Number);

	if (argv.length === 0) {
		console.log(`${colors.info("[INFO]")} Please provide question IDs`);
		return;
	}

	const client = new LeetcodeClient();
	for (const id of argv) {
		await prepare_file_for(client, id);
	}
}

main();
