/* Import Style */
import "./profileCard.scss";
// Import img placeholder
import placeholderProfile from "../../style/images/chef_alexey-marcov_pixabay.png";
// Import icons
import { GrRestaurant } from "react-icons/gr";

function ProfileCard({ user }) {
  const userImg = user.img
    ? {
        src: user.img,
        alt: `${user.lastname}-${user.firstname}_profile-image`,
      }
    : {
        src: placeholderProfile,
        alt: "placeholder_profile-image",
      };

  return (
    <div className="profile-card">
		<div className="profile-card__img">
			<img {...userImg} width="100px" height="600px" />
		</div>
		<GrRestaurant className="profile-card__icon" />
		<div className="profile-card__info">
			<p>région</p>
			<p>
			{user.nbrRecipes} recette{user.nbrRecipes > 1 && "s"}
			</p>
		</div>
    </div>
  );
}

export default ProfileCard;
