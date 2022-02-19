import { useState } from "react";
/* Import Icons */
import { RiEdit2Line, RiArrowGoBackLine } from "react-icons/ri";
// Import components
import BtnBrand from "../components/Buttons/BtnBrand";

function useToggleEdit() {
	const [isEdit, setEdit] = useState(false);
	const editButton = isEdit
		? {
				icon: <RiArrowGoBackLine />,
				label: "retour",
				color: "blue",
		  }
		: {
				icon: <RiEdit2Line />,
				label: "modifier",
				color: "red",
		  };

	const handleToogleEdit = (e) => {
		setEdit(!isEdit);
	};

	return {
		isEdit,
		setEdit,
		btnEdit: (
			<BtnBrand
				{...editButton}
				onClick={handleToogleEdit}
				border0
				round
			/>
		),
	};
}

export default useToggleEdit;
