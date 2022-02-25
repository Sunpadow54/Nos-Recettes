import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
/* Import Style */
import "./login.scss";
/* Import Components */
import { UserContext } from "../../store/Store";
import useFetch from "../../hooks/useFetch";
import FormControls from "../../components/FormControls/FormControls";
import BtnBrand from "../../components/Buttons/BtnBrand";

function Login() {
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useContext(UserContext);

    const { data, sendToApi } = useFetch({
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

    useEffect(() => {
        if (data) {
            setCurrentUser({
                ...data,
            });
        }
    }, [data]);

    useEffect(() => {
        if (currentUser.token) {
            navigate("/");
        }
        //setCurrentUser(userLogged);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser.token]);

    return (
        <div className="container">
            <div className="login-card">
                <header className="login-card__header">
                    <span>logo</span>
                    <h1>Nos Recettes</h1>
                </header>
                <main className="login-card__form">
                    <h2>connexion</h2>
                    <form autoComplete="off" id="login" className="login-form">
                        <FormControls
                            type="text"
                            name="username"
                            label="username"
                            value={loginForm.username}
                            onChange={handleInputChange}
                        />
                        <FormControls
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
