import { createContext, useState } from "react";

const initialUserState = {
	id: null,
	username: null,
	token: null,
	isAdmin: null,
	isActive: null,
};

export const UserContext = createContext();

const Store = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(initialUserState);

	return (
		<UserContext.Provider value={[currentUser, setCurrentUser]}>
			{children}
		</UserContext.Provider>
	);
};

export default Store;
