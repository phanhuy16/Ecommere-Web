import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ProductModel, SubProductModel } from "../../models/Products";
import { useEffect, useState } from "react";
import handleAPI from "../../apis/handleAPI";
import {
  Breadcrumb,
  Button,
  message,
  Rate,
  Space,
  Spin,
  Tag,
  Typography,
} from "antd";
import { VND } from "../../utils/handleCurrency";
import { PiCableCar } from "react-icons/pi";
import { Add, Heart, Minus } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import { authSeletor } from "../../redux/reducres/authReducer";
import { addCart, cartSeletor } from "../../redux/reducres/cartReducer";

const { Title, Text, Paragraph } = Typography;

const ProductDetail = () => {
  const [productDetail, setProductDetail] = useState<ProductModel>();
  const [subProductSelected, setSubProductSelected] =
    useState<SubProductModel>();
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(1);
  const [inStockValue, setInStockValue] = useState(subProductSelected?.qty);

  const [params] = useSearchParams();
  const id = params.get("id");
  const sub = productDetail?.subProducts;
  const auth = useSelector(authSeletor);
  const navigate = useNavigate();
  const cart: SubProductModel[] = useSelector(cartSeletor);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      getProductDetail();
    }
  }, [id]);

  useEffect(() => {
    setCount(1);
  }, [subProductSelected]);

  useEffect(() => {
    const item = cart.find((element) => element.id === subProductSelected?.id);
    if (item && subProductSelected) {
      const qty = subProductSelected?.qty - item.count;
      setInStockValue(qty);
    } else {
      setInStockValue(subProductSelected?.qty);
    }
  }, [cart, subProductSelected]);

  const getProductDetail = async () => {
    setIsLoading(true);
    try {
      const res: any = await handleAPI({ url: `/Products/get-by-id?id=${id}` });
      setProductDetail(res);

      if (res?.subProducts?.length > 0) {
        setSubProductSelected(res.subProducts[0]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleCart = async () => {
  //   if (auth.id && auth.token) {
  //     if (subProductSelected) {
  //       const item = { ...subProductSelected, createdBy: auth.id, count };
  //       dispatch(addCart(item));
  //     } else {
  //       message.error("Please choice a product!");
  //     }
  //   } else {
  //     navigate(
  //       `/Account/login?id=${productDetail?.id}&slug=${productDetail?.slug}`
  //     );
  //   }
  // };

  const handleCart = async () => {
    if (auth.id && auth.token) {
      if (subProductSelected) {
        const item = subProductSelected;
        const value = {
          createdBy: auth.id,
          count,
          size: item.size,
          color: item.color,
          price: item.price,
          qty: item.qty,
          productId: item.product_Id,
          subProductId: item.id,
          image: item.images[0],
        };
        dispatch(addCart(value));
      } else {
        message.error("Please choice a product!");
      }
    } else {
      navigate(
        `/Account/login?id=${productDetail?.id}&slug=${productDetail?.slug}`
      );
    }
  };

  const renderBtnGroup = () => {
    const item = cart.find((element) => element.id === subProductSelected?.id);

    return (
      subProductSelected && (
        <>
          <div className="btn-gruop">
            <Button
              type="text"
              onClick={() => setCount(count - 1)}
              disabled={count === 1}
              icon={<Minus size={20} />}
            />
            <Text>{count}</Text>
            <Button
              type="text"
              disabled={
                count ===
                (item
                  ? (subProductSelected.qty = item.count)
                  : subProductSelected.qty)
              }
              onClick={() => setCount(count + 1)}
              icon={<Add size={20} />}
            />
          </div>
          <Button
            disabled={item?.count === subProductSelected.qty}
            onClick={handleCart}
            type="primary"
            style={{ minWidth: 200 }}
          >
            Add to Cart
          </Button>
        </>
      )
    );
  };

  return isLoading ? (
    <Spin fullscreen />
  ) : (
    <div className="container-fluid mt-3 mb-5">
      <div className="container">
        <Breadcrumb
          items={[
            {
              key: "home",
              title: <Link to={"/"}>Home</Link>,
            },
            {
              key: "shop",
              title: <Link to={"/shop"}>Shop</Link>,
            },
            {
              key: "title",
              title: productDetail?.title,
            },
          ]}
        />

        <div className="row mt-4">
          <div className="col-sm-12 col-md-6">
            <div className="bg-light text-center p-4">
              {subProductSelected?.images ? (
                <img
                  src={
                    subProductSelected?.images.length > 0
                      ? subProductSelected?.images[0]
                      : ""
                  }
                  style={{ width: "100%" }}
                  alt={productDetail?.title}
                />
              ) : (
                <PiCableCar size={48} className="text-muted" />
              )}
            </div>
            <Space wrap className="mt-4">
              {sub
                ? sub?.length > 0 &&
                  sub?.map((item) => (
                    <a onClick={() => setSubProductSelected(item)}>
                      <img
                        className="shadow-img"
                        src={item.images.length > 0 ? item.images[0] : ""}
                        style={{ width: 100, height: 120, objectFit: "cover" }}
                        alt=""
                      />
                    </a>
                  ))
                : ""}
            </Space>
          </div>

          <div className="col">
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="col">
                <Title level={2} className="m-0">
                  Pinterest
                </Title>
                <Title level={4} className="m-0">
                  {productDetail?.title}
                </Title>
              </div>
              <div>
                {subProductSelected?.qty ? (
                  <Tag
                    color={subProductSelected?.qty > 0 ? "success" : "error"}
                  >
                    {subProductSelected?.qty > 0
                      ? `in Stock (${inStockValue})`
                      : "out Stock"}
                  </Tag>
                ) : (
                  ""
                )}
              </div>
            </div>
            <Space>
              <Rate count={5} />
              <Text type="secondary">(5.0)</Text>
              <Text type="secondary">(1.0)</Text>
            </Space>
            <div className="mt-3">
              <Space>
                {subProductSelected?.price && (
                  <Title level={4} className="m-0" style={{ fontWeight: 500 }}>
                    {VND.format(
                      subProductSelected?.discount ?? subProductSelected.price
                    )}
                  </Title>
                )}
                {subProductSelected?.discount && (
                  <Title
                    type="secondary"
                    level={4}
                    className="m-0"
                    style={{ fontWeight: 400, textDecoration: "line-through" }}
                  >
                    {VND.format(subProductSelected.price)}
                  </Title>
                )}
              </Space>
              <div className="mt-3">
                <Paragraph style={{ textAlign: "justify", fontSize: 16 }}>
                  {productDetail?.description}
                </Paragraph>
              </div>
              <div className="mt-3">
                <Paragraph
                  style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}
                >
                  Colors
                </Paragraph>
                <Space>
                  {sub
                    ? sub.length > 0 &&
                      sub.map((item) => (
                        <a onClick={() => setSubProductSelected(item)}>
                          <div
                            className="color-item"
                            style={{ background: item.color }}
                          />
                        </a>
                      ))
                    : ""}
                </Space>
              </div>
              <div className="mt-3">
                <Paragraph
                  style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}
                >
                  Sizes
                </Paragraph>
                <Space>
                  {sub
                    ? sub.length > 0 &&
                      sub.map((item) => (
                        <Button
                          type={
                            subProductSelected?.size === item.size
                              ? "primary"
                              : "default"
                          }
                          onClick={() => setSubProductSelected(item)}
                        >
                          {item.size}
                        </Button>
                      ))
                    : ""}
                </Space>
              </div>
              <div className="mt-5">
                <Space>
                  {renderBtnGroup()}

                  <Button icon={<Heart size={20} />} />
                </Space>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
