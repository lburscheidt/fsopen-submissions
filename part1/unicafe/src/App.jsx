import { useState } from "react";

const Button = (props) => {
	return (
		<button type="button" onClick={props.onClick}>
			{props.text}
		</button>
	);
};

const StatisticLine = (props) => {
	if (props.text === "positive") {
		return (
			<tr>
				<td>{props.text}</td>
				<td>{props.value} %</td>
			</tr>
		);
	}
	return (
		<tr>
			<td>{props.text}</td>
			<td>{props.value}</td>
		</tr>
	);
};

const Statistics = (props) => {
	if (props.all > 0) {
		return (
			<table>
				<tbody>
					<StatisticLine text="good" value={props.good} />
					<StatisticLine text="neutral" value={props.neutral} />
					<StatisticLine text="bad" value={props.bad} />
					<StatisticLine text="all" value={props.all} />
					<StatisticLine text="average" value={props.average} />
					<StatisticLine text="positive" value={props.positive} />
				</tbody>
			</table>
		);
	}
	return <p>No feedback given</p>;
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const increaseGood = () => {
		setGood(good + 1);
	};

	const increaseNeutral = () => {
		setNeutral(neutral + 1);
	};

	const increaseBad = () => {
		setBad(bad + 1);
	};

	const all = good + neutral + bad;
	const average = Math.round(((good - bad) / all) * 10) / 10;
	const positive = Math.round((good / all) * 100 * 10) / 10;

	return (
		<div>
			<h1>give feedback</h1>
			<Button onClick={increaseGood} text="good" />
			<Button onClick={increaseNeutral} text="neutral" />
			<Button onClick={increaseBad} text="bad" />

			<h1>statistics</h1>
			<Statistics
				good={good}
				neutral={neutral}
				bad={bad}
				all={all}
				average={average}
				positive={positive}
			/>
		</div>
	);
};

export default App;
