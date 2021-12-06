/* --- Imports --- */
import { useParams } from "react-router";
// Import img placeholder
import placeholderImg from "../img/lukas-blazek-f-TWhXOrLiU-unsplash.jpg";
// Icons
import { MdTimer } from "react-icons/md";
import { GiCookingPot } from "react-icons/gi";

const Recipe = ({ recipes }) => {
    const { id } = useParams();
    // This need to change to fetch
    const recipe = recipes.find(e => e.id === parseInt(id));

    // placeholder img for cards, if there isn't any
    const handleImg = (imgSrc) => {
        if (imgSrc) return imgSrc;
        else return placeholderImg;
    };

    return (
        <section>
            <h2> {recipe.title}</h2>
            <div className="recipe">
                <div className="recipe-top">
                    <div className="recipe-top__title">
                        <h3>{recipe.title}</h3>
                    </div>
                    <img className="recipe-top__img" src={handleImg(recipe.img)} alt={handleImg(recipe.img)} />
                </div>
                <span className="recipe-timer">
                    <MdTimer /> {recipe.duration}
                </span>
                <div className="recipe-ingredients">
                    <h4>Ingrédients : </h4>
                    <ul className="recipe-ingredients__list">
                        {recipe.ingredients.map((ingredient) => (
                            <li key={ingredient}>{ingredient}</li>
                        ))}
                    </ul>
                </div>
                <div className="recipe-steps">
                    <h4><GiCookingPot /> Préparation :</h4>
                    <ul className="recipe-steps__list">
                        {recipe.directions.map((step, index) => (
                            <li key={index}>
                                <h5>Étape {index + 1} :</h5>
                                <p>{step}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Recipe;
