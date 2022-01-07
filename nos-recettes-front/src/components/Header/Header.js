import { /* Link, */ NavLink } from "react-router-dom";
/* Import Style */
import "./header.scss";
/* Import icons */
import { MdOutlineArrowRight } from "react-icons/md";

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

	let activeLinkKey = 0;
	let activeLink = links[activeLinkKey];

	return (
		<header className="header">
			<h1
				className={`header__title  
					${sidebarState ? "header__title--shrink" : "header__title--grow"}`}
			>
				Nos Recettes
			</h1>
			<nav>
				<ul
					className={`breadcrumb   
					${sidebarState ? "breadcrumb--shrink" : "breadcrumb--grow"}`}
				>
					{links.map((link, id) => (
						<li key={id}>
							<NavLink
                                to={link.src}
								className={(navData) =>
									navData.isActive
										? "breadcrumb__link breadcrumb__link--active"
										: "breadcrumb__link"
								}
							>
								{activeLink === link ? (
									<MdOutlineArrowRight />
								) : null}
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
