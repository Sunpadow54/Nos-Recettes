import useFetch from "../../../apiFetch/useFetch";
/* Import Style */
import "./profile.scss";
// Import components
import ProfileCard from "../../../components/ProfileCard/ProfileCard";


function Profile() {
	const id = 1; // test

	const getUser = useFetch({
		endpoint: "/user/" + id,
		method: "GET",
	});

	const user = getUser.data;

	return (
		<div className="profile">
			{user && ( 
			<>	
				<ProfileCard className="profile-card" user={user}/>
				<div className="profile-name">
					<h3>{`${user.lastname} ${user.firstname}`}</h3>
				</div>
			</>
			)}
			<div className="profile-recipes">
				<h4>Voir Toutes vos recettes</h4>
			</div>
		</div>
	);
}

export default Profile;
