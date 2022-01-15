import "./btnBrand.scss";

function BtnBrand(props) {
	const { label, text, onClick, icon, round, color, border0, ...btnProps } =
		props;
	return (
		<button
			{...btnProps}
			className={`
                btn-brand 
                ${round ? "btn-brand--round " : "btn-brand--square "}
                ${border0 ? "btn-brand--border-0 " : ""}
                ${color ? `btn-brand--${color}` : ""}
            `}
			onClick={onClick}
		>
			{icon ? icon : null}

			{label ? <span className="btn-brand__popup">{label}</span> : null}

			{text ? text : null}
		</button>
	);
}

export default BtnBrand;
