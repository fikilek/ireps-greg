import React from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { astColors } from "../../../data/colors/colors";

const DbdBarChart = ({ totals }) => {
	const data = {
		labels: totals && totals.map(item => item.name),
		datasets: [
			{
				// label: "Assets",
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
		layout: {
			padding: 20,
		},
		Response: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: true,
				// position: 'bottom',
				labels: {
					boxWidth: 20,
				},
				title: {
					text: 'Assets Doughnut Chart',
					display: true,
					font: {
						weight: 'bold',
					}
				},
			},
		},
	};

	return (
		<div className="chart">
			<Doughnut data={data} options={options} />
		</div>
	);
};

export default DbdBarChart;
