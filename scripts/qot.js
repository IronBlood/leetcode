import { LeetcodeClient } from "@ironblood/leetcode-loader";
import { colors } from "./utils/colors.js";
import { solution_exists } from "./utils/solution_exists.js";
import { load_question } from "./utils/load_question.js";

async function main() {
	const client = new LeetcodeClient();

	// step 1: get qot
	const qot_resp = await client.GetQuestionOfToday();
	const question = qot_resp.data.activeDailyCodingChallengeQuestion.question;
	const {
		questionFrontendId,
		titleSlug,
		title,
	} = question;

	// step 2: check if file exist
	if (solution_exists(questionFrontendId)) {
		console.log(`${colors.info("[INFO]")}Question of Today: ${colors.cyan}${questionFrontendId}. ${title}${colors.reset} is already solved, skip...`);
		return;
	}

	// step 3: load question
	await load_question(client, titleSlug);
}

main();
