

import React from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ChartDataLabels
);

const DashboardCardChart = props => {
	const { items } = props;
	// console.log(`items`, items)

	let myLabels = [];
	let myData = [];

	items.forEach(item => {
		const objEntries = Object.entries(item);
		// console.log(`objEntries[0][0]`, objEntries[0][0]);
		// console.log(`objEntries[0][1]`, objEntries[0][1]);
		myLabels.push(`${objEntries[0][0]} : ${objEntries[0][1]}`);
		myData.push(objEntries[0][1]);
	});

	const options = {
		indexAxis: "y",
		elements: {
			bar: {
				borderWidth: 2,
			},
		},
		responsive: true,
		barThickness: 15,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: false,
				text: "General SMS - 150",
			},
			layout: {
				padding: 50,
			},
			datalabels: {
				font: {
					weight: "bold",
				},
				align: "start",
				anchor: "end",
				formatter: function (value, context) {
					return context.chart.formattedData[context.dataIndex];
				},
			},
		},
	};

	const formattedData = myData;

	const data = {
		labels: myLabels,
		datasets: [
			{
				data: myData,
				backgroundColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(255, 159, 64, 1)",
				],
				datalabels: {
					formatter: function (value, context) {
						return formattedData[context.dataIndex];
					},
				},
			},
		],
	};

	return <Bar data={data} options={options} />;
};

export default DashboardCardChart;
