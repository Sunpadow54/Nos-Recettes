import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
/* Import Style */
import "./actions.scss";
// Import Components
import useUserForm from "../../../../hooks/useUserForm";
import BtnBrand from "../../../../components/Buttons/BtnBrand";
import FormControls from "../../../../components/FormControls/FormControls";

function CreateUser() {
	const { setSubtitle, incrementUser } = useOutletContext();

	const { inputs, handleCreate, data: userCreated } = useUserForm({});
	const formInputs = Object.values(inputs).filter(
		(input) => input.name !== "newPassword"
	);

	// Effects

	useEffect(() => {
		setSubtitle("Créer un nouvel utilisateur");
	}, [setSubtitle]);

	useEffect(() => {
		if (userCreated) {
			incrementUser();
		}
	}, [userCreated]);

	return (
		<form
			autoComplete="off"
			id="create-user"
			className="action-form"
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
