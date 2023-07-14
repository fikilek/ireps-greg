import { MdArrowDropDown } from "react-icons/md";

export const dataSch = [
	{
		// This is an "li" element.
		to: "/sch",
		menu: "Sch",
		"menu-level": "1",
		icon: <MdArrowDropDown />,

		children: [
			// The children is always a "Ul" element followed by 'li'
			{
				to: "/sch/pos", //pos - purchase orders
				menu: "Purchase Orders",
				"menu-level": "2",
				icon: null,
				children: null,
			},
			{
				to: "/sch/suppliers",
				menu: "Suppliers",
				"menu-level": "2",
				icon: null,
				children: null,
			},
			{
				to: "/sch/stores",
				menu: "Stores",
				"menu-level": "2",
				icon: null,
				children: null,
			},
		],
	},
];
