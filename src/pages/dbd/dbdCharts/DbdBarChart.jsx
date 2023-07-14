import React, { useContext } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { DbdContext } from "../../../contexts/DbdContext";
import { astColors } from "../../../data/colors/colors";

const DbdBarChart = ({ totals }) => {
	const data = {
		labels: totals && totals.map(item => item.name),
		datasets: [
			{
				// label: null,
				backgroundColor: [
					astColors["feeders"].color,
					astColors["transformers"].color,
					astColors["poles"].color,
					astColors["boxes"].color,
					astColors["meters"].color,
					astColors["cbs"].color,
					astColors["seals"].color,
				],
				borderWidth: 2,
				data: totals && totals.map(item => item.asts_quantities),
			},
		],
	};

	const options = {
		title: {
			display: true,
		},
		scales: {
			y: {
				beginAtZero: true,
			},
		},
		layout: {
			padding: 20,
		},
		Response: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: true,
				text: "Assets Bar Chart",
			},
		},
	};

	return (
		<div className="chart">
			<Bar data={data} options={options} />
		</div>
	);
};

export default DbdBarChart;
