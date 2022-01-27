import useFetch from "../../../apiFetch/useFetch";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
/* Import Style */
import "./profile.scss";
/* Import Icons */
import { RiArrowGoBackLine } from "react-icons/ri";
// Import components
import ProfileCard from "../../../components/ProfileCard/ProfileCard";
import Input from "../../../components/FormControls/Input";
import BtnBrand from "../../../components/Buttons/BtnBrand";


function EditProfile() {
	// ---- Variables
	// id user for the fetchs
	const userId = 2; // test
    // Fetchs user and his recipes
	const getUser = useFetch({
		endpoint: "/user/" + userId,
		method: "GET",
	});

    const navigate = useNavigate();
	const [user, setUser] = useState();
    const [userForm, setUserForm] = useState({});

    useEffect(() => {
        setUser(getUser.data);
    }, [getUser]);

	// Function : inputs values showned are default or input change
	const getValues = (key) => {
		return userForm.hasOwnProperty(key) ? userForm[key] : user[key]
	}
    
	const inputs = [
		{
			type: "text",
			name: "firstname",
			label:"Prénom",
            light: true,
		},
		{
			type: "text",
			name: "lastname",
			label: "Nom",
            light: true,
		},
		{
			type: "text",
			name: "username",
			label: "Username",
            light: true,
		},
        {
			type: "email",
			name: "email",
			label: "email",
            light: true,
		},
        {
			type: "password",
			name: "oldPassword",
			label: "mot de passe pour valider",
            light: true,
		},

	];

	const handleInputChange = (e) => {
        // populate form
		const { name, value } = e.target;
		setUserForm({
			...userForm,
			[name]: value
		});
        // change size of parent div & input
        if (e.target.type !== "password") {
            e.target.size = Math.max(value.length - 1, 1);
            e.target.parentNode.dataset.value = value
        }
	};

    const handleSubmit = (e) => {
		e.preventDefault(userForm); // stop refreshing page
        fetch('http://localhost:3000/api/user/edit/' + userId, {
            method: 'PUT',
            headers : {"Content-Type": "application/json"},
            body: JSON.stringify(userForm)
        })
        .then((res) => {
            navigate("/profil");
            console.log(res.json());
        })
        .catch(error => {
            console.log(error);
        });
	};

  return (
		<form 
            className="profile"
            autoComplete="off"
			id="edit-profile"
			onSubmit={handleSubmit}
        >
            <div className="profile-edit-btn">
                <BtnBrand
                    onClick={() => { navigate("/profil") }}
                    icon={<RiArrowGoBackLine />}
                    label="retourner au profil"
                    round
                    border0
                    color="blue"
                />
            </div>
			{user && (
				<>	
				<ProfileCard className="profile-card" user={user}/>
				<div className="profile-name">
                    <Input
						{... inputs[0]}
						value={getValues('firstname')}
                        resizable
						onChange={handleInputChange}
                        size={user.firstname.length - 1}

					/>
                    <Input
						{... inputs[1]}
						value={getValues('lastname')}
                        resizable
						onChange={handleInputChange}
                        size={user.lastname.length - 1}
					/>
				</div>
                <div className="profile-info">
                    <Input
						{... inputs[2]}
						value={getValues('username')}
                        resizable
						onChange={handleInputChange}
                        size={user.username.length - 1}
					/>
                    <Input
						{... inputs[3]}
						value={getValues('email')}
                        resizable
						onChange={handleInputChange}
                        size={user.email.length - 1}
					/>
                      <Input
                        {... inputs[4]}
                        value={getValues('oldPassword')}
                        /* resizable={true} */
                        onChange={handleInputChange}
                        /* size={user.email.length} */
                    />
                    <div className="profile-submit">
                        <BtnBrand
                            form="edit-profile"
                            type="submit"
                            text="Enregistrer"
                            color="green"
                        />
                    </div>
                </div>
			</>
			)}
	  	</form>
  );
}

export default EditProfile;
