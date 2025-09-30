import * as acorn from "acorn";
import * as walk from "acorn-walk";

/**
 * @param {string} snippet
 * @returns {string}
 */
export const get_fn_name = (snippet) => {
	const ast = acorn.parse(snippet, {
		ecmaVersion: "latest",
		sourceType: "module",
	});

	let name = null;
	walk.simple(ast, {
		VariableDeclarator(n) {
			const init = n.init;
			const isFn = init && (init.type === "FunctionExpression" || init.type === "ArrowFunctionExpression");
			if (!name && isFn && n.id.type === "Identifier")
				name = n.id.name;
		},
		FunctionDeclaration(n) {
			if (!name && n.id)
				name = n.id.name;
		},
	});

	return name;
};
