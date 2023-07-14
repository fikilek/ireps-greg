import React, { createContext, useState } from "react";

export const DbdContext = createContext();

const chartData = {
	// labels: totals && totals.map(item => item.name),
	labels: [],
	datasets: [
		{
			label: "Assets",
			backgroundColor: [
				"#ddd",
				"beige",
				"#bce",
				"#abc",
				"lightBlue",
				"aqua",
				"orange",
			],
			borderColor: [
				"rgba(255, 99, 132, 1)",
				"rgba(54, 162, 235, 1)",
				"rgba(255, 206, 86, 1)",
				"rgba(75, 192, 192, 1)",
				"rgba(153, 102, 255, 1)",
				"rgba(255, 159, 64, 1)",
			],
			borderWidth: 2,
			// data: totals && totals.map(item => item.asts_quantities),
			data: [],
		},
	],
};

const chartOptions = {
	title: {
		display: true,
		text: "iREPS Assets",
		fontSize: 20,
	},
	layout: {
		padding: 20,
	},
	legend: {
		display: true,
		position: "right",
	},
	Response: true,
	maintainAspectRatio: false,
};

export const DbdContextProvider = props => {
	// console.log(`props`, props);
	const [data, setData] = useState(chartData);
	const [options, setOptions] = useState(chartOptions);
	// console.log(`componentToOpen`, componentToOpen);
	return (
		<DbdContext.Provider value={{ data, setData, options, setOptions }}>
			{props.children}
		</DbdContext.Provider>
	);
};
