import { useState } from "react";
/* Import Style */
import "./login.scss";
/* Import Components */
import useFetch from "../../apiFetch/useFetch";
import Input from "../../components/FormControls/Input";
import BtnBrand from "../../components/Buttons/BtnBrand";

function Login() {
	const [loginForm, setLoginForm] = useState({
		username: "",
		password: "",
	});

	const { data, error, sendToApi } = useFetch({
		endpoint: "/auth/login",
		method: "POST",
		body: loginForm,
		wait: true,
	});

	// ---- Handles

	const handleInputChange = (e) => {
		// populate Form
		const { name, value } = e.target;
		setLoginForm({
			...loginForm,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault(); // stop refreshing page
		sendToApi();
	};

	return (
		<div className="container">
			<div className="login-card">
				<header className="login-card__header">
					<span>logo</span>
					<h1>Nos Recettes</h1>
				</header>
				<main className="login-card__form">
					<h2>connection</h2>
					<form autoComplete="off" id="login" className="login-form">
						<Input
							type="text"
							name="username"
							label="username"
							value={loginForm.username}
							onChange={handleInputChange}
						/>
						<Input
							type="password"
							name="password"
							label="mot de passe"
							value={loginForm.password}
							onChange={handleInputChange}
						/>
						<BtnBrand
							form="login"
							type="submit"
							text="se connecter"
							color="green"
							onClick={handleSubmit}
						/>
					</form>
				</main>
			</div>
		</div>
	);
}

export default Login;
