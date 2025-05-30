import { useState, useEffect } from "react";
import axios from "axios";

const Filter = (props) => {
  return (
    <label>
      find countries
      <input value={ props.searchInput } onChange={ props.handleSearchInput } />
    </label>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countryNames, setCountryNames] = useState([])
  const [searchInput, setSearchInput] = useState("");

  /*create list of country names */
  useEffect(() => {
    console.log("effect");
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        const notes = response.data;
        setCountryNames(notes.map((note) => (note.name.common)))
      });
  }, []);

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  /*  const countriesToShow = searchInput
      /*? countryNames.filter((c) => c.toLowerCase().includes(searchInput))
      : countryNames;*/
  const countriesLength = countryNames.filter((c) => c.toLowerCase().includes(searchInput)).length

  const countriesToShow =
    searchInput !== "" && countriesLength <= 10 ?
      countryNames.filter((c) => c.toLowerCase().includes(searchInput)).map((item, index) => index ? <><br key={ c } />{ item }</> : <Fragment key={ c }>{ item }</Fragment>) :
      "Too many countries"

  console.log(countriesToShow)


  /*const singleNames = countriesNames.map((c) => { c.name.common })
  
  console.log(singleNames)*/
  return (
    <>
      <Filter searchInput={ searchInput } handleSearchInput={ handleSearchInput } />
      <div>{ countriesToShow }</div>
    </>
  );
};

export default App;
