import classNames from "classnames";
import { useState } from "react";
import { Link } from "react-router-dom";
/* Import Style */
import "./navAdmin.scss";

function NavAdmin({ navMenu }) {
	const [activeLink, setActiveLink] = useState([]);
	// Handles
	const handleActive = (menuIndex, linkIndex) => {
		setActiveLink([menuIndex, linkIndex]);
	};

	return (
		<nav className="navbloc">
			{navMenu.map((block, i) => (
				<>
					<p key={block} className="navbloc-title">
						{block.title}
					</p>
					<ul className="navbloc-group">
						{block.submenu.map((link, j) => (
							<li key={block[j]}>
								<Link
									to={"/admin/" + link.to}
									className={classNames(
										"navbloc-group__link",
										activeLink[0] === i &&
											activeLink[1] === j &&
											"navbloc-group__link--active"
									)}
									onClick={() => handleActive(i, j)}
								>
									{link.icon}
									{link.text}
								</Link>
							</li>
						))}
					</ul>
				</>
			))}
		</nav>
	);
}

export default NavAdmin;
