import React from "react";
import { Button, Form } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
const NewInput = ({ input, handleInput, handleSubmit, count, isLoading }) => {
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center mt-5 px-5">
        <Form.Control
          placeholder="Enter Url"
          value={input.url}
          onChange={handleInput}
        />
        <Button
          className="btn btn-primary col-lg-3 mt-2"
          onClick={handleSubmit}
        >
          Get Count
        </Button>
        {isLoading ? <Spinner animation="border" className="mt-1" /> : null}
        <Form.Text>Total Word Count:{count}</Form.Text>
      </div>
    </>
  );
};

export default NewInput;
