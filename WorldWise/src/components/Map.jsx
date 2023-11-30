import { useState } from "react";
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	useMap,
	useMapEvents,
} from "react-leaflet";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import styles from "./Map.module.css";
import { useEffect } from "react";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";

function Map() {
	const { cities } = useCities();
	const [mapPositions, setMapPositions] = useState([40, 0]);
	const {
		isLoading: isLoadingPosition,
		position: geolocationPosition,
		getPosition,
	} = useGeolocation();
	// const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const mapLat = searchParams.get("lat");
	const mapLng = searchParams.get("lng");

	useEffect(() => {
		if (mapLat && mapLng) setMapPositions([mapLat, mapLng]);
	}, [mapLat, mapLng]);

	useEffect(() => {
		if (geolocationPosition) {
			setMapPositions([geolocationPosition.lat, geolocationPosition.lng]);
		}
	}, [geolocationPosition]);
	return (
		<div className={styles.mapContainer}>
			{true && (
				<Button
					type="position"
					onClick={() => {
						// console.log(isLoadingPosition);
						getPosition();
					}}
				>
					{isLoadingPosition
						? "Loading..."
						: `Use your position: (lat:${geolocationPosition?.lat}-lng:${geolocationPosition?.lng})`}
				</Button>
			)}
			<MapContainer
				center={mapPositions}
				zoom={13}
				scrollWheelZoom={true}
				className={styles.map}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
				/>
				{cities.map((city) => (
					<Marker
						position={[city.position.lat, city.position.lng]}
						key={city.id}
					>
						<Popup>
							<span>{city.emoji}</span>
							<span>{city.cityName}</span>
						</Popup>
					</Marker>
				))}
				<DetectClick />
				<ChangeCenter position={mapPositions} />
			</MapContainer>
		</div>
	);
}

const ChangeCenter = ({ position }) => {
	const map = useMap();
	map.setView(position);
	return null;
};

const DetectClick = () => {
	const navigate = useNavigate();

	useMapEvents({
		click: (e) => {
			console.log(e);
			navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
		},
	});
};

export default Map;
