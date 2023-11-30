/* eslint-disable */
import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

const CountryList = () => {
	const { cities, isLoading } = useCities();

	if (isLoading) return <Spinner />;
	if (!cities.length)
		return (
			<Message message="Please add first country to list by clicking on the map." />
		);
	const countries = cities.reduce((arr, city) => {
		if (!arr.map((el) => el.country).includes(city.country))
			return [...arr, { country: city.country, emoji: city.emoji }];
		else return arr;
	}, []);
	return (
		<div>
			<ul className={styles.countryList}>
				{countries.map((country) => (
					<CountryItem country={country} key={country.country} />
				))}
			</ul>
		</div>
	);
};

export default CountryList;
