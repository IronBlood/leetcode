import { readdirSync } from "node:fs";
import { colors } from "./utils/colors.js";
import { spawnSync } from "node:child_process";
import { join } from "node:path";

const INIT_CWD = process.env["INIT_CWD"];
if (!INIT_CWD) {
	console.log(`${colors.error("[ERROR]")} please run the script with npm/yarn/pnpm`);
	process.exit(1);
}

const rel_dir = "src/solutions";

const DIR = `${INIT_CWD}/${rel_dir}`;

const id = process.argv[2];
if (!id) {
	console.log(`${colors.error("[ERROR]")} please provide a test ID`);
	process.exit(1);
}
if (!/^\d+$/.test(id)) {
	console.log(`${colors.error("[ERROR]")} ID must be numeric`);
	process.exit(1);
}
const files = readdirSync(DIR).filter(f =>
	f.startsWith(`${id}.`) && f.endsWith(".test.js")
);
if (files.length === 0) {
	console.log(`${colors.info("[INFO]")} No test found like ${DIR}/${id}.*.test.js`);
	process.exit(1);
}
if (files.length > 1) {
	console.log(`${colors.error("[ERROR]")} Multiple matches:`);
	files.forEach(f => console.log(` - ${f}`));
	process.exit(1);
}

const { status } = spawnSync(process.execPath, [
	"--test",
	"--test-reporter=@ironblood/node-test-reporter",
	join(rel_dir, files[0]),
], { stdio: "inherit"});
process.exit(status ?? 1);
