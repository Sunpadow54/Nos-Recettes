import { useEffect, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
/* Import Style */
import "./admin.scss";
// Imports Icons
import { IoNewspaperOutline } from "react-icons/io5";
import { HiUserGroup } from "react-icons/hi";
import {
	BsPersonPlus,
	BsPersonBoundingBox,
	BsPeople,
	/* BsPencilSquare, */
} from "react-icons/bs";
import { FaCarrot /* FaUsers */ } from "react-icons/fa";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { MdEdit } from "react-icons/md";
// Import Components
import StatBox from "../../../components/StatBox/StatBox";
import MenuCollapse from "../../../components/MenuCollapse/MenuCollapse";

function Admin() {
	const { setTitle } = useOutletContext();
	const [subtitle, setSubtitle] = useState("");
	useEffect(() => {
		setTitle("Administration");
	}, [setTitle]);

	const navMenu = [
		{
			name: "Utilisateurs",
			icon: <BsPeople />,
			submenu: [
				{
					icon: <BsPersonPlus />,
					title: "nouveau",
					path: "/admin/user/create",
				},
				{
					icon: <BsPersonBoundingBox />,
					title: "modérer",
					path: "/admin/user/moderer",
				},
			],
		},
		{
			name: "ingrédients",
			icon: <FaCarrot />,
			submenu: [
				{
					title: "ajouter",
					icon: <IoMdAdd />,
					path: "/admin/ingredient/create",
				},
				{
					title: "modifier",
					icon: <MdEdit />,
					path: "/admin/ingredient/edit",
				},
				{
					title: "supprimer",
					icon: <IoMdRemove />,
					path: "/admin/ingredient/delete",
				},
			],
		},
	];

	return (
		<div className="admin">
			<MenuCollapse navclassName="admin-nav" navMenu={navMenu} />
			<div className="admin-container">
				<div className="admin-container__stats">
					<StatBox
						text="chefs"
						nbr="5"
						icon={<HiUserGroup />}
						colorBg="gold"
					/>
					<StatBox
						text="recettes"
						nbr="10"
						icon={<IoNewspaperOutline />}
						colorBg="gold"
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
