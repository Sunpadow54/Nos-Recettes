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
		<li className="recipe">
            <div className="recipe-top">
                <div className="recipe-top__title">
                    <h3>{recipe.title}</h3>
                </div>
                <img className="recipe-top__img" src={handleImg(recipe.img)} alt={handleImg(recipe.img)} />
            </div>
			
            <span className="recipe__timer">
				<MdTimer /> {recipe.duration}
			</span>
			<h4>Ingrédients : </h4>
			<ul className="recipe__ingredients">
				{recipe.ingredients.map((ingredient) => (
					<li className="recipe__ingredients--tags" key={ingredient}>{ingredient}</li>
				))}
			</ul>
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
		</li>
	);
};

export default Recipe;
