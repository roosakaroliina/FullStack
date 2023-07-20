import countryService from './services/countries'
import { useState, useEffect } from 'react'

const Filter = (props) => {
  return (
    <div>
      <p>
        find countries <input
          filter={props.filter}
          onChange={props.handleFilterChange}
        />
      </p>
    </div>
  )
}

const CountryInfo = ({ country }) => {
  return (
    <div key={country.name.common}>
      <h1>{country.name.common}</h1>
      capital: {country.capital}
      <br />
      area: {country.area}
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((language, i) => (
          <li key={i}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.name.common}/>
    </div>
  )
}

const Countries = (props) => {
  const [selectedCountry, setSelectedCountry] = useState(null)

  if (props.filterCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  else if (props.filterCountries.length === 1) {
    return (
      <div>
        {props.filterCountries.map(country => (
          <CountryInfo key={country.name.common} country={country} />
        ))}
      </div>
    )
  }
  else {
    return (
      <div>
        {props.filterCountries.map((country) => (
          <div key={country.name.common}>
            <p>
              {country.name.common}
              <button onClick={() => setSelectedCountry(country)}>show</button>
            </p>
            {selectedCountry === country && (<CountryInfo country={selectedCountry} />
            )}
          </div>
        ))}
      </div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const filterCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Countries filterCountries={filterCountries} />
    </div>
  )
}

export default App