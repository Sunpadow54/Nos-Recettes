/* --- Imports --- */
import { Link } from "react-router-dom";
// Import img placeholder
import placeholderImg from "../img/lukas-blazek-f-TWhXOrLiU-unsplash.jpg";
// Import Icons
import { MdTimer } from "react-icons/md";

const Recipes = ({ recipes }) => {
    // placeholder img for cards, if there isn't any
    const handleImg = (imgSrc) => {
        if (imgSrc) return imgSrc;
        else return placeholderImg;
    };

    return (
        <section className="recipes">
            <h2>Toutes les Recettes :</h2>
            <ul className="recipes__cards">
                {recipes.map((recipe) => (
                    <li key={recipe.id} className="recipe">
                        <div className="recipe-top">
                            <div className="recipe-top__title">
                                <h3>{recipe.title}</h3>
                            </div>
                            <img
                                className="recipe-top__img"
                                src={handleImg(recipe.img)}
                                alt={handleImg(recipe.img)}
                            />
                        </div>
                        <span className="recipe-timer">
                            <MdTimer /> {recipe.duration}
                        </span>
                        <div className="recipe-ingredients">
                            <ul className="recipe-ingredients__list">
                                {recipe.ingredients.map((ingredient) => (
                                    <li key={ingredient}>{ingredient}</li>
                                ))}
                            </ul>
                        </div>
                        <Link
                            to={`/recette/${recipe.id}`}
                            className="recipe__see-more"
                        >
                            voir la recette
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Recipes;
