import React, { useContext, useState } from "react";
import { FaSquare, FaCheckSquare, FaMinusSquare } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";
import TreeView, { flattenTree } from "react-accessible-treeview";
import cx from "classnames";
import "./AreaTree.css";
import { AreaTreeContext } from "../../contexts/AreaTreeContext";
import { flatten } from "flat";

const folder = {
	name: "",
	children: [
		{
			name: "South Africa",
			children: [
				{
					name: "GP",
					children: [
						{
							name: "Sedibeng",
							children: [
								{
									name: "Lesedi",
									children: [
										{
											name: "Obed Mthombeni Nkosi",
											children: [
												{
													name: "Obed Nkosi A",
												},
												{
													name: "Obed Nkosi B",
												},
												{
													name: "Obed Nkosi C",
												},
											],
										},
									],
								},
							],
						},
						{
							name: "COJ",
							children: [
								{
									name: "COJ Area 1",
								},
								{
									name: "COJ Area 2",
								},
							],
						},
					],
				},
				{
					name: "KZN",
					children: [
						{
							name: "Kwazulu",
							children: [
								{
									name: "eDumber",
									children: [
										{
											name: "Paulpeteresburg",
										},
									],
								},
							],
						},
					],
				},
				{
					name: "MP",
					children: [
						{
							name: "Sedibeng",
							children: [
								{
									name: "Lesedi",
									children: [
										{
											name: "Obed Nkosi",
											children: [
												{
													name: "Obed Nkosi A",
												},
												{
													name: "Obed Nkosi B",
												},
												{
													name: "Obed Nkosi C",
												},
											],
										},
									],
								},
							],
						},
					],
				},
			],
		},
		{
			name: "China",
			children: [{ name: "Gonzou" }],
		},
		{
			name: "Russia",
			children: [{ name: "St Petersburg" }],
		},
	],
};

const data = flattenTree(folder);

function AreaTree() {
	// const [selectedArea, setSelectedArea] = useState("no area selected");
	const [showHide, setShowHide] = useState("hide");

	const { area, setArea } = useContext(AreaTreeContext);

	const onAreaSelect = e => {
		// console.log(`area selected event`, e.element.name);
		setArea(prev => {
			// console.log(`prev`, prev);
			const areaSelected =
				e.element.name === area.name ? "no area selected" : e.element.name;
			setShowHide("hide");
			// set area center to be used in map

			// const flatteneAreaName = flatten(folder, { overwrite: true });
			// console.log(`flatteneAreaName`, flatteneAreaName);

			return {
				...prev,
				name: areaSelected,
			};
		});
	};

	const toggleAreaTreeView = e => {
		setShowHide(() => {
			return showHide === "hide" ? "show" : "hide";
		});
	};

	return (
		<div className="area-tree">
			<div className={`checkbox ${showHide}`}>
				<TreeView
					data={data}
					aria-label="Single select"
					multiSelect={false}
					propagateSelectUpwards
					togglableSelect
					nodeAction="check"
					// onSelect={onAreaSelect}
					onNodeSelect={onAreaSelect}
					nodeRenderer={({
						element,
						isBranch,
						isExpanded,
						isSelected,
						isHalfSelected,
						getNodeProps,
						level,
						handleSelect,
						handleExpand,
					}) => {
						return (
							<div
								{...getNodeProps({ onClick: handleExpand })}
								style={{ marginLeft: 40 * (level - 1) }}
							>
								{isBranch && <ArrowIcon isOpen={isExpanded} />}
								<CheckBoxIcon
									className="checkbox-icon"
									onClick={e => {
										handleSelect(e);
										e.stopPropagation();
									}}
									variant={isHalfSelected ? "some" : isSelected ? "all" : "none"}
								/>
								<span className="name">{element.name}</span>
							</div>
						);
					}}
				/>
			</div>
			<div className="area-tree-control-btn">
				<button className="selected-area" onClick={toggleAreaTreeView}>
					{area.name}
				</button>
			</div>
		</div>
	);
}

const ArrowIcon = ({ isOpen, className }) => {
	const baseClass = "arrow";
	const classes = cx(
		baseClass,
		{ [`${baseClass}--closed`]: !isOpen },
		{ [`${baseClass}--open`]: isOpen },
		className
	);
	return <IoMdArrowDropright className={classes} />;
};

const CheckBoxIcon = ({ variant, ...rest }) => {
	switch (variant) {
		case "all":
			return <FaCheckSquare {...rest} />;
		case "none":
			return <FaSquare {...rest} />;
		case "some":
			return <FaMinusSquare {...rest} />;
		default:
			return null;
	}
};

export default AreaTree;
