import { writeFileSync } from "node:fs";
import { colors } from "./colors.js";
import { get_fn_name } from "./get_fn_name.js";

/**
 * @param {import("@ironblood/leetcode-loader").LeetcodeClient} client
 * @param {string} titleSlug
 */
export const load_question = async (client, titleSlug) => {
	const resp = await client.GetQuestionDetail(titleSlug);
	const detail = resp.data.question;
	const {
		codeSnippets,
		questionFrontendId,
		title,
	} = detail;

	const grouped_title = `${questionFrontendId}. ${title}`;
	const colored_title = `${colors.cyan}${grouped_title}${colors.reset}`;

	const snippet = detail.codeSnippets.find(s => s.langSlug === "javascript");
	if (!snippet) {
		console.log(`${colors.info("[INFO]")} JavaScript is not supported for ${colored_title}, skip...`);
		return;
	}

	const fn_name = get_fn_name(snippet.code);
	if (!fn_name) {
		console.log(`${colors.info("[INFO]")} cannot get function name for ${colored_title}, skip...`);
		return;
	}

	const filename = `${questionFrontendId}.${fn_name}.test.js`;
	const body = [
		snippet.code,
		"", // empty line
		`import { describe, it } from "node:test";`,
		`import assert from "node:assert/strict";`,
		"", // empty line
		`describe("${grouped_title}", () => {`,
		`\tconst testcases = [`,
		`\t];`,
		`\tfor (let i = 0; i < testcases.length; i++) {`,
		"\t\tit(\`test-${i}`, () => {",
		`\t\t\tconst tc = testcases[i];`,
		`\t\t});`,
		`\t}`,
		`});\n`,
	].join("\n");

	writeFileSync(new URL(`../../src/solutions/${filename}`, import.meta.url), body, { encoding: "utf8" });
	console.log(`${colors.info("[INFO]")} solution file created for ${colored_title}`);
	console.log(`${colors.info("[INFO]")} please visit ${colors.cyan}https://leetcode.com/problems/${titleSlug}/description/${colors.reset} for details`);
};
