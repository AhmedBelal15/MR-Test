import { useState, useEffect } from "react";
import Table from "../../components/Table/Table";
import getTableData from "./services/getTableData";
import Button from "../../components/Button/Button";
import { useHistory } from "react-router-dom";
const TablePage = () => {
  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    history.push("/auth");
  };

  const [tableData, setTableData] = useState([
    {
      input: "",
      data: "",
      average: "",
    },
  ]);
  const [user, setUser] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!currentUser) {
      history.push("/auth");
    } else {
        if(currentUser.name){
            setUser(currentUser.name);
        } else {
            setUser(currentUser.email);
        }
    }
  }, [currentUser, history]);

  useEffect(() => {
    getTableData(setTableData);
  }, []);
  const handleInputChange = (e, index) => {
    const regex = /^\d+$/;
    if (regex.test(e.target.value) || e.target.value === "") {
      const newState = [...tableData];
      newState[index].input = e.target.value;
      newState[index].average = (
        newState[index].input / newState[index].data
      ).toFixed(3);
      setTableData(newState);
    }
  };

  return (
    <div className="table-container">
      <p>Welcome {user}</p>
      <Button onClick={logout}> Logout? </Button>
      <Table handleInputChange={handleInputChange} tableData={tableData} />
    </div>
  );
};

export default TablePage;
