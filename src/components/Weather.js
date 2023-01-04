import React, { useState } from "react";

import { InputGroup, Container, Form } from "react-bootstrap";
import {ToastContainer} from 'react-toastify'

import Cards from "./Cards";

const Weather = () => {
  const [city, setCity] = useState("New Delhi");
  const [inp, setInput] = useState("");

  const handleSubmit = (e) => {
    if(e.key === "Enter"){
      setCity(inp);
    }
  }

  return (
    <Container>
    <ToastContainer/>
      <div className="row m-3 p-3">
        <InputGroup className="mb-3" style={{ width: '18rem', marginLeft: 'auto', marginRight: 'auto', borderColor:'#000000' }}>
          <Form.Control
            className="text-center"
            placeholder="Enter City"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleSubmit}
          />
        </InputGroup>
      </div>
      <Cards city={city} />
    </Container>
  );
};

export default Weather;
