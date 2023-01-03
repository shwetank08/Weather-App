import {
  ThermometerLow,
  ThermometerHigh,
  GeoAltFill,
} from "react-bootstrap-icons";

import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
const { REACT_APP_API } = process.env;

const Cards = ({ city }) => {
  const [weather, setWeather] = useState({
    temp: "",
    min: "",
    max: "",
    wind: "",
    humidity: "",
    feelsLike: "",
    description: "",
  });

  const fetchCityWeather = async () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${REACT_APP_API}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let { feels_like, temp, temp_max, temp_min, humidity } = data.main;
        const { description } = data.weather[0];

        feels_like -= 273;
        temp -= 273;
        temp_max -= 273;
        temp_min -= 273;

        feels_like = feels_like.toFixed(2);
        temp = temp.toFixed(2);
        temp_max = temp_max.toFixed(2);
        temp_min = temp_min.toFixed(2);

        setWeather({
          temp: temp,
          min: temp_min,
          max: temp_max,
          humidity: humidity,
          feelsLike: feels_like,
          description: description,
        });

        // console.log(feels_like, temp, temp_max, temp_min, description);
      });
  };

  useEffect(() => {
    fetchCityWeather();
  }, []);

  return (
    <div className="container text-center">
      <div
        className="d-flex justify-content-between"
        style={{ color: "#ffffff" }}
      >
        <div>
          <div>{city}</div>
          <div>{weather.temp}&deg;C</div>
        </div>
        <div>
          <h2 style={{ color: "#ffffff" }}>{weather.description}</h2>
        </div>
      </div>
      <div className="d-flex sm:flex-wrap justify-content-around" style={{marginTop: "22rem", color:"#ffffff"}}>
        <Card style={{ width: "18rem", background: "rgba(255,255,255, 0.2)" }}>
          <Card.Body>
            <Card.Title>FEELS LIKE</Card.Title>
            <Card.Text>{weather.feelsLike}&deg;C</Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem", background: "rgba(255,255,255, 0.2)" }}>
          <Card.Body>
            <Card.Title>MAX</Card.Title>
            <Card.Text>{weather.min}&deg;C</Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem", background: "rgba(255,255,255, 0.2)" }}>
          <Card.Body>
            <Card.Title>MIN</Card.Title>
            <Card.Text>{weather.min}&deg;C</Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem", background: "rgba(255,255,255, 0.2)" }}>
          <Card.Body>
            <Card.Title>HUMIDITY</Card.Title>
            <Card.Text>{weather.humidity}%</Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Cards;
