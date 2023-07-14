export const dataUnp = [
	{
		// This is an "li" element.
		to: "/unp",
		menu: "FK", // TODO: this string will come form firebase auth for the loggeon user
		"menu-level": "1",
		icon: null,
		children: [
			// The children is always a "Ul" element followed by 'li'
			{
				to: "/unp/profile",
				menu: "Profile",
				"menu-level": "2",
				icon: null,
				children: null,
			},
			{
				to: "/signout",
				menu: "Sign Out",
				"menu-level": "2",
				icon: null,
				children: null,
			},
		],
	},
];
