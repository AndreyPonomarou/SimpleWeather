import React, { useState } from 'react'
import axios from "axios";

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&lang=ru"&units=metric&appid=c08de1aa1e1fac2b340d80a90976bc8d`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }
  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter location'
          type="text" />
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{data.main.temp}°C</h1> : null}
            <div className='description'>
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>
        </div>
        {data.name !== undefined &&
          <div className='bottom'>
            <div className='feels'>
              {data.weather ? <p className='bold'>{data.main.feels_like} °C</p> : null}
              <p className='bold'>Feels like</p>
            </div>
            <div className='humidity'>
              {data.weather ? <p className='bold'>{data.main.humidity} %</p> : null}
              <p className='bold'>Humidity</p>
            </div>
            <div className='wind'>
              {data.wind ? <p className='bold'>{data.wind.speed} MPH</p> : null}
              <p className='bold'>Wind speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
