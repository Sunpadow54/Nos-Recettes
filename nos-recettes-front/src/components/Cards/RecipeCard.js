import { Link } from "react-router-dom";
/* Import Style */
import "./recipeCard.scss";
// Import img placeholder
import placeholderImg from "../../style/images/lukas-blazek-f-TWhXOrLiU-unsplash.jpg";

function RecipeCard(props) {
	const { recipe, alone } = props;
	const urlFormated = `/${recipe.title.toLowerCase().replace(/\s/g, "-")}/${
		recipe.id
	}`;

	const ConditionalLink = ({ children }) =>
		alone ? <>{children}</> : <Link to={urlFormated}>{children}</Link>;

	const concat = (el) => {
		let article = el.name[0].match(/[aeiouh]/) ? "d'" : "de ";
        article = el.unit ? article : "";
		return el.quantity + " " + el.unit + " " + article + el.name;
	};

	const New = () => {
		const month = 2629746000; // in ms
		const diff = Date.now() - new Date(recipe.date);
		const isNew = diff > month ? false : true;
		return isNew ? <span className="card__new">New</span> : null;
	};

	return (
		<div>
			<ConditionalLink>
				<img
					src={recipe.img ? recipe.img : placeholderImg}
					alt={recipe.title}
					className="card__img"
					width="400px"
					height={alone ? "444px" : "300px"}
				/>
				<New />
				<h3 className="card__title">{recipe.title}</h3>
			</ConditionalLink>

			{!alone ? (
				<ul className="card__ingredients">
					{recipe.ingredients.map((ingredient) => (
						<li key={ingredient} className="card__ingredients-item">
							{ingredient}
						</li>
					))}
				</ul>
			) : (
				<div className="card__description">
					<h4>Ingrédients</h4>
					<ul>
						{recipe.ingredients.map((ingredient) => (
							<li key={ingredient.name}>{concat(ingredient)}</li>
						))}
					</ul>
					<h4>Préparation</h4>
					<ul>
						{recipe.preparation.map((step, i) => (
							<li key={i}>
								<h5>{`étape ${i + 1}:`}</h5>
								<p>{step}</p>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

export default RecipeCard;
