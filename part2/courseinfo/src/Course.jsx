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

export default Course;
