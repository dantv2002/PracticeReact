import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import City from "./components/City";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import Form from "./components/Form";
import { CitiesProviders } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import AppLayout from "./pages/AppLayout";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
	return (
		<AuthProvider>
			<CitiesProviders>
				<BrowserRouter>
					<Routes>
						<Route index element={<Homepage />}></Route>
						<Route path="/product" element={<Product />}></Route>
						<Route path="/pricing" element={<Pricing />}></Route>
						<Route path="/login" element={<Login />}></Route>
						<Route
							path="/app"
							element={
								<ProtectedRoute>
									<AppLayout />
								</ProtectedRoute>
							}
						>
							<Route
								index
								element={<Navigate replace to="cities" />}
							></Route>
							<Route path="cities" element={<CityList />}></Route>
							<Route path="cities/:id" element={<City />}></Route>
							<Route
								path="countries"
								element={<CountryList />}
							></Route>
							<Route path="form" element={<Form />}></Route>
						</Route>
						<Route path="*" element={<PageNotFound />}></Route>
					</Routes>
				</BrowserRouter>
			</CitiesProviders>
		</AuthProvider>
	);
}

export default App;
