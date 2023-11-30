import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import BackButton from "./BackButton";
import styles from "./City.module.css";
import Spinner from "./Spinner";

const formatDate = (date) =>
	new Intl.DateTimeFormat("en", {
		day: "numeric",
		month: "long",
		year: "numeric",
		weekday: "long",
	}).format(new Date(date));

const City = () => {
	const { id } = useParams();
	// console.log(id);
	const { getCity, currentCity, isLoading } = useCities();

	useEffect(() => {
		getCity(id);
	}, [id]);

	if (isLoading) return <Spinner />;

	// const [searchParams, setSearchParams] = useSearchParams();
	// const lat = searchParams.get("lat");
	// const lng = searchParams.get("lng");
	// TEMP DATA
	// const currentCity = {
	// 	cityName: "Lisbon",
	// 	emoji: "🇵🇹",
	// 	date: "2027-10-31T15:59:59.138Z",
	// 	notes: "My favorite city so far!",
	// };

	const { cityName, emoji, date, notes } = currentCity;
	// return (
	// 	<div>
	// 		<h1>City {id}</h1>
	// 		<h1>Map</h1>
	// 		<h1>
	// 			Position {lat}:{lng}
	// 		</h1>
	// 	</div>
	// );

	return (
		<div className={styles.city}>
			<div className={styles.row}>
				<h6>City name</h6>
				<h3>
					<span>{emoji}</span> {cityName}
				</h3>
			</div>

			<div className={styles.row}>
				<h6>You went to {cityName} on</h6>
				<p>{formatDate(date || null)}</p>
			</div>

			{notes && (
				<div className={styles.row}>
					<h6>Your notes</h6>
					<p>{notes}</p>
				</div>
			)}

			<div className={styles.row}>
				<h6>Learn more</h6>
				<a
					href={`https://en.wikipedia.org/wiki/${cityName}`}
					target="_blank"
					rel="noreferrer"
				>
					Check out {cityName} on Wikipedia &rarr;
				</a>
			</div>
			<BackButton />
		</div>
	);
};

export default City;
