import { useState } from "react";

const Persons = (props) => {
	return props.persons.map((person) => <p key={person.name}>{person.name}</p>);
};

const App = () => {
	const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
	const [newName, setNewName] = useState("");

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const addNewPerson = (event) => {
		event.preventDefault();
		const personObject = { name: newName };
		setPersons(persons.concat(personObject));
		setNewName("");
	};

	return (
		<div>
			<h2>Phone Book</h2>
			<form>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
				</div>
				<div>
					<button type="submit" onClick={addNewPerson}>
						add
					</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<Persons persons={persons} />
		</div>
	);
};

export default App;
