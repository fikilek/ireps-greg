import { MdArrowDropDown, MdArrowLeft } from "react-icons/md";

export const dataAdmin = [
	{
		// to: "/admin/unps",
		// menu: "Users",
		// "menu-level": "2",
		// icon: <MdArrowDropDown />,
		// menuSide: "right",

		// This is an "li" element.
		title: "Admin",
		to: "/admin",
		menu: "Admin",
		"menu-level": "1",
		icon: <MdArrowDropDown />,
		menuSide: "right",
		children: [
			// The children is always a "Ul" element followed by 'li'
			{
				title: "Users",
				to: "/admin/users",
				menu: "Users",
				"menu-level": "2",
				icon: "",
				children: null,
			},
			// {
			// 	title: "Downloads",
			// 	to: "/admin/downloads",
			// 	menu: "Downoads",
			// 	"menu-level": "2",
			// 	icon: "",
			// 	children: null,
			// },
			{
				title: "Uploads",
				to: "/admin/uploads",
				menu: "Uploads",
				"menu-level": "2",
				icon: "",

				children: [
					{
						title: "User Roles",
						to: "/admin/uploads/erfs",
						menu: "Upload Erfs",
						"menu-level": "3",
						icon: "",
						children: null,
					},
					{
						title: "Asset States",
						to: "/admin/uploads/tidKtcTokens",
						menu: "Upload Tid KCT Tokens",
						"menu-level": "3",
						icon: null,
						children: null,
					},
				],
			},
			// {
			// 	// System tables
			// 	title: "System Tables",
			// 	to: "/admin/syst",
			// 	menu: "System Tables",
			// 	"menu-level": "2",
			// 	icon: <MdArrowLeft />,
			// 	children: [
			// 		{
			// 			title: "User Roles",
			// 			to: "/admin/systt/user-roles",
			// 			menu: "User Roles",
			// 			"menu-level": "3",
			// 			icon: "",
			// 			children: null,
			// 		},
			// 		{
			// 			title: "Asset States",
			// 			to: "/admin/systt/ast-states",
			// 			menu: "Asset states",
			// 			"menu-level": "3",
			// 			icon: null,
			// 			children: null,
			// 		},
			// 		{
			// 			title: "Transaction States",
			// 			to: "/admin/systt/trn-states",
			// 			menu: "Transaction States",
			// 			"menu-level": "3",
			// 			icon: null,
			// 			children: null,
			// 		},
			// 		{
			// 			title: "Asset Catergories",
			// 			to: "/admin/systt/ast-cartegories",
			// 			menu: "Asset Cartegories",
			// 			"menu-level": "3",
			// 			icon: null,
			// 			children: null,
			// 		},
			// 	],
			// },
			// ],
			// 	// {
			// 	// 	// Mobile devices
			// 	// 	to: "/admin/mobile-devices",
			// 	// 	menu: "Mobile Devices",
			// 	// 	"menu-level": "2",
			// 	// 	icon: "",
			// 	// 	children: null,
			// 	// },
			// 	// {
			// 	// 	// Simcards
			// 	// 	to: "/admin/simcards",
			// 	// 	menu: "Simcards",
			// 	// 	"menu-level": "2",
			// 	// 	icon: "",
			// 	// 	children: null,
			// 	// },
		],
	},
];
