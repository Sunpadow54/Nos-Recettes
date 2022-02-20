import { useState, useEffect } from "react";
import classNames from "classnames";
/* Import Style */
import "./popupValidate.scss";
// Import components
import BtnBrand from "../Buttons/BtnBrand";

function PopupValidate({ handleValidate, text, children }) {
	const [hidePopup, setHidePopup] = useState(true);

	const handleTooglePopup = (e) => {
		e.preventDefault();
		setHidePopup(!hidePopup);
	};

	return (
		<div className="popup-validate">
			<BtnBrand
				text="Enregistrer"
				color="green"
				onClick={handleTooglePopup}
			/>
			<div className={classNames("popup", hidePopup && "popup--hide")}>
				<p>{text}</p>
				{children}
				<div className="popup__btns">
					<BtnBrand
						type="submit"
						text="oui"
						color="green"
						onClick={handleValidate}
					/>
					<BtnBrand
						text="annuler"
						color="light"
						onClick={handleTooglePopup}
					/>
				</div>
			</div>
		</div>
	);
}

export default PopupValidate;
