import { useState } from "react";

const Statistics = (props) => {
	if (props.all > 0) {
		return (
			<>
				<p>good {props.good}</p>
				<p>neutral {props.neutral}</p>
				<p>bad {props.bad}</p>
				<p>all {props.all}</p>
				<p>average {props.average}</p>
				<p>positive {props.positive} %</p>
			</>
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
	const average = (good - bad) / all;
	const positive = (good / all) * 100;

	return (
		<div>
			<h1>give feedback</h1>
			<button type="button" onClick={increaseGood}>
				good
			</button>
			<button type="button" onClick={increaseNeutral}>
				neutral
			</button>
			<button type="button" onClick={increaseBad}>
				bad
			</button>
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
