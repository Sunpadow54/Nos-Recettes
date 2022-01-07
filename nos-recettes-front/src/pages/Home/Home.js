import { useState } from "react";
import { Outlet } from "react-router-dom";
/* Import Style */
import "./home.scss";
/* Import Components */
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

function Home() {
	const [sidebarState, setSidebarState] = useState(false);

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
					<h2 className="main-container__title">
						Toutes les recettes
					</h2>
					<Outlet />
				</section>
			</main>
		</>
	);
}

export default Home;
