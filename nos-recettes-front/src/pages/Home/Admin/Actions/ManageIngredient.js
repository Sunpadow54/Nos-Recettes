import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
/* Style */
import "./actions.scss";
/* Icons */
import { MdEdit, MdDeleteForever, MdOutlineFindReplace } from "react-icons/md";
/* Components */
import useIngredientForm from "../../../../hooks/useIngredientForm";
import FormControls from "../../../../components/FormControls/FormControls";
import FormAutoComplete from "../../../../components/FormControls/FormAutoComplete";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import RecipesList from "../../../../components/RecipesList/RecipesList";
import BtnSimpleIcon from "../../../../components/Buttons/BtnSimpleIcon";
import Table from "../../../../components/Table/Table";

function ManageIngredient() {
	const { setSubtitle } = useOutletContext();
	const [ingredients, setIngredients] = useState("");
	const [selectedOption, setSelectedOption] = useState();

	const {
		inputs,
		handleEdit,
		handleReplace,
		handleDelete,
		data: ingrEdited,
	} = useIngredientForm(ingredients);

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

	// ingredients edited / delete ---> render changes
	useEffect(() => {
		if (ingrEdited) {
			// if edit or delete is a success
			let newIngredients = [...ingredients];
			const index = newIngredients.findIndex(
				(item) => item.id === ingrEdited.id
			);
			// edit ? --> render new name of the ingredient edited
			if (ingrEdited.name) {
				newIngredients[index].name = ingrEdited.name;
			}
			// delete ? --> delete this ingredient
			else {
				newIngredients.splice(index, 1);
			}

			setIngredients(newIngredients);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ingrEdited]);

	return (
		<div className="action-form">
			<SearchBar
				endpoint="/ingredient"
				setSearchResult={setIngredients}
			/>
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
							<BtnSimpleIcon
								{...btnProps.delete}
								onClick={(e) => handleDelete(e, ingredient.id)}
							/>
						),
						ingredient.recipes && (
							<div className="table-recipes">
								<FormAutoComplete
									label="Remplacer par ..."
									endpoint="/ingredient"
									btn={
										<BtnSimpleIcon
											{...btnProps.replace}
											onClick={(e) =>
												handleReplace(
													e,
													ingredient.id,
													selectedOption.id
												)
											}
										/>
									}
									setSelected={setSelectedOption}
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
