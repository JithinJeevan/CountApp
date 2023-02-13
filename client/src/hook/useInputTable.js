import { useEffect, useState } from "react";
import {
  deleteData,
  getTableData,
  postFetchTableData,
  putStatusUpdate,
} from "../service";

export const useInputTable = () => {
  const [input, setInput] = useState({ url: "" });
  const [tableData, setTableData] = useState([]);
  const [count, setCount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (event) => {
    const { value } = event.target;
    setInput({ ...input, url: value });
  };
  const handleSubmit = async () => {
    if (input.url !== "") {
      setIsLoading(true);
      const data = { url: input.url };
      const list = await postFetchTableData(data).then((res) => {
        setIsLoading(false);
        return res?.data?.data;
      });
      setTableData(list?.table);
      setCount(list?.count);
    }
  };
  const handleStatus = async (id, status) => {
    const list = await putStatusUpdate(id, status).then((res) => {
      if (res?.data?.status === 200) {
        getAllTableData();
      }

      return res?.data?.data;
    });
  };

  const getAllTableData = async () => {
    const list = await getTableData().then((res) => {
      return res?.data?.data;
    });
    setTableData(list);
  };

  const deleteDataById = async (id) => {
    const list = await deleteData(id).then((res) => {
      if (res?.data?.status === 200) {
        getAllTableData();
      }

      return res?.data?.data;
    });
  };

  useEffect(() => {
    getAllTableData();
  });

  return {
    tableData,
    input,
    handleInput,
    handleSubmit,
    count,
    deleteDataById,
    handleStatus,
    isLoading
  };
};
