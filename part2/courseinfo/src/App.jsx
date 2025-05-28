const Header = (props) => {
	return <h1>{props.course.name}</h1>;
};

const Part = (props) => {
	return (
		<p>
			{props.part} {props.exercises}
		</p>
	);
};

const Content = (props) => {
	return props.parts.map((part) => (
		<Part key={part.name} part={part.name} exercises={part.exercises} />
	));
};

const Total = (props) => {
	return (
		<p>
			Number of exercises
			{props.parts[0].exercises +
				props.parts[1].exercises +
				props.parts[2].exercises}
		</p>
	);
};

const Course = ({ course }) => {
	return (
		<div>
			<Header course={course} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	);
};

const App = () => {
	const course = {
		name: "Half Stack application development",
		parts: [
			{
				name: "Fundamentals of React",
				exercises: 10,
			},
			{
				name: "Using props to pass data",
				exercises: 7,
			},
			{
				name: "State of a component",
				exercises: 14,
			},
		],
	};

	return <Course course={course} />;
};

export default App;
