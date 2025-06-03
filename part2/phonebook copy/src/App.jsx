import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import personService from "./services/persons";

const Notification = ({ errorMessage, successMessage }) => {
	if (errorMessage === "" && successMessage === "") {
		return null;
	}
	if (errorMessage) {
		return <div className="error">{errorMessage}</div>;
	}
	if (successMessage) {
		return <div className="success">{successMessage}</div>;
	}
};

const Filter = (props) => {
	return (
		<div>
			filter shown with{" "}
			<input value={props.searchInput} onChange={props.handleSearchInput} />
		</div>
	);
};
const PersonForm = (props) => {
	return (
		<form onSubmit={props.addPerson}>
			<div>
				name: <input value={props.newName} onChange={props.handleNameChange} />
			</div>
			<div>
				number{" "}
				<input value={props.newNumber} onChange={props.handleNumberChange} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};

const Persons = (props) => {
	return props.personsToShow.map((p) => (
		<p key={p.id}>
			{p.name} {p.number}
			<button
				type="button"
				onClick={() => {
					if (window.confirm(`Do you want to delete ${p.name}?`)) {
						props.deletePerson(p.id, p.name);
					}
				}}
			>
				Delete
			</button>
		</p>
	));
};

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [searchInput, setSearchInput] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	useEffect(() => {
		personService.getAll().then((initialPersons) => {
			setPersons(initialPersons);
		});
	}, []);

	const handleNameChange = (e) => {
		setNewName(e.target.value);
	};

	const handleNumberChange = (e) => {
		setNewNumber(e.target.value);
	};

	const handleSearchInput = (e) => {
		setSearchInput(e.target.value);
	};

	const addPerson = (e) => {
		e.preventDefault();
		const newPerson = { name: newName, number: newNumber };
		if (persons.find((p) => p.name === newName)) {
			const id = persons.find((p) => p.name === newName).id;
			if (window.confirm("Already in phonebook, replace number?")) {
				personService
					.update(id, newPerson)
					.then((returnedPerson) => {
						setPersons(persons.map((p) => (p.id === id ? returnedPerson : p)));
						setSuccessMessage(`Successfully updated number for ${newName}`);
						setTimeout(() => {
							setSuccessMessage("");
						}, 5000);
						setNewName("");
						setNewNumber("");
					})
					.catch((error) => {
						setErrorMessage(
							`Information for ${newName} already removed from server`,
						);
						setTimeout(() => {
							setErrorMessage("");
						}, 5000);
						setPersons(persons.filter((p) => p.id !== id));
						setNewName("");
						setNewNumber("");
					});
			} else {
				setNewName("");
				setNewNumber("");
			}
		} else {
			personService.create(newPerson).then((returnedPerson) => {
				setPersons(persons.concat(returnedPerson));
			});
			setSuccessMessage(`Successfully added ${newName}`);
			setTimeout(() => {
				setSuccessMessage("");
			}, 5000);
			setNewName("");
			setNewNumber("");
		}
	};

	const deletePerson = (id, name) => {
		personService.remove(id).then(() => {
			setPersons(persons.filter((person) => person.id !== id));
			setSuccessMessage(`Successfully deleted ${name}`);
			setTimeout(() => {
				setSuccessMessage("");
			}, 5000);
		});
	};

	const personsToShow = !searchInput
		? persons
		: persons.filter((person) =>
				person.name.toLowerCase().startsWith(searchInput.toLowerCase()),
			);

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification
				errorMessage={errorMessage}
				successMessage={successMessage}
			/>
			<Filter searchInput={searchInput} handleSearchInput={handleSearchInput} />
			<h3>add a new</h3>
			<PersonForm
				newName={newName}
				newNumber={newNumber}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
				addPerson={addPerson}
			/>
			<h2>Numbers</h2>
			<Persons personsToShow={personsToShow} deletePerson={deletePerson} />
		</div>
	);
};
export default App;
