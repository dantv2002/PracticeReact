/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import useGeolocate from "../hooks/useGeolocate";

export default function TestUseGeolocate() {
	const {
		isLoading,
		position: { lat, lng },
		error,
		getPosition,
	} = useGeolocate();
	const [count, setCount] = useState(null);
	function handleClick() {
		setCount((count) => count + 1);
		getPosition();
	}
	return (
		<div>
			<button onClick={handleClick} disabled={isLoading}>
				Get my position
			</button>

			{isLoading && <p>Loading position...</p>}
			{error && <p>{error}</p>}
			{!isLoading && !error && lat && lng && (
				<p>
					Your GPS position:{" "}
					<a
						target="_blank"
						rel="noreferrer"
						href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
					>
						{lat}, {lng}
					</a>
				</p>
			)}

			<p>You requested position {count} times</p>
		</div>
	);
}
