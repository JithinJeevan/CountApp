import axios from "axios";

const postFetchTableData = async (data) => {
  try {
    const result = await axios
      .post("/api/register", data)
      .then((response) => {
        return response;
      });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const putStatusUpdate = async (id,status) => {
  try {
    const result = await axios
      .put(`/api/update/${id}/${status}`)
      .then((response) => {
        return response;
      });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getTableData = async () => {
    try {
      const result = await axios
        .get(`/api/table`)
        .then((response) => {
          return response;
        });
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async (id) => {
    try {
      const result = await axios
        .delete(`/api/delete/${id}`)
        .then((response) => {
          return response;
        });
      return result;
    } catch (error) {
      console.log(error);
    }
  };

export { postFetchTableData,putStatusUpdate,getTableData,deleteData };
