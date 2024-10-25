import { Button, Menu, Space } from "antd";
import { Heart, ShoppingCart } from "iconsax-react";
import { BiPowerOff, BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authSeletor, removeAuth } from "../redux/reducres/authReducer";

const HeaderComponent = () => {
  const auth = useSelector(authSeletor);

  const dispatch = useDispatch();

  return (
    <div className="p-3">
      <div className="row">
        <div className="col">
          <img src="/assets/images/Logo.png" style={{ width: 100 }} alt="" />
        </div>
        <div className="col text-center">
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
            <Button icon={<ShoppingCart size={24} type="text" />} />
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
  );
};

export default HeaderComponent;
