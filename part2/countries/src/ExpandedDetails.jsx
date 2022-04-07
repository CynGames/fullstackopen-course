import axios from 'axios'
import React, { useState, useEffect } from 'react'
import WeatherDetails from './WeatherDetails'

const ExpandedDetails = ({ result }) =>
{
  const [weatherData, setWeatherData] = useState()

  const langValues = Object.values(result.languages)
  const flagUrl = result.flags.png

  const WeatherAPI = process.env.REACT_APP_WEATHER_API_KEY

  useEffect(() =>
  {
    const latlng = `lat=${result.latlng[0]}&lon=${result.latlng[1]}`

    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?${latlng}&appid=${WeatherAPI}&units=metric`)
      .then(response =>
      {
        setWeatherData(response.data)
        return
      })

  }, [])

  // const icon = `http://openweathermap.org/img/wn/10d@2x.png`

  return (
    <>
      {/* {console.log(weatherData)} */ }

      <h1>{ result.name.common }</h1>

      Capital: { result.capital }

      <br />
      Area: { Math.round(result.area) }

      <h3>Languages:</h3>
      { langValues.map((value) => <li key={ value }>{ value }</li>) }

      <br />
      <img src={ flagUrl } alt="Flag" />

      { weatherData !== undefined && <WeatherDetails result={ result } weatherData={ weatherData } /> }
    </>
  )
}

export default ExpandedDetails