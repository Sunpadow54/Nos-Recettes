import classNames from "classnames";
/* Import Style */
import "./userCard.scss";
// Import img placeholder
import placeholderProfile from "../../style/images/chef_alexey-marcov_pixabay.png";
// Import icons
import { GrRestaurant } from "react-icons/gr";

function ProfileCard({ user, className }) {
	const src = user.img ? user.img : placeholderProfile;
	const alt = `${user.img ? "name" : "placeholder"}-profile`;

	const cardClass = classNames("user-card", className && className);

	return (
		<div className={cardClass}>
			<div className="user-card__img">
				<img src={src} alt={alt} width="100px" height="600px" />
			</div>
			<GrRestaurant className="user-card__icon" />
			<div className="user-card__info">
				<p>région</p>
				<p>
					<strong>{user.nbrRecipes}</strong>
					recette{user.nbrRecipes > 1 && "s"}
				</p>
			</div>
		</div>
	);
}

export default ProfileCard;
