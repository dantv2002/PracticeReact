/* eslint-disable  */
const Progress = ({
	index,
	numQuestions,
	points,
	maxPossiblePoints,
	answer,
	questionPoint,
}) => {
	return (
		<header className="progress">
			<progress
				max={numQuestions}
				value={index + Number(answer !== null)}
			/>

			<p>
				Question <strong>{index + 1}</strong> / {numQuestions}
			</p>

			<p>
				Question point <strong>{questionPoint}</strong>, {"Current: "}
				<strong>{points}</strong> / {maxPossiblePoints} Points
			</p>
		</header>
	);
};

export default Progress;
