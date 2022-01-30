import classNames from "classnames";
import { /* Link, */ NavLink } from "react-router-dom";
/* Import Style */
import "./header.scss";

const Header = ({ sidebarState }) => {
	const links = [
		{
			txt: "toutes les recettes",
			src: "/",
		},
		{
			txt: "entrées",
			src: "/entrees",
		},
		{
			txt: "plats",
			src: "/plats",
		},
		{
			txt: "desserts",
			src: "/desserts",
		},
		{
			txt: "autres",
			src: "/autres",
		},
	];

	const hasGrowClass = (name) => {
		return classNames(name, !sidebarState && name + "--grow");
	};

	return (
		<header className="header">
			<h1 className={hasGrowClass("header__title")}>Nos Recettes</h1>
			<nav>
				<ul className={hasGrowClass("breadcrumb")}>
					{links.map((link, id) => (
						<li key={id}>
							<NavLink
								to={link.src}
								className={({ isActive }) =>
									classNames(
										"breadcrumb__link",
										isActive && "breadcrumb__link--active"
									)
								}
							>
								{link.txt}
							</NavLink>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
};

export default Header;
