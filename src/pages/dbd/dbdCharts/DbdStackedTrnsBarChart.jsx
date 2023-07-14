import React, { useContext } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { DbdContext } from "../../../contexts/DbdContext";
import { astColors } from "../../../data/colors/colors";

const DbdStackedTrnsBarChart = ({ trnsTotals }) => {
	const data = {
		labels: trnsTotals && trnsTotals.map(item => `${item.year}:${item.month} `),
		datasets: [
			{
				label: "feeders",
				backgroundColor: astColors["feeders"].color,
				data: trnsTotals && trnsTotals.map(item => item.data.feeders),
			},
			{
				label: "transformers",
				backgroundColor: astColors["transformers"].color,
				data: trnsTotals && trnsTotals.map(item => item.data.transformers),
			},
			{
				label: "poles",
				backgroundColor: astColors["poles"].color,
				data: trnsTotals && trnsTotals.map(item => item.data.poles),
			},
			{
				label: "boxes",
				backgroundColor: astColors["boxes"].color,
				data: trnsTotals && trnsTotals.map(item => item.data.boxes),
			},
			{
				label: "meters",
				backgroundColor: astColors["meters"].color,
				data: trnsTotals && trnsTotals.map(item => item.data.meters),
			},
			{
				label: "cbs",
				backgroundColor: astColors["cbs"].color,
				data: trnsTotals && trnsTotals.map(item => item.data.cbs),
			},
			{
				label: "seals",
				backgroundColor: astColors["seals"].color,
				data: trnsTotals && trnsTotals.map(item => item.data.seals),
			},
		],
	};

	const options = {
		plugins: {
			title: {
				display: true,
				text: "Transactions Stacked Chart",
			},
		},
		layout: {
			padding: 20,
		},
		legend: {
			display: true,
			position: "right",
		},
		Response: true,
		scales: {
			x: {
				stacked: true,
			},
			y: {
				stacked: true,
			},
		},

		maintainAspectRatio: false,
	};

	return (
		<div className="chart">
			<Bar data={data} options={options} />
		</div>
	);
};

export default DbdStackedTrnsBarChart;
