import { useState, useEffect } from "react";
import axios from "axios";
import personService from "./services";
const Filter = (props) => {
	return (
		<label>
			filter shown with{" "}
			<input value={props.searchInput} onChange={props.handleSearchInput} />
		</label>
	);
};

const Person = (props) => {
	return (
		<p key={props.person.name}>
			{props.person.name} {props.person.number}
		</p>
	);
};

const Persons = (props) => {
	return props.persons.map((person) => <Person person={person} />);
};

const PersonForm = (props) => {
	return (
		<form>
			<div>
				name: <input value={props.newName} onChange={props.handleNameChange} />
			</div>
			<div>
				number:{" "}
				<input value={props.newNumber} onChange={props.handleNumberChange} />
			</div>
			<div>
				<button type="submit" onClick={props.addNewPerson}>
					add
				</button>
			</div>
		</form>
	);
};

const App = () => {
	const [persons, setPersons] = useState([]);

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
			personService.create(personObject).then((response) => {
				setPersons(persons.concat(personObject));
			});
		}
		setNewName("");
		setNewNumber("");
	};

	useEffect(() => {
		console.log("effect");
		axios.get("http://localhost:3001/persons").then((response) => {
			console.log("promise fulfilled");
			setPersons(response.data);
		});
	}, []);

	return (
		<div>
			<h2>Phone Book</h2>
			<Filter searchInput={searchInput} handleSearchInput={handleSearchInput} />
			<h3>Add a new</h3>
			<PersonForm
				newName={newName}
				handleNameChange={handleNameChange}
				newNumber={newNumber}
				handleNumberChange={handleNumberChange}
				addNewPerson={addNewPerson}
			/>
			<h3>Numbers</h3>
			<Persons persons={personsToShow} />
		</div>
	);
};

export default App;
