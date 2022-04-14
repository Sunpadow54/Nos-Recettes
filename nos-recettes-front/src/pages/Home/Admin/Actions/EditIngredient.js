import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import classNames from "classnames";
/* Import Style */
import "./actions.scss";
/* Import Components */
import useFetch from "../../../../hooks/useFetch";
import useIngredientForm from "../../../../hooks/useIngredientForm";
import FormControls from "../../../../components/FormControls/FormControls";
import BtnBrand from "../../../../components/Buttons/BtnBrand";
import SearchBar from "../../../../components/SearchBar/SearchBar";

function EditIngredient() {
	const { setSubtitle } = useOutletContext();
	const [search, setSearch] = useState(null);
	const [selected, setSelected] = useState({ name: "", id: null });

	const { data: ingredients, sendToApi } = useFetch({
		endpoint: "/ingredient?search=" + search,
		method: "GET",
		auth: true,
		wait: true,
	});

	const {
		inputs,
		handleEdit,
		data: ingrEdited,
	} = useIngredientForm(selected);

	// -------- Handles

	const handleSearch = (e) => {
		if (e.target.value !== "") {
			setSearch(e.target.value);
		}
	};
	const handleSelect = (ingredient) => {
		setSelected(ingredient);
	};

	// -------- Effects

	useEffect(() => {
		setSubtitle("Modifier un ingrédient");
	}, [setSubtitle]);

	// search ingredients
	useEffect(() => {
		sendToApi();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search]);

	// if ingredient search return only one element
	useEffect(() => {
		if (ingredients && ingredients.length === 1) {
			setSelected(ingredients[0]);
		}
	}, [ingredients]);

	return (
		<div className="edit-ingredient action-form">
			<div className="edit-ingredient__search">
				<SearchBar onChange={handleSearch} />
				{ingredients && (
					<ul className="ingredient-list">
						{ingredients.map((ingredient, i) => (
							<li key={i}>
								<button
									className={classNames(
										"ingredient-list__btn",
										ingredient.id === selected.id &&
											"ingredient-list__btn--active"
									)}
									onClick={() => handleSelect(ingredient)}
								>
									{ingrEdited &&
									ingrEdited.id === ingredient.id
										? ingrEdited.name
										: ingredient.name}
								</button>
							</li>
						))}
					</ul>
				)}
			</div>
			<form
				autoComplete="off"
				id="edit-ingredient"
				className={classNames(
					"edit-ingredient__form",
					selected && "edit-ingredient__form--show"
				)}
				onSubmit={handleEdit}
			>
				<div className="edit-ingredient__form-group">
					<FormControls
						{...inputs[0]}
						/* resizable */ label="nouveau nom"
					/>
					<BtnBrand
						form="edit-ingredient"
						type="submit"
						text="Modifier"
						color="green"
					/>
				</div>
			</form>
		</div>
	);
}

export default EditIngredient;
