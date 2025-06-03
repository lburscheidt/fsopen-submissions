import { useState, useEffect } from "react";
import personService from "./services/persons";
import axios from "axios";
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

const Persons = ({
  personsToShow, deletePerson }) => {
  return personsToShow.map((p) => (
    <Person key={ p.id } id={ p.id } name={ p.name } number={ p.number } deletePerson={ deletePerson } />
  ));
};

const Person = (props) => {
  console.log(props)
  return (<p key={ props.id }>{ props.name } { props.number } <button
    type="button"
    onClick={ () => {
      if (window.confirm(`Do you want to delete ${props.name}?`)) {
        props.deletePerson(props.id, props.name);
      }
    } }
  >
    Delete
  </button></p>)
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);
  console.log("render", persons.length, "notes");

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
    personService.remove(id).then((response) => setPersons(persons.filter((person) => person.id !== id)));
  }

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.find((p) => p.name === newName)) {
      alert(`${newName} is already in phonebook`);
    } else {
      const newPerson = { name: newName, number: newNumber };
      setPersons(persons.concat(newPerson));
      personService.create(newPerson).then((response) => {
        setPersons(persons.concat(response.data));
      });
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
      <Persons personsToShow={ personsToShow } deletePerson={ deletePerson } />
    </div>
  );
};

export default App;
