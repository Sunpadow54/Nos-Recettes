import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
/* Import Style */
import "./actions.scss";
/* Import Icons */
import { MdEdit, MdDeleteForever, MdOutlineFindReplace } from "react-icons/md";
/* Import Components */
import useFetch from "../../../../hooks/useFetch";
import useIngredientForm from "../../../../hooks/useIngredientForm";
import FormControls from "../../../../components/FormControls/FormControls";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import RecipesList from "../../../../components/RecipesList/RecipesList";
import BtnSimpleIcon from "../../../../components/Buttons/BtnSimpleIcon";
import Table from "../../../../components/Table/Table";

function ManageIngredient() {
	const { setSubtitle } = useOutletContext();
	const [searchString, setSearchString] = useState("");
	const [ingredients, setIngredients] = useState("");
	/* const [rowShowned, setRowShowned] = useState(""); */

	const { data: ingredientsFound, sendToApi } = useFetch({
		endpoint: "/ingredient?search=" + searchString,
		method: "GET",
		auth: true,
		wait: true,
	});

	const {
		inputs,
		handleEdit,
		data: ingrEdited,
	} = useIngredientForm(ingredients);

	// -------- Handles

	const handleSearch = (e) => {
		if (e.target.value !== "") {
			setSearchString(e.target.value);
			sendToApi();
		}
	};

	// -------- Buttons

	const btnProps = {
		edit: {
			icon: <MdEdit />,
			color: { text: "grey" },
			label: "modifier l'ingredient",
		},
		delete: {
			icon: <MdDeleteForever />,
			color: { text: "red" },
			label: "supprimer l'ingredient",
		},
		replace: {
			icon: <MdOutlineFindReplace />,
			color: { text: "red" },
			label: "remplacer et supprimer l'ingredient",
		},
	};

	const columns = [
		{ title: "ingrédient", scope: true },
		{ title: "modifier" },
		{ title: "supprimer", hasToogleBtn: true },
	];

	// -------- Effects

	useEffect(() => {
		setSubtitle("Gérer un ingrédient");
	}, [setSubtitle]);

	// ingredients fetched
	useEffect(() => {
		setIngredients(ingredientsFound);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ingredientsFound]);

	// ingredients edited
	useEffect(() => {
		if (ingrEdited) {
			// if edit is a success render new name of the ingredient edited
			let newIngredients = [...ingredients];
			const index = newIngredients.findIndex(
				(item) => item.id === ingrEdited.id
			);
			newIngredients[index].name = ingrEdited.name;
			setIngredients(newIngredients);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ingrEdited]);

	return (
		<div className="action-form">
			<SearchBar onChange={handleSearch} />
			{ingredients && (
				<Table columns={columns}>
					{ingredients.map((ingredient, i) => [
						<p>{ingredient.name}</p>,
						<FormControls
							{...inputs[i]}
							label=""
							btn={
								<BtnSimpleIcon
									{...btnProps.edit}
									onClick={(e) =>
										handleEdit(e, ingredient.id)
									}
								/>
							}
						/>,
						ingredient.recipes ? (
							<MdOutlineFindReplace />
						) : (
							<BtnSimpleIcon {...btnProps.delete} />
						),
						ingredient.recipes && (
							<div className="table-recipes">
								<FormControls
									label="Remplacer par ..."
									btn={
										<BtnSimpleIcon {...btnProps.replace} />
									}
								/>
								<RecipesList
									query={{
										id: ingredient.recipes,
									}}
									small
									title={`il y a ${ingredient.recipes.length} recette avec cet ingrédient :`}
									border
								/>
							</div>
						),
					])}
				</Table>
			)}
		</div>
	);
}

export default ManageIngredient;
