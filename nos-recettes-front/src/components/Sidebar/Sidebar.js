import { useContext } from "react";
import classNames from "classnames";
/* Import Style */
import "./sidebar.scss";
/* Import Icons */
import { IoMdAdd } from "react-icons/io";
import { RiUserSmileLine, RiVipCrownLine } from "react-icons/ri";
import { IoSearchSharp, IoMenuOutline } from "react-icons/io5";
/* Import components */
import { UserContext } from "../../store/Store";
import BtnBrand from "../Buttons/BtnBrand";

function Sidebar({ sidebarState, setSidebarState }) {
	const [currentUser] = useContext(UserContext);
	const links = [
		{
			text: "créer une recette",
			icon: IoMdAdd,
			src: "/create",
			color: "green",
		},
		{
			text: "mon profil",
			icon: RiUserSmileLine,
			src: "/profil/2",
			color: "blue",
		},
		{
			text: "admin",
			icon: RiVipCrownLine,
			src: "/",
			color: "gold",
		},
		{
			text: "recherche",
			icon: IoSearchSharp,
			src: "/",
			color: "transparent",
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
				<h2 className="sidebar__title">
					Bon Appétit {currentUser.username} !
				</h2>
				<ul className="sidebar__nav ul-test">
					{links.map((link, id) => (
						<li key={id}>
							<BtnBrand {...link} icon={<link.icon />} />
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
}

export default Sidebar;
