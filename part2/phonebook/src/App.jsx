import { useState, useEffect } from "react";
import axios from "axios";
import personService from "./services/persons";
import "./index.css";

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
		<p key={props.person.id}>
			{props.person.name} {props.person.number}
			<button
				type="button"
				onClick={() => {
					if (window.confirm(`Do you want to delete ${props.person.name}?`)) {
						props.deletePerson(props.person.id);
					}
				}}
			>
				Delete
			</button>
		</p>
	);
};

const Persons = (props) => {
	return props.persons.map((person) => (
		<Person key={person.id} person={person} deletePerson={props.deletePerson} />
	));
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

const Notification = ({ errorMessage, successMessage }) => {
	if (errorMessage === "" && successMessage === "") {
		return "";
	}
	if (successMessage) {
		return <div className="success">{successMessage}</div>;
	}
	return <div className="error">{errorMessage}</div>;
};

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [searchInput, setSearchInput] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

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

	const deletePerson = (id) => {
		personService.remove(id).then(() => {
			setPersons(persons.filter((person) => person.id !== id));
		});
		setErrorMessage("Success");
		setTimeout(() => {
			setSuccessMessage("");
		}, 5000);
	};

	const addNewPerson = (event) => {
		event.preventDefault();
		const personObject = { name: newName, number: newNumber };
		if (persons.find((p) => p.name === newName)) {
			const id = persons.find((p) => p.name === newName).id;
			if (
				window.confirm(
					`${newName} is already added to phone book, replace the old number with a new one?`,
				)
			) {
				personService.update(id, personObject).then((response) => {
					personService.getAll().then((persons) => {
						setPersons(persons);
					});
				});
				setSuccessMessage(`Successfully updated phone number for ${newName}`);
				setTimeout(() => {
					setSuccessMessage("");
				}, 5000);
			}
		} else {
			personService.create(personObject).then((response) => {
				setPersons(persons.concat(personObject));
			});
			setSuccessMessage(`Successfully added ${newName}`);
			setTimeout(() => {
				setSuccessMessage("");
			}, 5000);
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
			<Notification
				errorMessage={errorMessage}
				successMessage={successMessage}
			/>
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
			<Persons persons={personsToShow} deletePerson={deletePerson} />
		</div>
	);
};

export default App;
