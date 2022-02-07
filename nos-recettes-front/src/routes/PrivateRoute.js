import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../store/Store";
import Login from "../pages/Login/Login";

const useAuth = () => {
	const [currentUser] = useContext(UserContext);
	const isAuth = currentUser.token ? true : false;
	return isAuth;
};

function PrivateRoute({ children }) {
	const isAuth = useAuth();
	return isAuth ? <Outlet /> : <Login />;
}

export default PrivateRoute;
