import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";

function ManageIngredients() {
	const { setSubtitle } = useOutletContext();
	useEffect(() => {
		setSubtitle("Gérer les ingrédients");
	}, [setSubtitle]);

	return (
		<div>
			<p>créer (multiple)</p>
			<p>modifier</p>
			<p>delete</p>
		</div>
	);
}

export default ManageIngredients;
