const esc = code => `\x1b[${code}m`;

export const colors = {
	reset: esc(0),
	bold: esc(1),
	red: esc(31),
	yellow: esc(33),
	cyan: esc(36),
	error: (text) => `${colors.red}${colors.bold}${text}${colors.reset}`,
	info: (text) => `${colors.yellow}${colors.bold}${text}${colors.reset}`,
};
