import { Link } from "react-router-dom";
import classNames from "classnames";
/* Import Style */
import "./recipeCards.scss";
// Import img placeholder
import placeholderImg from "../../style/images/lukas-blazek-f-TWhXOrLiU-unsplash.jpg";

function HeaderCard({ recipe, alone, children }) {
	const { id, img, title, date } = recipe;

	const urlFormated = `/${title.toLowerCase().replace(/\s/g, "-")}/${id}`;

	const ConditionalLink = ({ children }) =>
		alone ? <>{children}</> : <Link to={urlFormated}>{children}</Link>;

	const NewFlag = () => {
		const month = 2629746000; // in ms
		const diff = Date.now() - new Date(date);
		const isNew = diff > month ? false : true;
		return isNew ? <span className="card-header__new">New</span> : null;
	};

	const test = (
		<div className="card-header">
			<ConditionalLink>
				<div className="card-header__img">
					<img
						src={img ? img : placeholderImg}
						alt={title}
						width="400px"
						height={alone ? "444px" : "300px"}
					/>
					<NewFlag />
				</div>
				<div
					className={classNames(
						"card-header__title",
						alone && "card-header__title--center"
					)}
				>
					{children ? children : <h3>{title}</h3>}
				</div>
			</ConditionalLink>
		</div>
	);
	return test;
}

export default HeaderCard;
