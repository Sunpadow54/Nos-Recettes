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

	const removeBtn = hasRemove ? (
		<BtnBrand
			onClick={handleRemoveInput}
			icon={<IoMdClose />}
			label="suprimer"
			round={true}
			border0={true}
			color="grey"
		/>
	) : null;

	return (
		<div className="input-group">
			<textarea
				className="input-group__control"
				{...inputProps}
				required
				onChange={onChange}
			></textarea>
			{removeBtn}
			<label
				className={`input-group__label 
                    ${light ? "input-group__label--light" : ""}
                `}
			>
				{label}
			</label>
		</div>
	);
}

export default Textarea;
