import { useState, useEffect } from "react"

import axios from "axios"
import Country from "./Country";

const App = () =>
{
  const [countries, setCountries] = useState([]);

  const [countryQuery, setCountryQuery] = useState("")
  const [validQuery, setValidQuery] = useState(true)
  const [results, setResults] = useState([])

  useEffect(() =>
  {
    // I was not able call the restcountries' API since the SLL certificate for the site has expired and trying to force axios to ignore it just threw me into a rabbit hole of errors. So I ended up downloading the data it returned (using Postman) and storing it as a json file in the "public" folder. I'm still using Axios to fetch the data as if I'm using the exercise API.

    axios
      .get("db.json")
      .then(response =>
      {
        setCountries(response.data)
      })
  }, []);

  useEffect(() =>
  {
    if (countryQuery.length < 1)
    {
      setValidQuery(true)
      return
    }

    const resultValues = countries.filter(country =>
      country.name.common.toLowerCase().includes(countryQuery.toLowerCase())
    );

    if (resultValues.length > 10)
    {

      setValidQuery(false)
      return
    }

    setValidQuery(true)
    setResults(resultValues)

  }, [countryQuery])

  return (
    <>
      Find Countries: <input autoFocus value={ countryQuery } onChange={ (e) => setCountryQuery(e.target.value) } />

      <br />

      { validQuery
        ? results.map(result =>
          <Country
            key={ result.name.common }
            result={ result }
            isOnlyResult={ results.length === 1 }
            setCountryQuery={ setCountryQuery }
          />
        )
        : "Too many searches, specify another filter" }
    </>
  );
}

export default App;
