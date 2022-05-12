import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
/* Import Style */
import "./actions.scss";
/* Import Icons */
import { MdEdit, MdDeleteForever } from "react-icons/md";
/* Import Components */
import useFetch from "../../../../hooks/useFetch";
import useIngredientForm from "../../../../hooks/useIngredientForm";
import FormControls from "../../../../components/FormControls/FormControls";
import SearchBar from "../../../../components/SearchBar/SearchBar";

function ManageIngredient() {
	const { setSubtitle } = useOutletContext();
	const [searchString, setSearchString] = useState("");
	const [ingredients, setIngredients] = useState("");

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
				<table>
					<thead>
						<tr>
							<th>ingrédient</th>
							<th>modifier</th>
							<th>supprimer</th>
						</tr>
					</thead>
					<tbody>
						{ingredients.map((ingredient, i) => (
							<tr key={i}>
								<td>
									<p>{ingredient.name}</p>
								</td>
								<td>
									<div>
										<FormControls {...inputs[i]} label="" />
										<button
											className="button-simple"
											onClick={(e) =>
												handleEdit(e, ingredient.id)
											}
										>
											<MdEdit />
										</button>
									</div>
								</td>
								{
									<td>
										<div>
											<button>
												<MdDeleteForever />
											</button>
										</div>
									</td>
								}
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}

export default ManageIngredient;
