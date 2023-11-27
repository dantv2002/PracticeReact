import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

const BASE_URL = "http://localhost:9000";

function App() {
	const [cities, setCities] = useState([]);
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		const fetchCities = async () => {
			try {
				setLoading(true);
				const res = await fetch(`${BASE_URL}/cities`);
				const data = await res.json();
				console.log("fetch cities");
				setCities(data);
			} catch {
				alert("Error fetching cities");
			} finally {
				setLoading(false);
			}
		};
		fetchCities();
	}, []);
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Homepage />}></Route>
				<Route path="/product" element={<Product />}></Route>
				<Route path="/pricing" element={<Pricing />}></Route>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/app" element={<AppLayout />}>
					<Route
						index
						element={<Navigate replace to="cities" />}
					></Route>
					<Route
						path="cities"
						element={
							<CityList cities={cities} isLoading={isLoading} />
						}
					></Route>
					<Route path="cities/:id" element={<City />}></Route>
					<Route
						path="countries"
						element={
							<CountryList
								cities={cities}
								isLoading={isLoading}
							/>
						}
					></Route>
					<Route path="form" element={<Form />}></Route>
				</Route>
				<Route path="*" element={<PageNotFound />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
