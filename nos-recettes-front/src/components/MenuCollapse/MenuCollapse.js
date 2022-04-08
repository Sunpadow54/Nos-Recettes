import classNames from "classnames";
import { useState } from "react";
import { NavLink } from "react-router-dom";
/* Import Style */
import "./menuCollapse.scss";

function MenuCollapse({ navMenu, navclassName }) {
	const [activeSection, setActiveSection] = useState(null);

	// Handles
	const toogleShow = (section) => {
		if (section === activeSection) {
			setActiveSection(null);
		} else {
			setActiveSection(section);
		}
	};

	return (
		<nav className={`${navclassName} nav-collapse`}>
			{navMenu.map((block, i) => (
				<div
					key={block.name}
					className={classNames(
						"navbloc",
						block.name === activeSection && "navbloc--show"
					)}
				>
					<h3
						className="navbloc__title"
						onClick={() => toogleShow(block.name)}
					>
						{block.icon && block.icon}
						{block.name}
					</h3>
					<ul className="navbloc__links">
						{block.submenu.map((link, j) => (
							<li
								key={`${block.name}/${link.title}`}
								className="navlink"
							>
								<NavLink
									to={link.path}
									className={({ isActive }) =>
										classNames(
											"navlink__item",
											isActive && "navlink__item--active"
										)
									}
								>
									{link.icon && link.icon}
									{link.title}
								</NavLink>
							</li>
						))}
					</ul>
				</div>
			))}
		</nav>
	);
}

export default MenuCollapse;
