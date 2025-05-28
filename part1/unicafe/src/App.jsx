import { useState } from "react";

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
			<p>good {good}</p>
			<p>neutral {neutral}</p>
			<p>bad {bad}</p>
			<p>all {all}</p>
			<p>average {average}</p>
			<p>positive {positive} %</p>
		</div>
	);
};

export default App;
