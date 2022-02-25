function IngredientsPills({ ingredients }) {
	return (
		<ul className="card-pills">
			{ingredients.map((ingredient) => (
				<li key={ingredient} className="card-pills__item">
					{ingredient}
				</li>
			))}
		</ul>
	);
}

export default IngredientsPills;
