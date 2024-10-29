import { Link, useSearchParams } from "react-router-dom";
import { ProductModel, SubProductModel } from "../../models/Products";
import { useEffect, useState } from "react";
import handleAPI from "../../apis/handleAPI";
import { Breadcrumb, Button, Rate, Space, Spin, Tag, Typography } from "antd";
import { VND } from "../../utils/handleCurrency";

const { Title, Text, Paragraph } = Typography;

const ProductDetail = () => {
  const [productDetail, setProductDetail] = useState<ProductModel>();
  const [subProductSelected, setSubProductSelected] =
    useState<SubProductModel>();
  const [isLoading, setIsLoading] = useState(false);

  const [params] = useSearchParams();

  const id = params.get("id");
  const sub = productDetail?.subProducts;

  useEffect(() => {
    if (id) {
      getProductDetail();
    }
  }, [id]);

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

  return isLoading ? (
    <Spin />
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
                ""
              )}
            </div>
            <Space wrap className="mt-2">
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
                    {subProductSelected?.qty > 0 ? "in Stock" : "out Stock"}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
