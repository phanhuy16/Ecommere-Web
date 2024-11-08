import {
  Affix,
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
  Drawer,
  Dropdown,
  List,
  Menu,
  Space,
  Typography,
} from "antd";
import { HambergerMenu, Heart } from "iconsax-react";
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart, AiOutlineTransaction } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import handleAPI from "../apis/handleAPI";
import { TransantionSubProductModal } from "../modals";
import { CartModel } from "../models/CartModel";
import { authSeletor, removeAuth } from "../redux/reducres/authReducer";
import { cartSeletor } from "../redux/reducres/cartReducer";
import { VND } from "../utils/handleCurrency";
import ButtonRemoveCartItem from "./ButtonRemoveCartItem";

const { Paragraph, Title, Text } = Typography;

const HeaderComponent = () => {
  const [isVisibleDrawer, setIsVisibleDrawer] = useState(false);
  const [visbleModelTransationProduct, setVisbleModelTransationProduct] =
    useState(false);
  const [productSelected, setProductSelected] = useState("");

  const auth = useSelector(authSeletor);
  const dispatch = useDispatch();
  const cart: CartModel[] = useSelector(cartSeletor);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (cart.length > 0) {
  //     handleUpdateCartToDatabase(cart);
  //   }
  // }, [cart]);

  // const handleUpdateCartToDatabase = async (data: CartModel[]) => {
  //   data.forEach(async (item) => {
  //     const api = `/Carts/add-new`;
  //     const value = {
  //       createdBy: item.createdBy,
  //       count: item.count,
  //       size: item.size,
  //       color: item.color,
  //       price: item.price,
  //       title: item.title,
  //       qty: item.qty,
  //       productId: item.productId,
  //       subProductId: item.subProductId,
  //       image: item.image,
  //     };

  //     try {
  //       await handleAPI({ url: api, data: value, method: "post" });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   });
  // };

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
              <Button
                icon={<BiSearch size={24} type="text" />}
                style={{ border: "none" }}
              />
              <Button
                icon={<Heart size={24} type="text" />}
                style={{ border: "none" }}
              />
              <Dropdown
                dropdownRender={() => (
                  <Card className="shadow" style={{ minWidth: 440 }}>
                    <Paragraph>
                      You have {cart.length} item in you cart
                    </Paragraph>
                    <List
                      dataSource={cart}
                      renderItem={(item) => (
                        <List.Item
                          key={item.id}
                          extra={
                            <div>
                              <Button
                                onClick={() => {
                                  setProductSelected(item.productId);
                                  setVisbleModelTransationProduct(true);
                                }}
                                icon={
                                  <AiOutlineTransaction
                                    size={20}
                                    className="text-muted"
                                  />
                                }
                              />
                              <ButtonRemoveCartItem item={item} />
                            </div>
                          }
                        >
                          <List.Item.Meta
                            avatar={
                              <Avatar
                                src={item.image}
                                size={48}
                                shape="square"
                              />
                            }
                            title={
                              <>
                                <Text style={{ fontSize: 16, fontWeight: 300 }}>
                                  {item.title}
                                </Text>
                                <Paragraph
                                  className="mb-0"
                                  style={{ fontSize: 16, fontWeight: 300 }}
                                >
                                  {item.count} x {VND.format(item.price)}
                                </Paragraph>
                              </>
                            }
                            description={`Size: ${item.size}`}
                          />
                        </List.Item>
                      )}
                    />
                    <Divider className="my-2" />
                    <Title level={5}>
                      Subtotal:{" "}
                      {VND.format(
                        // cart.reduce((a, b) => a + b.count * b.price, 0)
                        Array.isArray(cart)
                          ? cart.reduce((a, b) => a + b.count * b.price, 0)
                          : 0
                      )}
                    </Title>
                    <div className="mt-4">
                      <Button
                        onClick={() => navigate("/shop/checkout")}
                        type="primary"
                        className="mt-3"
                        size="large"
                        style={{ width: "100%" }}
                      >
                        Checkout
                      </Button>
                    </div>
                  </Card>
                )}
              >
                <Badge count={cart.length}>
                  <AiOutlineShoppingCart size={24} type="text" />
                </Badge>
              </Dropdown>
              {auth.token && auth.id ? (
                <Button
                  onClick={() => {
                    dispatch(removeAuth({}));
                    localStorage.clear();
                  }}
                  type="primary"
                  className="ms-4"
                >
                  Logout
                </Button>
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
      >
        Hello
      </Drawer>

      <TransantionSubProductModal
        visible={visbleModelTransationProduct}
        onClose={() => setVisbleModelTransationProduct(false)}
        productId={productSelected}
      />
    </Affix>
  );
};

export default HeaderComponent;
