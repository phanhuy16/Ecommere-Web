import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AuthRouter from "./AuthRouter";
import MainRouter from "./MainRouter";
import { useDispatch, useSelector } from "react-redux";
import { addAuth, authSeletor } from "../redux/reducres/authReducer";
import handleAPI from "../apis/handleAPI";
import { syncCart } from "../redux/reducres/cartReducer";

const Routers = () => {
  const location: any = useLocation();
  const dispatch = useDispatch();
  const auth = useSelector(authSeletor);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getDatabaseDatas();
  }, [auth]);

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

  const getDatabaseDatas = async () => {
    setIsLoading(true);
    try {
      if (auth.id) {
        await getCartInDatabase();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCartInDatabase = async () => {
    const api = `/Carts/get-cart?id=${auth.id}`;
    const res = await handleAPI({ url: api });

    if (res.data && res.data.length > 0) {
      dispatch(syncCart(res.data));
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
