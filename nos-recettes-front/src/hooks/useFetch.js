import { useEffect, useState, useContext } from "react";
import { UserContext } from "../store/Store";

function useFetch({ endpoint, method, body, wait, auth }) {
	const url = process.env.REACT_APP_URL_API + endpoint;
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [immediate, setImmediate] = useState(!wait);
	const [currentUser] = useContext(UserContext);

	// function to make post/put req on submit
	const sendToApi = () => {
		setImmediate(true);
	};

	// Create Fetch request

	const customRequest = () => {
		const myHeaders = new Headers();
		if (method !== "GET") {
			myHeaders.append("Content-Type", "application/json");
		}
		if (auth) {
			myHeaders.append("Authorization", `Bearer ${currentUser.token}`);
		}

		const myInit = {
			method: method,
			headers: myHeaders,
		};
		if (body) {
			Object.assign(myInit, { body: JSON.stringify(body) });
		}
		return new Request(url, myInit);
	};

	// Fetch

	const fetchAction = async () => {
		const request = customRequest();
		setLoading(true);
		try {
			const response = await fetch(request);
			if (!response.ok) {
				const err = await response.json();
				throw err;
			}
			const dataFetched = await response.json();
			setData(dataFetched);
			setError(null);
		} catch (err) {
			setError(err);
			console.log(err);
		} finally {
			setLoading(false);
			if (wait) {
				setImmediate(false);
			}
		}
	};

	// Effect

	useEffect(() => {
		if (immediate) {
			fetchAction();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [endpoint, method, body, immediate]);

	// Cleanup to fix state updated on unmounted
	useEffect(() => {
		return () => {};
	}, []);

	return { data, loading, error, sendToApi };
}

export default useFetch;
