import "bootstrap/dist/css/bootstrap.min.css";

// import Login from './components/Login';
// import Login2 from './components/Login2';
import NewInput from "./components/NewInput";
import NewTable from "./components/NewTable";
import { useInputTable } from "./hook/useInputTable";

function App() {
  const {
    tableData,
    input,
    handleInput,
    handleSubmit,
    count,
    deleteDataById,
    handleStatus,
    isLoading
  } = useInputTable();

  return (
    <div className="App">
      <NewInput
        input={input}
        handleInput={handleInput}
        handleSubmit={handleSubmit}
        count={count}
        isLoading={isLoading}
      />
      <NewTable
        tableData={tableData}
        deleteDataById={deleteDataById}
        handleStatus={handleStatus}
      />
    </div>
  );
}

export default App;
