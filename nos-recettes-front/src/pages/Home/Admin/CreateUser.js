import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
/* Import Style */
import "./createUser.scss";
// Import Components
import useUserForm from "../../../hooks/useUserForm";
import BtnBrand from "../../../components/Buttons/BtnBrand";
import FormControls from "../../../components/FormControls/FormControls";

function CreateUser() {
	const { setSubtitle } = useOutletContext();
	useEffect(() => {
		setSubtitle("Créer un nouvel utilisateur");
	}, [setSubtitle]);

	const { inputs, handleCreate } = useUserForm({});
	const formInputs = Object.values(inputs).filter(
		(input) => input.name !== "newPassword"
	);

	return (
		<form
			autoComplete="off"
			id="create-user"
			className="form-create-user"
			onSubmit={handleCreate}
		>
			{formInputs.map((input, index) => (
				<FormControls key={"createUser" + index} {...input} />
			))}

			<BtnBrand
				form="create-user"
				type="submit"
				text="Enregistrer"
				color="green"
			/>
		</form>
	);
}

export default CreateUser;
