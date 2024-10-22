import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AuthRouter from "./AuthRouter";
import MainRouter from "./MainRouter";

const Routers = () => {
  const [isLoading, setIsLoading] = useState(false);

  const location: any = useLocation();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(true);
    try {
      // const res = localStorage.getItem(localDataNames.authData);
      // if (res) {
      //   dispatch(addAuth(JSON.parse(res)));
      // }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <Spin />
  ) : location && location.pathname.includes("Account") ? (
    <AuthRouter />
  ) : (
    <MainRouter />
  );
};

export default Routers;
