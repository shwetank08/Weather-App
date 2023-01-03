import React, { useState } from "react";
import { InputGroup, Container, Form } from "react-bootstrap";
import Cards from "./Cards";
const Weather = () => {
  const [city, setCity] = useState("New Delhi");
  return (
    <Container>
      <div className="row m-3 p-3">
        <InputGroup className="mb-3 border-0" style={{ width: '18rem', marginLeft: 'auto', marginRight: 'auto' }}>
          <Form.Control
            className="text-center"
            placeholder="Enter City"
            onChange={(e) => setCity(e.target.value)}
          />
        </InputGroup>
      </div>
      <Cards city={city} />
    </Container>
  );
};

export default Weather;
