import classNames from "classnames";
/* Import Style */
import "./formControls.scss";
/* Import Icons */
import { IoMdClose } from "react-icons/io";
/* Import Components */
import BtnBrand from "../../components/Buttons/BtnBrand";

function Textarea(props) {
	const {
		label,
		onChange,
		hasRemove,
		handleRemoveInput,
		light,
		...inputProps
	} = props;

	const removeBtn = hasRemove && (
		<BtnBrand
			onClick={handleRemoveInput}
			icon={<IoMdClose />}
			label="suprimer"
			round
			border0
			color="grey"
		/>
	);

	const labelClass = classNames(
		"input-group__label",
		light && "input-group__label--light"
	);

	return (
		<div className="input-group">
			<textarea
				className="input-group__control"
				{...inputProps}
				required
				onChange={onChange}
			></textarea>
			{removeBtn}
			<label className={labelClass}>{label}</label>
		</div>
	);
}

export default Textarea;
