import React, { useEffect, useState } from "react";
import { Card, Alert } from "react-bootstrap";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const { REACT_APP_API } = process.env;


const Cards = ({ city }) => {
  city = city.toUpperCase();
  const [weather, setWeather] = useState({
    temp: "",
    wind: "",
    humidity: "",
    feelsLike: "",
    desc: "",
    imageUrl: "",
  });

  const fetchCityWeather = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${REACT_APP_API}`
      );

      const data = await res.json();

      let { feels_like, temp, humidity } = data.main;
      const { description, icon } = data.weather[0];
      const { speed } = data.wind;

      feels_like -= 273;
      temp -= 273;

      feels_like = feels_like.toFixed(2);
      temp = temp.toFixed(2);

      let desc = description.toUpperCase();

      setWeather({
        temp: temp,
        wind: speed,
        humidity: humidity,
        feelsLike: feels_like,
        desc: desc,
        imageUrl: `http://openweathermap.org/img/w/${icon}.png`,
      });
    } catch (err) {
      return (<Alert variant="warning">City Not Found</Alert>)
    }
  };

  useEffect(() => {
    fetchCityWeather();
  }, [city]);

  return (
    <div className="container text-center">
      <div
        className="d-flex justify-content-between"
        style={{ color: "#000000", marginTop: "2rem" }}
      >
        <div>
          <div>
            <h1>{city}</h1>
          </div>
          <div style={{ textSize: "50px" }}>
            <h1>{weather.temp}&deg;C</h1>
          </div>
        </div>
        <div>
          <img src={weather.imageUrl} alt="weather icon" />
          <h2 style={{ color: "#000000" }}>{weather.desc}</h2>
        </div>
      </div>
      <div
        className="d-flex border-0 sm:flex-wrap justify-content-around"
        style={{ marginTop: "20%", color: "#000000" }}
      >
        <Card
          className="border-0"
          style={{ width: "18rem", background: "rgba(255,255,255, 0.2)" }}
        >
          <Card.Body>
            <Card.Title>FEELS LIKE</Card.Title>
            <Card.Text>{weather.feelsLike}&deg;C</Card.Text>
          </Card.Body>
        </Card>
        <Card className="border-0" style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>WIND</Card.Title>
            <Card.Text>{weather.wind} MPH</Card.Text>
          </Card.Body>
        </Card>
        <Card
          className="border-0"
          style={{ width: "18rem", background: "rgba(255,255,255, 0.2)" }}
        >
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
