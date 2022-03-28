import { useEffect, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
/* Import Style */
import "./admin.scss";
// Imports Icons
import { IoNewspaperOutline } from "react-icons/io5";
import { HiUserGroup } from "react-icons/hi";
import { BsPersonPlus,BsPersonBoundingBox,BsPencilSquare } from "react-icons/bs";
import { FaCarrot } from "react-icons/fa";
// Import Components
import StatBox from "../../../components/StatBox/StatBox";
import NavAdmin from "../../../components/NavAdmin/NavAdmin";

function Admin() {
	const { setTitle } = useOutletContext();
	const [subtitle, setSubtitle] = useState("");
	useEffect(() => {
		setTitle("Administration");
	}, [setTitle]);

	const navMenu = [
		{
			title: "Utilisateurs",
			submenu: [
				{
					icon: <BsPersonPlus />,
					text: "nouveau",
					to: "create",
				},
				/* {
					icon: <BsPersonBoundingBox />,
					text: "modérer",
					to: "create",
				}, */
			],
		},
		{
			title: "Recettes",
			submenu: [
				/* {
					icon: <BsPencilSquare />,
					text: "recettes à modifier",
					to: "create",
				}, */
				{
					icon: <FaCarrot />,
					text: "modifier des ingrédients",
					to: "ingredients",
				},
			],
		},
	];

	return (
		<div className="admin">
			<NavAdmin navMenu={navMenu} />
			<div className="admin-container">
				<div className="stats">
					<StatBox
						text="chefs"
						nbr="5"
						icon={<HiUserGroup />}
						color="blue"
					/>
					<StatBox
						text="recettes"
						nbr="10"
						icon={<IoNewspaperOutline />}
						color="green"
					/>
				</div>
				<div className="admin-panel">
					<h3 className="admin-panel__title">{subtitle}</h3>
					<Outlet context={{ setSubtitle }} />
				</div>
			</div>
		</div>
	);
}

export default Admin;
