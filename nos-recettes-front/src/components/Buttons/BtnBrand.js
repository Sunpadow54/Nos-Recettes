import "./btnBrand.scss";

function BtnBrand(props) {
	const { label, text, onClick, icon, round, color, ...btnProps } = props;
	return (
		<button
			{...btnProps}
			className={`
                btn-brand 
                ${round ? "btn-brand--round " : "btn-brand--square "}
                btn-brand--${color}
            `}
			onClick={onClick}
		>
			{icon ? icon : null}

			{round ? <span className="btn-brand__popup">{label}</span> : null}

			{text ? text : null}
		</button>
	);
}

export default BtnBrand;
