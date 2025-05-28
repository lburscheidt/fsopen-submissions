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
	const exercises = props.parts.map((part) => part.exercises);
	const total = exercises.reduce((s, p) => s + p, 0);
	return (
		<p>
			<strong>Total of {total} exercises</strong>
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
	const courses = [
		{
			name: "Half Stack application development",
			id: 1,
			parts: [
				{
					name: "Fundamentals of React",
					exercises: 10,
					id: 1,
				},
				{
					name: "Using props to pass data",
					exercises: 7,
					id: 2,
				},
				{
					name: "State of a component",
					exercises: 14,
					id: 3,
				},
				{
					name: "Redux",
					exercises: 11,
					id: 4,
				},
			],
		},
		{
			name: "Node.js",
			id: 2,
			parts: [
				{
					name: "Routing",
					exercises: 3,
					id: 1,
				},
				{
					name: "Middlewares",
					exercises: 7,
					id: 2,
				},
			],
		},
	];

	return courses.map((course) => <Course key={course.name} course={course} />);
};

export default App;
