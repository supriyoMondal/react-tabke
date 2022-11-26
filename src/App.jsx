import { useEffect, useState } from "react";
import "./App.css";
import Table from "./components/Table";

const headings = [
  { title: "Txn Date", sortAble: true, key: "txn_date" },
  { title: "Payment due Date", sortAble: true, key: "due_date" },
  { title: "Payer", sortAble: true, key: "payer" },
  { title: "Payee", sortAble: true, key: "payee" },
  { title: "Original Amt LCY", sortAble: true, key: "original" },
  { title: "USD Eqv.", sortAble: true, key: "usd" },
  { title: "Status", sortAble: true, key: "status" },
];

function App() {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    fetch("data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log(err.message);
        setUsers([]);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return <Table items={users} headings={headings} />;
}

export default App;
