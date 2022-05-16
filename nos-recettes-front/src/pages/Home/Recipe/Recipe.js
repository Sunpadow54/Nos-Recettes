import { useContext } from "react";
import { useParams } from "react-router-dom";
/* Import Style */
import "./recipe.scss";
/* Import Icons */
import { IoMdAdd, IoMdClose } from "react-icons/io";
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
		state,
		inputs,
		inputStep,
		inputIngredient,
		handleAddInput,
		handleRemoveInput,
		handleEdit,
	} = useRecipeForm(recipe);

	const inputsInfo = [inputs.duration, inputs.category];

	const BtnAdd = ({ label, type }) => {
		return (
			<BtnBrand
				icon={<IoMdAdd />}
				round
				color="blue"
				label={label}
				onClick={() => handleAddInput(type)}
			/>
		);
	};

	const BtnRemove = ({ type, index }) => {
		return (
			<BtnBrand
				label="supprimer"
				icon={<IoMdClose />}
				color="grey"
				round
				border0
				onClick={() => {
					handleRemoveInput(type, index);
				}}
			/>
		);
	};

	return (
		<div className="recipe-alone">
			{recipe && (
				<>
					<HeaderCard recipe={recipe} alone>
						{isEdit && (
							<FormControls {...inputs.title} resizable noLabel />
						)}
					</HeaderCard>
					<InfosCard recipe={recipe}>
						{isEdit &&
							inputsInfo.map((input, i) => (
								<FormControls
									key={i}
									{...input}
									resizable
									noLabel
								/>
							))}
					</InfosCard>

					{isMyRecipe && (
						<div className="recipe-alone__edit-btn">{btnEdit}</div>
					)}

					<div className="recipe-alone__ing">
						<IngredientsList ingredients={recipe.ingredients}>
							{isEdit &&
								state.ingredients.map((ingredient, i) => (
									<FormControlsList
										key={i}
										inputprops={inputIngredient[i]}
										resizable
										noLabel
										btn={
											<BtnRemove
												type="removeIng"
												index={i}
											/>
										}
									/>
								))}
						</IngredientsList>
						{isEdit && (
							<div className="btn-add">
								<BtnAdd
									label="Ajouter un ingrédient"
									type="addIng"
								/>
							</div>
						)}
					</div>

					<div className="recipe-alone__prep">
						<StepsList steps={recipe.preparation}>
							{isEdit &&
								state.preparation.map((step, i) => (
									<FormControlsList
										key={i}
										noLabel
										inputprops={inputStep[i]}
										btn={
											<BtnRemove
												type="removeSteps"
												index={i}
											/>
										}
									/>
								))}
						</StepsList>
						{isEdit && (
							<div className="btn-add">
								<BtnAdd
									label="Ajouter une étape"
									type="addSteps"
								/>
							</div>
						)}
					</div>

					{isEdit && (
						<BtnBrand
							type="submit"
							text="Enregistrer"
							color="green"
							onClick={handleEdit}
						/>
					)}
				</>
			)}
		</div>
	);
}

export default Recipe;
