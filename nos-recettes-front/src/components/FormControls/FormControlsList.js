import classNames from "classnames";
/* Import Style */
import "./formControls.scss";
/* Import Components */
import FormControls from "./FormControls";

function FormControlsList(props) {
	const { resizable, noLabel, inputprops, btn } = props;

	return (
		<>
			<div
				className={classNames(
					resizable ? "input-group-row--resizable" : "input-group-row"
				)}
			>
				{Array.isArray(inputprops) ? (
					inputprops.map((input, i) => (
						<FormControls
							key={i}
							{...input}
							resizable={resizable && resizable}
							noLabel={noLabel}
						/>
					))
				) : (
					<FormControls
						{...inputprops}
						resizable={resizable && resizable}
						noLabel={noLabel}
					/>
				)}

				{btn && <>{btn}</>}
			</div>
		</>
	);
}

export default FormControlsList;
