import { Link } from "react-router-dom";
/* Import Style */
import "./recipeCards.scss";
// Import img placeholder
import placeholderImg from "../../style/images/lukas-blazek-f-TWhXOrLiU-unsplash.jpg";

function HeaderCard({ recipe, alone }) {
	const { id, img, title, date } = recipe;

	const urlFormated = `/${title.toLowerCase().replace(/\s/g, "-")}/${id}`;

	const ConditionalLink = ({ children }) =>
		alone ? <>{children}</> : <Link to={urlFormated}>{children}</Link>;

	const New = () => {
		const month = 2629746000; // in ms
		const diff = Date.now() - new Date(date);
		const isNew = diff > month ? false : true;
		return isNew ? <span className="card-header__new">New</span> : null;
	};

	return (
		<div className="card-header">
			<ConditionalLink>
				<div className="card-header__img">
					<img
						src={img ? img : placeholderImg}
						alt={title}
						width="400px"
						height={alone ? "444px" : "300px"}
					/>
					<New />
				</div>
				<h3 className={`card-header__title ${
						alone ? "card-header__title--center" : null
					}`}
				>
					{title}
				</h3>
			</ConditionalLink>
		</div>
	);
}

export default HeaderCard;
