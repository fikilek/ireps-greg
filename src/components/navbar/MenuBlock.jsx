import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { MenuContext } from "../../contexts/MenuContext";
import { ModalContext } from "../../contexts/ModalContext";

const MenuBlock = ({ menuData, classes }) => {
	const { menuStatus, setMenuStatus } = useContext(MenuContext);

	return (
		menuData &&
		menuData.map(item => (
			<li key={item.to} className={classes}>
				<NavLink to={item.to}>
					{item.menu}
					{item.icon}
				</NavLink>
				{item.children && (
					<ul className="sub-menu">
						<MenuBlock menuData={item.children} />
					</ul>
				)}
			</li>
		))
	);
};

export default MenuBlock;
