function IngredientsPills({ ingredients }) {
	return (
		<ul className="card-pills">
			{ingredients.map((ingredient, i) => (
				<li key={i} className="card-pills__item">
					{ingredient.name}
				</li>
			))}
		</ul>
	);
}

export default IngredientsPills;
