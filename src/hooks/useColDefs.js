import { useColumnDefs } from "./useColumnDefs";

const viewportFilter = data => {
	// console.log(`data`, data);

	const { viewportWidth, tableFields } = data;

	let tf = [];

	if (viewportWidth < 475) {
		// console.log(`viewport > [${viewportWidth}] < [475] - xs`);
		tf = tableFields?.filter(tf => tf.cellRendererParams.breakpoint === "xs");
		// console.log(`tf`, tf);
		// iretate through tf and make all columns flex 1
		tf = tf.map(col => {
			return {
				...col,
				// flex: 1,
				cellStyle: { fontSize: "11px" },
			};
		});
		// console.log(`tf`, tf);
		// return { tableFields: tf };
	}

	if (viewportWidth >= 475 && viewportWidth < 768) {
		// console.log(`viewport [475] > [${viewportWidth}] < [768] - sm`);
		tf = tableFields?.filter(
			tf =>
				tf.cellRendererParams.breakpoint === "xs" ||
				tf.cellRendererParams.breakpoint === "sm"
		); // iretate through tf and make all columns flex 1
		tf = tf.map(col => {
			return {
				...col,
				// flex: 1,
			};
		});
		// console.log(`tf`, tf);
		// return { tableFields: tf };
	}

	if (viewportWidth >= 768 && viewportWidth < 1024) {
		// console.log(`viewport [768] > [${viewportWidth}] < [1024] - md`);
		tf = tableFields?.filter(
			tf =>
				tf.cellRendererParams.breakpoint === "xs" ||
				tf.cellRendererParams.breakpoint === "sm" ||
				tf.cellRendererParams.breakpoint === "md"
		);
		tf = tf.map(col => {
			return {
				...col,
				// flex: null,
			};
		});
		// console.log(`tf`, tf);
		// return { tableFields: tf };
	}

	if (viewportWidth >= 1024 && viewportWidth < 1200) {
		// console.log(`viewport >= [1024] [${viewportWidth}] < [1200] - lg`);
		tf = tableFields?.filter(
			tf =>
				tf.cellRendererParams.breakpoint === "xs" ||
				tf.cellRendererParams.breakpoint === "sm" ||
				tf.cellRendererParams.breakpoint === "md" ||
				tf.cellRendererParams.breakpoint === "lg"
		);

		tf = tf.map(col => {
			return {
				...col,
				// flex: null,
			};
		});
		// console.log(`tf`, tf);
		// return { tableFields: tf };
	}

	if (viewportWidth >= 1200) {
		// console.log(`viewport [${viewportWidth}] >= [1200] - xl`);
		tf = tableFields?.filter(
			tf =>
				tf.cellRendererParams.breakpoint === "xs" ||
				tf.cellRendererParams.breakpoint === "sm" ||
				tf.cellRendererParams.breakpoint === "md" ||
				tf.cellRendererParams.breakpoint === "lg" ||
				tf.cellRendererParams.breakpoint === "xl"
		);
		// console.log(`tf`, tf);
		// return { tableFields: tf };
	}

	// console.log(`tf`, tf)
	return { tableFields: tf };
};

export const useColDefs = props => {
	// console.log(`useColDefs props`, props);
	// const [tableFields, setTableFields] = useState([]);

	const { tableFields } = useColumnDefs(props);
	// console.log(`tableFields`, tableFields);

	// const getColDefs = () => {
	const { viewportDimesions } = props;
	const { width: viewportWidth } = viewportDimesions;

	// filter tableFields against viewportWidth
	const tf = viewportFilter({ viewportWidth, tableFields });
	// console.log(`tf`, tf);

	return tf;
};
