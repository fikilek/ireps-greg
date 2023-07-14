
const TableCellStyleAstState = params => {
	// console.log(`params.value`, params.value);
	switch (params.value) {
		case "stores":
			return { borderLeft: "1rem solid brown" };
		case "checked out":
			return { borderLeft: "1rem solid yellow" };
		case "field":
			return { borderLeft: "1rem solid blue" };
		case "service":
			return { borderLeft: "1rem solid green" };
		case "lost":
			return { borderLeft: "1rem solid brickRed" };
		case "disconnected":
			return { borderLeft: "1rem solid red" };
		default:
			return null;
	}
};

export default TableCellStyleAstState;
