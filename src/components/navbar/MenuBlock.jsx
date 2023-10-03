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
				<NavLink to={item.to} title={item.title}>
					{/* {item.icon} */}
					{item.menu}
				</NavLink>
				{item.children && (
					<ul className="sub-menu" title={item.title}>
						<MenuBlock menuData={item.children} />
					</ul>
				)}
			</li>
		))
	);
};

export default MenuBlock;
