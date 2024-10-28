import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AuthRouter from "./AuthRouter";
import MainRouter from "./MainRouter";
import { useDispatch } from "react-redux";
import { addAuth } from "../redux/reducres/authReducer";

const Routers = () => {
  const location: any = useLocation();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(true);
    try {
      const res = localStorage.getItem("authData");
      if (res) {
        dispatch(addAuth(JSON.parse(res)));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <Spin fullscreen />
  ) : location && location.pathname.includes("Account") ? (
    <AuthRouter />
  ) : (
    <MainRouter />
  );
};

export default Routers;
