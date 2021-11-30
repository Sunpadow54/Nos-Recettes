import { Link } from "react-router-dom";
/* import Components */
/* import Button from './Button'; */
// import Icons
import { GrAdd } from "react-icons/gr";
import { RiUserSmileLine } from "react-icons/ri";
import { IoSearchSharp } from "react-icons/io5";

const Sidebar = () => {
	/* variables */
	const name = "User name";

	return (
		<div className="sidebar-content">
			<h2>Hello {name} !</h2>
			<p>Bon Appétit !</p>
			<nav className="sidebar-content-nav">
				<Link
					to="/create"
					className="sidebar-content-nav__btn sidebar-content-nav__btn--create"
				>
					<GrAdd /> Créer une Recette
				</Link>
				<Link
					to="/profile"
					className="sidebar-content-nav__btn sidebar-content-nav__btn--profil"
				>
					<RiUserSmileLine /> Mon Profil
				</Link>
				<Link
					to="/"
					className="sidebar-content-nav__btn sidebar-content-nav__btn--search"
				>
					<IoSearchSharp /> Recherche
				</Link>
				{/* <Button
                    href='/create'
                    className="sidebar-content-nav__btn sidebar-content-nav__btn--create"
                    btnText='Créer une Recette'
                    btnType='addRecipe'
                />
                <Button
                    href={goToProfile}
                    className="sidebar-content-nav__btn sidebar-content-nav__btn--profil"
                    btnText='Mon Profil'
                    btnType='profile'
                />
                <Button
                    href={goToProfile}
                    className="sidebar-content-nav__btn sidebar-content-nav__btn--search"
                    btnText='Recherche'
                    btnType='search'
                /> */}
			</nav>
		</div>
	);
};

export default Sidebar;
