import { Link } from "react-router-dom";
/* Import Style */
import "./sidebar.scss";
/* Import Icons */
import { GrAdd } from "react-icons/gr";
import { RiUserSmileLine } from "react-icons/ri";
import { IoSearchSharp } from "react-icons/io5";
import { IoMenuOutline } from "react-icons/io5";

function Sidebar({ sidebarState, setSidebarState }) {
	const links = [
		{
			txt: "créer une recette",
			icon: GrAdd,
			src: "/create",
		},
		{
			txt: "mon profil",
			icon: RiUserSmileLine,
			src: "/profil",
		},
		{
			txt: "recherche",
			icon: IoSearchSharp,
			src: "/",
		},
	];

	const toogleSidebar = () => {
		setSidebarState(!sidebarState);
	};

	return (
		<div>
			<button
				className={`${
					sidebarState
						? "sidebar-btn sidebar-btn--show"
						: "sidebar-btn sidebar-btn--hide"
				}`}
				onClick={toogleSidebar}
			>
				{sidebarState ? "X" : <IoMenuOutline />}
			</button>
			<nav
				className={`${
					sidebarState
						? "sidebar sidebar--show"
						: "sidebar sidebar--hide"
				}`}
			>
				<h2 className="sidebar__title">Bon Appétit Username !</h2>
				<ul className="sidebar__nav">
					{links.map((link, id) => (
						<li key={id}>
							<Link className="sidebar__link" to={link.src}>
								<link.icon />
								{link.txt}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
}

export default Sidebar;
