import { Affix, Button, Drawer, Menu, Space } from "antd";
import { HambergerMenu, Heart } from "iconsax-react";
import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiPowerOff, BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authSeletor, removeAuth } from "../redux/reducres/authReducer";

const HeaderComponent = () => {
  const [isVisibleDrawer, setIsVisibleDrawer] = useState(false);
  const auth = useSelector(authSeletor);
  const dispatch = useDispatch();

  return (
    <Affix offsetTop={0}>
      <div className="p-3 container bg-white">
        <div className="row">
          <div className="d-none d-sm-block d-md-none">
            <Button
              type="primary"
              icon={
                <HambergerMenu
                  size={20}
                  onClick={() => setIsVisibleDrawer(true)}
                />
              }
            ></Button>
          </div>
          <div className="col d-none d-md-block">
            <img src="/assets/images/Logo.png" style={{ width: 100 }} alt="" />
          </div>
          <div className="col d-none d-md-block text-center">
            <Menu
              mode="horizontal"
              items={[
                { label: <Link to={"/"}>Home</Link>, key: "home" },
                {
                  label: <Link to={"/shop"}>Shop</Link>,
                  key: "shop",
                  children: [{ key: "cate", label: "Category" }],
                },
                { label: <Link to={"/sotry"}>Our Story</Link>, key: "sotry" },
                { label: <Link to={"/blog"}>Blog</Link>, key: "blog" },
                {
                  label: <Link to={"/contact"}>Contact Us</Link>,
                  key: "contact",
                },
              ]}
              style={{ border: "none" }}
            />
          </div>
          <div className="col text-end">
            <Space>
              <Button icon={<BiSearch size={24} type="text" />} />
              <Button icon={<Heart size={24} type="text" />} />
              <Button icon={<AiOutlineShoppingCart size={24} type="text" />} />
              {auth.token && auth.id ? (
                <Button
                  onClick={() => {
                    dispatch(removeAuth({}));
                    localStorage.clear();
                  }}
                  danger
                  type="text"
                  icon={<BiPowerOff size={20} />}
                />
              ) : (
                <Button type="primary">
                  <Link to={"/Account/login"}>Login</Link>
                </Button>
              )}
            </Space>
          </div>
        </div>
      </div>
      <Drawer
        open={isVisibleDrawer}
        onClick={() => setIsVisibleDrawer(false)}
        placement="left"
      ></Drawer>
    </Affix>
  );
};

export default HeaderComponent;
