import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const { REACT_APP_API } = process.env;

const Cards = ({ city }) => {
  city = city.toUpperCase();
  const [place, setPlace] = useState(city);
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
      setPlace(city);
      setWeather({
        temp: temp,
        wind: speed,
        humidity: humidity,
        feelsLike: feels_like,
        desc: desc,
        imageUrl: `http://openweathermap.org/img/w/${icon}.png`,
      });
    } catch (err) {
      return toast("City Data Not Present!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    fetchCityWeather();
  }, [city]);

  return (
    <Card bg="dark" text="white" style={{ width: "100%", height: "35rem" }}>
      <Card.Body>
        <div className="d-flex justify-content-around">
          <div className="d-flex flex-column display-1" style={{textAlign: "center"}}>
            <div style={{textAlign: "center"}}> {place} </div>
            <div>{weather.temp}&deg;C </div>
          </div>
          <div className="d-flex flex-column display-6">
            <img src={weather.imageUrl} alt="weather icon" style={{width: "100px",}} />
            <div style={{textAlign: "center"}}>{weather.desc}</div>
          </div>
        </div>
        <div className="d-flex justify-content-around" style={{marginTop: "10%"}}>
          <Card style={{background: "rgba(255,255,255, 0.2)", width: "30%", textAlign: "center", padding: "1rem"}}>
            <Card.Title>FEELS LIKE</Card.Title>
            <Card.Title>{weather.feelsLike}&deg;C</Card.Title>
          </Card>
          <Card style={{background: "rgba(255,255,255, 0.2)", width: "30%", textAlign: "center", padding: "1rem"}}>
            <Card.Title>WIND</Card.Title>
            <Card.Title>{weather.wind}MPH</Card.Title>
          </Card>
          <Card style={{background: "rgba(255,255,255, 0.2)", width: "30%", textAlign: "center", padding: "1rem"}}>
            <Card.Title>HUMIDITY</Card.Title>
            <Card.Title>{weather.humidity}%</Card.Title>
          </Card>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Cards;
