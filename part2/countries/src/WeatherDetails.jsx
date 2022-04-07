import React from 'react'

const WeatherDetails = ({result, weatherData}) =>
{
  const icon = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`

  return (
    <>
      <h3>Weather in { result.name.common }</h3>
      Temperature: { Math.round(weatherData.main.temp) } Celcius
      <br />

      <img src={ icon } alt="Icon" />
      <br />

      Wind: { weatherData.wind.speed } m/s
    </>
  )
}

export default WeatherDetails