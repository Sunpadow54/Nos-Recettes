/* --- Imports --- */
import placeholderImg from "../img/lukas-blazek-f-TWhXOrLiU-unsplash.jpg";
// Icons
import { MdTimer } from "react-icons/md";
import { GiCookingPot } from "react-icons/gi";

const Recipe = ({ recipe }) => {
	const handleImg = (imgSrc) => {
		if (imgSrc) return imgSrc;
		else return placeholderImg;
	};

	return (
		<div className="recipe">
			{/* recipe top */}
			<h3>{recipe.title}</h3>
			<span>
				<MdTimer /> {recipe.duration}
			</span>
			<img src={handleImg(recipe.img)} alt={handleImg(recipe.img)} />
			<h4>Ingrédients : </h4>
			{/* recipe ingredients */}
			<ul className="recipe__ingredients">
				{recipe.ingredients.map((ingredient) => (
					<li key={ingredient}>{ingredient}</li>
				))}
			</ul>
			{/* recipe directions steps */}
			<h4>
				<GiCookingPot /> Préparation :
			</h4>
			<ul>
				{recipe.directions.map((step) => (
					<li className="recipe__steps" key={step.id}>
						<h5>Étape {step.id} :</h5>
						<p>{step.stepTxt}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Recipe;
