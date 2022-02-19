import { useContext } from "react";
import { useParams } from "react-router-dom";
/* Import Style */
import "./recipe.scss";
/* Import Components */
import { UserContext } from "../../../store/Store";
import useFetch from "../../../hooks/useFetch";
import useToggleEdit from "../../../hooks/useToggleEdit";
import useRecipeForm from "../../../hooks/useRecipeForm";
import HeaderCard from "../../../components/RecipeCards/HeaderCard";
import InfosCard from "../../../components/RecipeCards/InfosCard";
import IngredientsList from "../../../components/RecipeCards/IngredientsList";
import StepsList from "../../../components/RecipeCards/StepsList";
import BtnBrand from "../../../components/Buttons/BtnBrand";
import FormControls from "../../../components/FormControls/FormControls";
import FormControlsList from "../../../components/FormControls/FormControlsList";


function Recipe() {
	const { id } = useParams();
	const [currentUser] = useContext(UserContext);
	const { data: recipe, error } = useFetch({
		endpoint: "/recipe/" + id,
		method: "GET",
		auth: true,
	});
	const isMyRecipe = recipe && recipe.authorId === currentUser.id && true;
    const { btnEdit, isEdit } = useToggleEdit();

	const {
		inputsProps,
		ingredients,
		preparations,
		handleRemoveInput,
		handleSubmit,
	} = useRecipeForm({ recipe });
    
	const inputsInfo = [inputsProps.duration, inputsProps.category];

	return (
		<div className="recipe-alone">
			{recipe && (
				<>
					<HeaderCard recipe={recipe} alone>
						{isEdit && (
							<FormControls {...inputsProps.title} resizable />
						)}
					</HeaderCard>

					{isMyRecipe && (
						<div className="recipe-alone__edit-btn">{btnEdit}</div>
					)}

					<InfosCard recipe={recipe}>
						{isEdit &&
							inputsInfo.map((input, i) => (
								<FormControls key={i} {...input} resizable />
							))}
					</InfosCard>

					<IngredientsList ingredients={recipe.ingredients} alone>
						{isEdit &&
							ingredients.map((ingredient, i) => (
								<FormControlsList
									key={ingredient}
									index={i}
									inputprops={inputsProps.ingredients[i]}
									resizable
									handleRemoveInput={(e) => {
										handleRemoveInput("ingredients", i);
									}}
								/>
							))}
					</IngredientsList>

					<StepsList steps={recipe.preparation}>
						{isEdit &&
							preparations.map((step, i) => (
								<FormControlsList
									key={step}
									index={i}
									inputprops={inputsProps.preparation[i]}
									handleRemoveInput={(e) => {
										handleRemoveInput("preparations", i);
									}}
								/>
							))}
					</StepsList>
					{isEdit && (
						<BtnBrand
							type="submit"
							text="Enregistrer"
							color="green"
							onClick={handleSubmit}
						/>
					)}
				</>
			)}
			{error && <p>{error}</p>}
		</div>
	);
}

export default Recipe;
