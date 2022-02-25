import classNames from "classnames";
/* Import Style */
import "./formControls.scss";
/* Import Icons */
import { IoMdClose } from "react-icons/io";
/* Import Components */
import FormControls from "./FormControls";
import BtnBrand from "../Buttons/BtnBrand";

function FormControlsList(props) {
	const { handleRemoveInput, resizable, noLabel, inputprops } = props;

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
				{handleRemoveInput && (
					<BtnBrand
						label="supprimer"
						icon={<IoMdClose />}
						color="grey"
						round
						border0
						onClick={(e) => {
							e.preventDefault();
							handleRemoveInput();
						}}
					/>
				)}
			</div>
		</>
	);
}

export default FormControlsList;
