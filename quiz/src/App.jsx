/* eslint-disable */
import "./App.css";
import { useReducer, useEffect } from "react";
import DateCounter from "./DateCounter";
import Header from "./Header";
import Loader from "./Loader";
import Content from "./Content";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Timer from "./components/Timer";
import Footer from "./components/Footer";

const SECS_PER_QUESTION = 30;

const initialState = {
	questions: [],

	// 'loading', 'error', 'ready', 'active', 'finished'
	status: "loading",
	index: 0,
	answer: null,
	highscore: 0,
	points: 0,
	secondsRemaining: null,
};

function reducer(state, action) {
	// console.log(state + action);
	switch (action.type) {
		case "dataReceived":
			return {
				...state,
				questions: action.payload,
				status: "ready",
			};
		case "dataFailed":
			return {
				...state,
				status: "error",
			};
		case "start":
			return {
				...state,
				status: "active",
				secondsRemaining: state.questions.length * SECS_PER_QUESTION,
			};
		case "newAnswer":
			return {
				...state,
				answer: action.payload,
				points:
					action.payload ===
					state.questions[state.index].correctOption
						? state.points + state.questions[state.index].points
						: state.points,
			};
		case "nextQuestion":
			return { ...state, index: state.index + 1, answer: null };
		case "finish":
			return {
				...state,
				status: "finished",
				highscore:
					state.points > state.highscore
						? state.points
						: state.highscore,
			};
		case "restart":
			return {
				...initialState,
				questions: state.questions,
				status: "ready",
				highscore: state.highscore,
			};
		case "timeReduce":
			return {
				...state,
				secondsRemaining: state.secondsRemaining - 1,
				status:
					state.secondsRemaining === 0 ? "finished" : state.status,
			};
		default:
			throw new Error("Action unkonwn");
	}
}

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const {
		questions,
		status,
		index,
		answer,
		highscore,
		points,
		secondsRemaining,
	} = state;
	useEffect(function () {
		fetch("http://localhost:9000/questions")
			.then((res) => res.json())
			.then((data) => dispatch({ type: "dataReceived", payload: data }))
			.catch((err) => dispatch({ type: "dataFailed" }));
	}, []);

	const total = questions.reduce(
		(sum, curQuestion) => (sum += curQuestion.points),
		0
	);

	// let total = 0;
	// questions.map((question) => (total += question.points));

	return (
		<div className="app">
			<Header></Header>
			<Content>
				{status === "loading" && <Loader></Loader>}
				{status === "error" && <Error></Error>}
				{status === "ready" && (
					<StartScreen
						numQuestions={questions.length}
						dispatch={dispatch}
					></StartScreen>
				)}
				{status === "active" && (
					<div>
						<Progress
							index={index}
							numQuestions={questions.length}
							points={points}
							maxPossiblePoints={total}
							answer={answer}
							questionPoint={questions[index].points}
						></Progress>
						<Question
							question={questions[index]}
							dispatch={dispatch}
							answer={answer}
						></Question>
						<Footer>
							<Timer
								dispatch={dispatch}
								secondsRemaining={secondsRemaining}
							></Timer>{" "}
							<NextButton
								dispatch={dispatch}
								index={index}
								numQuestions={questions.length}
								answer={answer}
							></NextButton>
						</Footer>
					</div>
				)}
				{status === "finished" && (
					<FinishScreen
						points={points}
						maxPossiblePoints={total}
						highscore={highscore}
						dispatch={dispatch}
					/>
				)}
			</Content>
		</div>
	);
}

export default App;
