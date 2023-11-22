/* eslint-disable */

import Options from "./components/Options";

const Question = ({ question, dispatch, answer }) => {
	// console.log(question);
	return (
		<div>
			<Options
				question={question}
				dispatch={dispatch}
				answer={answer}
			></Options>
		</div>
	);
};

export default Question;
