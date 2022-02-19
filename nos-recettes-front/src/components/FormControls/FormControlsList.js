import { forwardRef } from "react";
import classNames from "classnames";
/* Import Style */
import "./formControls.scss";
/* Import Icons */
import { IoMdClose } from "react-icons/io";
/* Import Components */
import FormControls from "./FormControls";
import BtnBrand from "../Buttons/BtnBrand";

const FormControlsList = forwardRef((props, ref) => {
	const { handleRemoveInput, resizable, inputprops } = props;

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
							ref={input.ref}
							resizable={resizable && resizable}
						/>
					))
				) : (
					<FormControls
						{...inputprops}
						ref={inputprops.ref}
						resizable={resizable && resizable}
					/>
				)}
				{handleRemoveInput && (
					<BtnBrand
						label="supprimer"
						icon={<IoMdClose />}
						color="grey"
						round
						border0
						onClick={handleRemoveInput}
					/>
				)}
			</div>
		</>
	);
});

export default FormControlsList;
