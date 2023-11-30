/* eslint-disable */
import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

const CityList = () => {
	const { cities, isLoading } = useCities();
	if (isLoading) return <Spinner />;
	if (!cities.length)
		return (
			<Message message="Please add first city to list by clicking on the map." />
		);
	return (
		<div>
			<ul className={styles.cityList}>
				{cities.map((city) => (
					<CityItem city={city} key={city.id} />
				))}
			</ul>
		</div>
	);
};

export default CityList;
