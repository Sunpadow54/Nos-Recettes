import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
/* Import Style */
import "./home.scss";
/* Import Components */
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

function Home() {
	const [sidebarState, setSidebarState] = useState(false);

	const location = useLocation();

	const getTitle = () => {
		switch (location.pathname) {
			case "/":
				return "Toutes les recettes";
			case "/entrees":
				return "Toutes les entrées";
			case "/plats":
				return "Tous les plats";
			case "/desserts":
				return "Tous les desserts";
			case "/autres":
				return "Les autres recettes";
			case "/create":
				return "Créer sa recette";
			case "/profil":
				return "Votre Profil";
			default:
				return "";
		}
	};

	const pageTitle = getTitle();

	return (
		<>
			<Header sidebarState={sidebarState} />
			<Sidebar
				setSidebarState={setSidebarState}
				sidebarState={sidebarState}
			/>
			<main
				className={
					"main-home " +
					(sidebarState ? "main-home--shrink" : "main-home--grow")
				}
			>
				<section className="main-container">
					<h2 className="main-container__title">{pageTitle}</h2>
					<Outlet />
				</section>
			</main>
		</>
	);
}

export default Home;
