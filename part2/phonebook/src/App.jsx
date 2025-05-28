import { useState } from "react";

const Persons = (props) => {
	return props.persons.map((person) => (
		<p key={person.name}>
			{person.name} {person.number}
		</p>
	));
};

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [searchInput, setSearchInput] = useState("");

	const personsToShow = searchInput
		? persons.filter((p) => p.name.toLowerCase().includes(searchInput))
		: persons;

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	const handleSearchInput = (event) => {
		setSearchInput(event.target.value);
	};

	const addNewPerson = (event) => {
		event.preventDefault();
		const personObject = { name: newName, number: newNumber };
		if (persons.find((p) => p.name === newName)) {
			alert(`${newName} is already added to phone book`);
		} else {
			setPersons(persons.concat(personObject));
		}
		setNewName("");
		setNewNumber("");
	};

	return (
		<div>
			<h2>Phone Book</h2>
			<p>
				filter shown with{" "}
				<input value={searchInput} onChange={handleSearchInput} />
			</p>
			<h2>add a new</h2>
			<form>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
				</div>
				<div>
					number: <input value={newNumber} onChange={handleNumberChange} />
				</div>
				<div>
					<button type="submit" onClick={addNewPerson}>
						add
					</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<Persons persons={personsToShow} />
		</div>
	);
};

export default App;
