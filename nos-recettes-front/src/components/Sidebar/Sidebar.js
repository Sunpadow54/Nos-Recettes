import { Link } from "react-router-dom";
import classNames from "classnames";
/* Import Style */
import "./sidebar.scss";
/* Import Icons */
import { IoMdAdd } from "react-icons/io";
import { RiUserSmileLine } from "react-icons/ri";
import { IoSearchSharp } from "react-icons/io5";
import { IoMenuOutline } from "react-icons/io5";

function Sidebar({ sidebarState, setSidebarState }) {
	const links = [
		{
			txt: "créer une recette",
			icon: IoMdAdd,
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

	const getClasses = (name) => {
		return classNames(
			name,
			sidebarState ? name + "--show" : name + "--hide"
		);
	};

	return (
		<div>
			<button
				className={getClasses("sidebar-btn")}
				onClick={toogleSidebar}
			>
				{sidebarState ? "X" : <IoMenuOutline />}
			</button>
			<nav className={getClasses("sidebar")}>
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
