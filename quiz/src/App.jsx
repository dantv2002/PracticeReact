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

const initialState = {
	questions: [],

	// 'loading', 'error', 'ready', 'active', 'finished'
	status: "loading",
	index: 0,
	answer: null,
	highscore: 0,
	points: 0,
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
			};
		case "newAnswer":
			return {
				...state,
				answer: action.payload,
				points:
					action.payload === state.questions.correctOption
						? state.points + state.questions.points
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
		default:
			throw new Error("Action unkonwn");
	}
}

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { questions, status, index, answer, highscore } = state;
	useEffect(function () {
		fetch("http://localhost:9000/questions")
			.then((res) => res.json())
			.then((data) => dispatch({ type: "dataReceived", payload: data }))
			.catch((err) => dispatch({ type: "dataFailed" }));
	}, []);
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
						<Question
							question={questions[index]}
							dispatch={dispatch}
							answer={answer}
						></Question>
						<NextButton
							dispatch={dispatch}
							index={index}
							numQuestions={questions.length}
							answer={answer}
						></NextButton>
					</div>
				)}
			</Content>
		</div>
	);
}

export default App;
