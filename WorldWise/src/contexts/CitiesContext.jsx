import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "http://localhost:9000";

const CitiesContext = createContext();

const reducer = (state, action) => {
	switch (action.type) {
		case "loading":
			return {
				...state,
				isLoading: true,
			};
		case "cities/loaded":
			return {
				...state,
				isLoading: false,
				cities: action.payload,
			};
		case "city/loaded":
			return {
				...state,
				isLoading: false,
				currentCity: action.payload,
			};
		case "city/created":
			return {
				...state,
				isLoading: false,
				cities: [...state.cities, action.payload],
				currentCity: action.payload,
			};
		case "city/deleted":
			return {
				...state,
				isLoading: false,
				cities: state.cities.filter(
					(city) => city.id !== action.payload
				),
			};
		case "rejected":
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};

		default:
			throw new Error("Invalid action type: " + action.type);
	}
};

const initialState = {
	cities: [],
	isLoading: false,
	currentCity: {},
	error: "",
};

const CitiesProviders = ({ children }) => {
	const [{ cities, isLoading, error, currentCity }, dispatch] = useReducer(
		reducer,
		initialState
	);
	// const [cities, setCities] = useState([]);
	// const [isLoading, setLoading] = useState(false);
	// const [currentCity, setCurrentCity] = useState({});

	useEffect(() => {
		const fetchCities = async () => {
			dispatch({ type: "loading" });
			try {
				const res = await fetch(`${BASE_URL}/cities`);
				const data = await res.json();
				// console.log("fetch cities");
				dispatch({ type: "cities/loaded", payload: data });
			} catch {
				dispatch({
					type: "rejected",
					payload: "There was an error loading data",
				});
			}
		};
		fetchCities();
	}, []);

	const getCity = async (id) => {
		console.log(Number(id) + " " + currentCity.id);
		if (Number(id) === currentCity.id) return;
		dispatch({ type: "loading" });

		try {
			const res = await fetch(`${BASE_URL}/cities/${id}`);
			const data = await res.json();
			console.log("fetch current city");
			dispatch({ type: "city/loaded", payload: data });
		} catch {
			dispatch({
				type: "rejected",
				payload: "There was an error loading cities...",
			});
		}
	};

	const createCity = async (newCity) => {
		dispatch({ type: "loading" });
		try {
			const res = await fetch(`${BASE_URL}/cities`, {
				method: "POST",
				body: JSON.stringify(newCity),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();
			// console.log("fetch current city");
			console.log(data);
			dispatch({ type: "city/created", payload: data });
		} catch {
			dispatch({
				type: "rejected",
				payload: "There was an error creating city...",
			});
		}
	};

	const deleteCity = async (id) => {
		dispatch({ type: "loading" });
		try {
			const res = await fetch(`${BASE_URL}/cities/${id}`, {
				method: "DELETE",
			});
			const data = await res.json();
			// console.log("fetch current city");
			console.log(data);
			dispatch({ type: "city/deleted", payload: id });
		} catch {
			dispatch({
				type: "rejected",
				payload: "There was an error deleting city...",
			});
		}
	};

	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
				error,
				currentCity,
				getCity,
				createCity,
				deleteCity,
			}}
		>
			{children}
		</CitiesContext.Provider>
	);
};

const useCities = () => {
	const context = useContext(CitiesContext);
	if (context === undefined)
		throw new Error("CitiesContext was used outside of CitiesProvider");
	return context;
};

export { CitiesProviders, useCities };
