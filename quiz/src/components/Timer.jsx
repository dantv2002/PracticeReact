/* eslint-disable  */

import { useEffect } from "react";

const Timer = ({ dispatch, secondsRemaining }) => {
	const mins = Math.floor(secondsRemaining / 60);
	const seconds = secondsRemaining % 60;

	useEffect(
		function () {
			const TimerId = setInterval(() => {
				dispatch({ type: "timeReduce" });
			}, 1000);

			return () => clearInterval(TimerId);
		},
		[dispatch]
	);

	return (
		<div className="timer">
			{mins < 10 && "0"}
			{mins}:{seconds < 10 && "0"}
			{seconds}
		</div>
	);
};

export default Timer;
