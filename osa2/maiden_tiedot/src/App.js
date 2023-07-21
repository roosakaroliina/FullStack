import countryService from './services/countries'
import { useState, useEffect } from 'react'
import axios from 'axios'


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
      <img src={country.flags.png} alt={country.name.common} />

      <h2>Weather in {country.capital}</h2>
      <Weather key={country.name.common} country={country} />
    </div>
  )
}

const Weather = (props) => {
  const [weatherData, setWeatherData] = useState(null)
  const lat = props.country.capitalInfo.latlng[0]
  const lon = props.country.capitalInfo.latlng[1]
  const api_key = process.env.REACT_APP_API_KEY
  const part = 'daily'

  useEffect(() => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${api_key}`
    axios
      .get(weatherUrl)
      .then((response) => {
        console.log(response.data)
        setWeatherData(response.data)
      })
    }, [lat, lon, api_key, part])

    let temp = null
    let celcius = null
    if( weatherData ) {
      let icon = weatherData.current.weather[0].icon
      temp = weatherData.current.temp
      celcius = (temp - 273.15)
      let wind = weatherData.current.wind_speed
      const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`
      return (
        <div>
          temperature {Number((celcius).toFixed(2))} Celcius
          <br />
          <img src={iconUrl} alt='icons' />
          <br />
          wind {wind} m/s
        </div>
      )
    } else {
      return <div>Loading weather data...</div>;
    }
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