import React, { useContext, useEffect, useState } from "react";
import MenuBlock from "../MenuBlock";
import "../navbar.css";
import { dataBok } from "../../../data/menuData/dataMenuBox";
import { dataErfs } from "../../../data/menuData/dataMenuErfs";
import { dataUnp } from "../../../data/menuData/dataMenuUnp";
import { dataTrns } from "../../../data/menuData/dataMenuTrns";
import { dataAsts } from "../../../data/menuData/dataMenuAsts";
import { dataAdmin } from "../../../data/menuData/dataMenuAdmin";
import { dataDbd } from "../../../data/menuData/dataMenuDbd";
import { NavLink } from "react-router-dom";
import { MenuContext } from "../../../contexts/MenuContext";

import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";
import { dataSch } from "../../../data/menuData/dataMenuSch";
import useAuthContext from "../../../hooks/useAuthContext";
import useOpenModal from "../../../hooks/useModal";

const SignedInMenu = () => {
	// console.log(`SignedInMenu rendering`);
	const { openModal } = useOpenModal();
	const { menuStatus, setMenuStatus } = useContext(MenuContext);
	const { user } = useAuthContext();
	let words = user?.displayName;
	// console.log(`words`, words);
	words = words?.split(" ");
	const name = words[0];
	const surname = words[1];
	// }

	const handleClick = e => {
		openModal({ modalName: e.target.id });
	};
	return (
		<ul
			className={`nav-list ${menuStatus ? "hide-nav-list" : "show-nav-list"}`}
			onClick={() => setMenuStatus(true)}
		>
			<div className="nav-list-left">
				<MenuBlock menuData={dataErfs} />
				<MenuBlock menuData={dataTrns} />
				<MenuBlock menuData={dataAsts} />
				{/* <MenuBlock menuData={dataSch} /> */}
				{/* <MenuBlock menuData={dataBok} /> */}
			</div>

			<div className="nav-list-right">
				{/* <MenuBlock menuData={dataDbd} /> */}
				<MenuBlock menuData={dataAdmin} />
				<li className="nav-list-btn-signedin-user">
					<Tooltip title={`${user.displayName}`} position="left">
						<NavLink to="/unp" className="user-initials">
							{user ? `${name[0]}${surname[0]}` : `??`}
						</NavLink>
					</Tooltip>
					<ul className="sub-menu">
						<li>
							<NavLink to="/unp/profile">Profile</NavLink>
						</li>

						<li>
							<a href="#" onClick={handleClick} id="signout">
								Sign out
							</a>
						</li>
					</ul>
				</li>
			</div>
		</ul>
	);
};

export default SignedInMenu;
