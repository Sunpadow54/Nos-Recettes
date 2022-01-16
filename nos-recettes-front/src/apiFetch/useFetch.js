import { useEffect, useState } from "react";

function useFetch(props) {
	const baseUrl = "http://localhost:3000/api";
	const { endpoint, method } = props;

	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading(true);
		fetch(baseUrl + endpoint, { method: method })
			.then((res) => {
				if (!res.ok) {
					const err = `Désolé, il est impossible d'accéder à l'API. (erreur status: ${res.status})`;
					throw err;
				}
				return res.json();
			})
			.then((dataFetched) => {
				setData(dataFetched);
				console.log("data : " + data);
			})
			.catch((err) => {
				setError(err);
				console.log("erreur : " + error);
			})
			.finally(() => {
				setLoading(false);
			});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { data, loading, error };
}

export default useFetch;
