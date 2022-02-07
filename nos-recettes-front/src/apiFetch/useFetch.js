import { useEffect, useState } from "react";

function useFetch({ endpoint, method, body, wait }) {
	const url = "http://localhost:3000/api" + endpoint;
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [immediate, setImmediate] = useState(wait ? false : true);

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
		}
	};

	// Effect

	useEffect(() => {
		if (immediate) {
			fetchAction();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url, method, body, immediate]);

	return { data, loading, error, sendToApi };
}

export default useFetch;
