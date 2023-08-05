import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import "./DashboardCard.css";

const DashboardCardChartMeters = props => {
	// console.log(`props`, props);
	const { items, name } = props;

	let myLabels = [];
	let myData = [];

	items.forEach(item => {
		const objEntries = Object.entries(item);
		// console.log(`objEntries[0][0]`, objEntries[0][0]);
		// console.log(`objEntries[0][1]`, objEntries[0][1]);
		myLabels.push(objEntries[0][0]);
		myData.push(objEntries[0][1]);
	});

	const data = {
		labels: myLabels,
		datasets: [
			{
				label: name,
				data: myData,
				backgroundColor: [
					"rgba(255, 99, 132, 0.2)",
					"rgba(54, 162, 235, 0.2)",
					"rgba(255, 206, 86, 0.2)",
					"rgba(75, 192, 192, 0.2)",
					"rgba(153, 102, 255, 0.2)",
					"rgba(255, 159, 64, 0.2)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(255, 159, 64, 1)",
				],
				borderWidth: 1,
			},
		],
	};

	const options = {
		layout: {
			padding: 5,
		},
		Response: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: true,
				position: "right",
				labels: {
					boxWidth: 5,
				},
				// title: {
				// 	text: "Assets Doughnut Chart",
				// 	display: true,
				// 	font: {
				// 		weight: "bold",
				// 	},
				// },
			},
		},
	};

	return <Pie data={data} options={options} />;
};

export default DashboardCardChartMeters;
