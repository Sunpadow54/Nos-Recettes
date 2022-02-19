import { Link } from "react-router-dom";
/* Import Style */
import "./recipeCards.scss";
/* Import Icons */
import { RiTimerLine } from "react-icons/ri";
import { GrRestaurant } from "react-icons/gr";
import { BiDish } from "react-icons/bi";

function InfosCard({ recipe, children }) {
	const { duration, author, authorId, category } = recipe;
	const timeFormat = (string) => {
		const hours = string.split(":")[0];
		const min = string.split(":")[1];
		return hours === "00" ? `${min}min` : `${hours}h${min}`;
	};
	const urlFormated = `/profil/${authorId}`;
	const infos = [
		{
			content: children ? children[0] : timeFormat(duration),
			icon: RiTimerLine,
		},
		{
			content: <Link to={urlFormated}>{author}</Link>,
			icon: GrRestaurant,
		},
		{
			content: children ? children[1] : category,
			icon: BiDish,
		},
	];

	return (
		<div className="card-infos">
			{infos.map((info, i) => (
				<div key={i} className="card-infos__item">
					<info.icon />
					{info.content}
				</div>
			))}
		</div>
	);
}

export default InfosCard;
