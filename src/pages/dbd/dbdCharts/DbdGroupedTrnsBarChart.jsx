import React, { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { DbdContext } from "../../../contexts/DbdContext";
import { astColors } from "../../../data/colors/colors";

const DbdGroupedTrnsBarChart = ({ trnsTotals }) => {
	const data = {
		labels: trnsTotals && trnsTotals.map(item => `${item.year}:${item.month} `),
		datasets: [
			{
				label: "feeders",
				backgroundColor: astColors["feeders"].color,
				data: trnsTotals && trnsTotals.map(item => item.data.feeders),
				stack: "Stack 0",
			},
			{
				label: "transformers",
				backgroundColor: astColors["transformers"].color,
				data: trnsTotals && trnsTotals.map(item => item.data.transformers),
				stack: "Stack 1",
			},
			{
				label: "poles",
				backgroundColor: astColors["poles"].color,
				data: trnsTotals && trnsTotals.map(item => item.data.poles),
				stack: "Stack 2",
			},
			{
				label: "boxes",
				backgroundColor: astColors["boxes"].color,
				data: trnsTotals && trnsTotals.map(item => item.data.boxes),
				stack: "Stack 3",
			},
			{
				label: "meters",
				backgroundColor: astColors["meters"].color,
				data: trnsTotals && trnsTotals.map(item => item.data.meters),
				stack: "Stack 4",
			},
			{
				label: "cbs",
				backgroundColor: astColors["cbs"].color,
				data: trnsTotals && trnsTotals.map(item => item.data.cbs),
				stack: "Stack 5",
			},
			{
				label: "seals",
				backgroundColor: astColors["seals"].color,
				data: trnsTotals && trnsTotals.map(item => item.data.seals),
				stack: "Stack 6",
			},
		],
	};

	const options = {
		plugins: {
			title: {
				display: true,
				text: "Transactions Grouped Chart",
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

export default DbdGroupedTrnsBarChart;
