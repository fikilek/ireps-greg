import { MdArrowDropDown, MdArrowRight } from "react-icons/md";

export const dataAsts = [
	{
		// This is an "li" element.
		to: "/asts",
		menu: "Asts",
		"menu-level": "1",
		icon: <MdArrowDropDown />,
		children: [
			// The children is always a "Ul" element followed by 'li'
			// {
			// 	to: "/asts/feeder",
			// 	menu: "Feeders",
			// 	"menu-level": "2",
			// 	icon: null,
			// 	children: null,
			// },
			{
				to: "/asts/pole",
				menu: "Poles",
				"menu-level": "2",
				icon: null,
				children: null,
			},
			{
				to: "/asts/box",
				menu: "Boxes",
				"menu-level": "2",
				icon: null,
				children: null,
			},
			{
				to: "/asts/meter",
				menu: "Meters",
				"menu-level": "2",
				icon: null,
				children: null,
			},
			{
				to: "/asts/cb",
				menu: "CBs",
				"menu-level": "2",
				icon: null,
				children: null,
			},
			{
				to: "/asts/seal",
				menu: "Seals",
				"menu-level": "2",
				icon: null,
				children: null,
			},
		],
	},
];
