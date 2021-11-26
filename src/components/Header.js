import { useState } from "react";
/* import components */
import Breadcrumb from "./Breadcrumb";
import Sidebar from "./Sidebar";
/* import icon */
import { GiForkKnifeSpoon } from "react-icons/gi";
/* import { AiOutlineMenuFold } from "react-icons/ai"; */
import { IoIosArrowBack } from "react-icons/io";

const Header = (props) => {
	// ---- Breadcrumb
	const breadcrumbLinks = [
		"toutes les recettes",
		"entrées",
		"plats",
		"desserts",
	];
	/* define the key of breadcrumbLinks which is active */
	const activeLinkKey = 0;

	// ---- Sidebar
	const [isHidden, setHidden] = useState(false);
	const toogleSidebar = () => {
		setHidden(!isHidden);
		props.toogleShrink(isHidden);
	};

	return (
		<header>
			<h1 className={`${isHidden ? "grow" : "shrink"}`}>
				<GiForkKnifeSpoon /> TITRE DU SITE
			</h1>

            <nav className={`${isHidden ? "grow" : "shrink"}`}>
                <Breadcrumb
                    breadcrumbLinks={breadcrumbLinks}
                    activeLinkKey={activeLinkKey}
                />
            </nav>

			<div className={`sidebar ${isHidden ? "sidebar--hide" : false}`}>
				<button className="btn-slide" onClick={toogleSidebar}>
					<IoIosArrowBack />
				</button>
				<Sidebar />
			</div>
		</header>
	);
};

export default Header;
