import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import { useAuth } from "../../src/context/auth";

const myHost = import.meta.env.VITE_REACT_APP_API;

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(`${myHost}/api/v1/auth/user-auth`);
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}