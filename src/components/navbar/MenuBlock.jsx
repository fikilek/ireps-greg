import React from 'react'
import { NavLink } from 'react-router-dom'

const MenuBlock = ({ menuData, classes }) => {
  return (
			menuData &&
			menuData.map(item => (
				<li key={item.to} className={classes}>
					<NavLink to={item.to}>
            {item.menu}{item.icon}
					</NavLink>
					{item.children && (
						<ul className="sub-menu">
							<MenuBlock menuData={item.children} />
						</ul>
					)}
				</li>
			))
		);
}

export default MenuBlock