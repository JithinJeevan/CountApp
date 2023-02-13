import React from "react";
import { Button, Form, Table } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

const NewTable = ({ tableData, deleteDataById, handleStatus }) => {
  return (
    <>
      <div className="mt-5 mx-4">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Domain Name</th>
              <th>Word Count</th>
              <th>URL</th>
              <th>Favourite</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData?.map((data, key) => (
              <tr key={key}>
                <td>{key + 1}</td>
                <td>{data.domain}</td>
                <td>{data.count}</td>
                <td>{data.url}</td>
                <td>
                  {data.status === "Y" ? (
                    <i className="bi bi-heart-fill text-danger"></i>
                  ) : (
                    <i className="bi bi-x-circle-fill"></i>
                  )}
                </td>
                <td>
                  {data.status === "Y" ? (
                    <>
                      <Button
                        onClick={() => {
                          handleStatus(data._id, "N");
                        }}
                      >
                        Remove Favourite
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={() => {
                          handleStatus(data._id, "Y");
                        }}
                      >
                        Add Favourite
                      </Button>
                    </>
                  )}
                  <Button
                    className="ms-1"
                    onClick={() => {
                      deleteDataById(data._id);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default NewTable;
