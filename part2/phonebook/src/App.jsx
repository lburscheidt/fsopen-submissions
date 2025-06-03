import { useState } from "react";

const Filter = (props) => {
  return (
    <label>
      filter shown with{ " " }
      <input value={ props.searchInput } onChange={ props.handleSearchInput } />
    </label>
  );
};

const PersonForm = (props) => {
  return (
    <form onSubmit={ props.addPerson }>
      <div>
        name: <input value={ props.newName } onChange={ props.handleNameChange } />
      </div>
      <div>
        number:{ " " }
        <input value={ props.newNumber } onChange={ props.handleNumberChange } />
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = (props) => {
  return props.personsToShow.map((person) => (
    <p key={ person.name }>
      { person.name } { person.number }
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

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.find((p) => p.name === newName)) {
      alert(`${newName} is already in phonebook`);
    } else {
      const newPerson = { name: newName, number: newNumber };
      setPersons(persons.concat(newPerson));
    }
    setNewName("");
    setNewNumber("");
  };

  const personsToShow =
    searchInput === ""
      ? persons
      : persons.filter((person) =>
        person.name.toLowerCase().startsWith(searchInput.toLowerCase()),
      );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchInput={ searchInput } handleSearchInput={ handleSearchInput } />
      <h2>add a new</h2>
      <PersonForm
        newName={ newName }
        newNumber={ newNumber }
        handleNameChange={ handleNameChange }
        handleNumberChange={ handleNumberChange }
        addPerson={ addPerson }
      />
      <h2>Numbers</h2>
      <Persons personsToShow={ personsToShow } />
    </div>
  );
};

export default App;
