import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import './styles.css'
function FetchingWeather() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [city, setCity] = useState('')
  const [error, setError] = useState()
  const [weather, setWeather] = useState({
    humidity: "",
    temperature: "",
    windspeed: "",
    cloud: "",
    pressure: ""
  })

  const weatherUpdate = (report) => {
    setWeather(
      {
        humidity: report.main.humidity,
        temperature: Math.round(report.main.temp - 273),
        windspeed: report.wind.speed,
        pressure: report.main.pressure,
        cloud: report.weather[0].description
      })
  }


  const onSubmit = (formdata) => {
    setCity(formdata.city);
  };


  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e30b6fed10150cfad520f81ad9797897`)
      .then((response) => {
        console.log(response.data)
        setError("")
        weatherUpdate(response.data)
      })
      .catch((error) => setError("Data Not Found"))
  }, [city])
  return (
    <>
      {/* <div className="header">
        <strong className="heading">
          weather in your city
        </strong>
      </div> */}
      <div className="input-div">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="ui action input">
            <input type="text" name="city" placeholder="Enter your city name..." {...register("city")} />
            <button className="ui button" type='submit'>Search</button>
          </div>
        </form>
      </div >

      {


        weather.humidity ?
          <div className='content'>
            <table>
              <tbody>
                <tr>
                  <td><b>Humidity</b></td>
                  <td>{weather.humidity} %</td>

                </tr>
                <tr>
                  <td><b>Temperature</b></td>
                  <td>{weather.temperature} °С</td>

                </tr>
                <tr>
                  <td><b>Wind Speed</b></td>
                  <td>{weather.windspeed} m/s</td>

                </tr>

                <tr>
                  <td><b>Sky</b></td>
                  <td>{weather.cloud}</td>

                </tr>
                <tr>
                  <td><b>Pressure</b></td>
                  <td>{weather.pressure} hpa</td>

                </tr>
              </tbody>
            </table>
          </div>

          : <div className='content'>{error}
          </div>
      }
    </>
  )
}
export default FetchingWeather;