import React, { useState } from "react";
import "./HomePage.scss";
import axios from "axios";
import {
  WiSunrise,
  WiSunset,
  WiStrongWind,
  WiThermometer,
  WiBarometer,
  // @ts-ignore
} from "weather-icons-react";

interface TestProps {}

interface City {
  id: number;
  name: string;
  temp: number;
  country: string;
  speed: number;
  pressure: number;
  main: string;
  temp_min: number;
  temp_max: number;
  sunrise: number;
  sunset: number;
}

interface Weather {
  id: number;
  name: string;
  main: {
    temp: number;
    pressure: number;
    temp_max: number;
    temp_min: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  wind: {
    speed: number;
  };
  weather: {
    main: string;
  };
}

interface Response {
  data: Weather;
}

const logo = require("../image/wth.png");

const api = {
  key: "3889f2f9cbdff2f72e59e36233f9e681",
  base: "https://api.openweathermap.org/data/2.5/",
};

export const HomePage: React.FC<TestProps> = () => {
  const [weather, setWeather] = useState<null | City>(null);
  const [query, setQuery] = useState("");
  // const [loading, setLoading] = useState(true);

  const searchLocation = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      axios
        .get(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then((response: Response) => {
          setWeather({
            id: response.data.id,
            name: response.data.name,
            temp: response.data.main.temp,
            pressure: response.data.main.pressure,
            country: response.data.sys.country,
            speed: response.data.wind.speed,
            main: response.data.weather.main,
            temp_min: response.data.main.temp_min,
            temp_max: response.data.main.temp_max,
            sunrise: response.data.sys.sunrise,
            sunset: response.data.sys.sunset,
          });
          console.log(response);
          setQuery("");
          // console.log(weather);
          // setLoading(false);
        });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const dateBuilder = (d: any) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const timeOfSunsetAndSunrise = (timeOfSunsetAndSunrise: any) => {
    let hours = timeOfSunsetAndSunrise.getHours();
    let minutes = timeOfSunsetAndSunrise.getMinutes();
    return `${hours}:${minutes}`;
  };

  // useEffect(() => {
  //   searchLocation();
  // }, []);

  return (
    <div className="app">
      <h1 className="h1-header">WEATHER APP</h1>
      <img src={logo} className="logo" alt="weather" />
      <div className="search-box">
        <input
          type="text"
          placeholder="Search..."
          onChange={handleChange}
          value={query}
          onKeyPress={searchLocation}
          autoComplete="on"
        />
      </div>
      {/* <div className="button-check">
        <button>Check</button>
      </div> */}
      <div className="date">{dateBuilder(new Date())}</div>
      {weather && (
        <div className="city-description">
          <div className="p-city" key={weather.id}>
            <p className="p-city">
              {weather.name}, {weather.country}
            </p>
            <p className="p-temperature">{Math.round(weather.temp)}°C</p>

            <div className="block">
              <div className="wind">
                {<WiStrongWind size={30} color="#8c8991" />}
                <p className="mini-text"> Wind</p>
                <p>{Math.round(weather.speed)} km/h</p>
              </div>

              <div className="pressure">
                {<WiBarometer size={30} color="#195380" />}
                <p className="mini-text">Pressure</p>
                <p>{weather.pressure} hPa</p>
              </div>
            </div>
            <div className="high-low">
              {<WiThermometer size={30} color="#705f3e" />}
              <p className="mini-text">High/Low</p>
              <p>
                {Math.round(weather.temp_max)}°C/{Math.round(weather.temp_min)}
                °C
              </p>
            </div>
            <div className="block-sunrise">
              <div className="wind">
                {<WiSunrise size={30} color="#f5d442" />}
                <p className="mini-text">Sunrise</p>
                <p>
                  {timeOfSunsetAndSunrise(new Date(weather.sunrise * 1000))}
                </p>
              </div>
              <div className="pressure">
                {<WiSunset size={30} color="#f58742" />}
                <p className="mini-text">Sunset</p>

                <p>{timeOfSunsetAndSunrise(new Date(weather.sunset * 1000))}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
