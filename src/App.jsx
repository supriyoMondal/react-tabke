import axios from "axios";
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

const USER_CACHE = "@cached-users";

function App() {
  const [users, setUsers] = useState(() => {
    const cachedData = localStorage.getItem(USER_CACHE);
    return cachedData ? JSON.parse(cachedData) : [];
  });

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://api.npoint.io/d08372d413d79e8056f1"
      );
      setUsers(response.data);
      localStorage.setItem(USER_CACHE, JSON.stringify(response.data));
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return <Table items={users} headings={headings} />;
}

export default App;
