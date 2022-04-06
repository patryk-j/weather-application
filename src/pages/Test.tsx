import React, { useState } from "react";
import "./Test.scss";
import axios from "axios";

interface TestProps {}

interface City {
  id: number;
  name: string;
  temp: number;
  country: string;
  speed: number;
  pressure: number;
  main: string;
}

interface Weather {
  id: number;
  name: string;
  main: {
    temp: number;
    pressure: number;
  };
  sys: {
    country: string;
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

export const Test: React.FC<TestProps> = () => {
  const [weather, setWeather] = useState<null | City>(null);
  const [query, setQuery] = useState("");
  // const [loading, setLoading] = useState(true);

  const searchLocation = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      axios
        .get(
          `${api.base}weather?q=${query}&units=metric&lang=pl&appid=${api.key}`
        )
        .then((response: Response) => {
          setWeather({
            id: response.data.id,
            name: response.data.name,
            temp: response.data.main.temp,
            pressure: response.data.main.pressure,
            country: response.data.sys.country,
            speed: response.data.wind.speed,
            main: response.data.weather.main,
          });
          console.log(response);
          setQuery("");
          // console.log(weather);
          // setLoading(false);
        });
    }
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
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
      <div className="button-check">
        <button>Check</button>
      </div>
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
                <p className="mini-text">Wiatr</p>
                <p>{Math.round(weather.speed)} km/h</p>
              </div>
              <div className="pressure">
                <p className="mini-text">Ciśnienie</p>
                <p>{weather.pressure} hPa</p>
              </div>
            </div>
            {/* <p>weather-main {weather.main}</p> */}
          </div>
        </div>
      )}
    </div>
  );
};
