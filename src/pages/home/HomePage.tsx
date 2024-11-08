import { Button, Carousel, message, Space, Spin, Typography } from "antd";
import { ArrowLeft, ArrowRight } from "iconsax-react";
import { useEffect, useRef, useState } from "react";
import handleAPI from "../../apis/handleAPI";
import { ProductItem, TabbarComponent } from "../../components";
import Section from "../../components/Section";
import { CategoryModel, ProductModel } from "../../models/Products";
import { PromotionModel } from "../../models/PromotionModel";
import { CarouselRef } from "antd/es/carousel";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const HomePage = () => {
  const [promotions, setPromotions] = useState<PromotionModel[]>([]);
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [numOfColumn, setNumOfColumn] = useState(4);
  const [catsArray, setCatsArray] = useState<
    {
      key: string;
      values: CategoryModel[];
    }[]
  >([]);
  const [bestSellers, setBestSellers] = useState<ProductModel[]>([]);

  const catSlideRef = useRef<CarouselRef>(null);
  const cats = categories.filter((element) => !element.parentId);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      const width = window.innerWidth;
      const index = width <= 480 ? 2 : width <= 768 ? 3 : 4;

      setNumOfColumn(index);
    });

    return () => window.removeEventListener("resize", () => {});
  }, []);

  useEffect(() => {
    const items: any[] = [];
    const numOfDatas = Math.ceil(cats.length / numOfColumn);

    for (let index = 0; index < numOfDatas; index++) {
      const values = cats.slice(0, numOfColumn);
      items.push({
        key: `array${index}`,
        values,
      });
    }

    setCatsArray(items);
  }, [numOfColumn, categories]);

  const getData = async () => {
    setIsLoading(true);

    try {
      await getPromotions();
      await getCategories();
      await getBestSeller();
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getPromotions = async () => {
    const api = `/Promotion/get-all`;
    const res = await handleAPI({ url: api });
    setPromotions(res.data);
  };

  const getCategories = async () => {
    const api = "/Categories/get-all";
    const res: any = await handleAPI({ url: api });
    setCategories(res);
  };

  const getBestSeller = async () => {
    try {
      const res: any = await handleAPI({ url: `/Products/get-best-seller` });
      setBestSellers(res);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return isLoading ? (
    <Spin fullscreen />
  ) : (
    <>
      <div className="container-fuild d-none d-md-block">
        <div className="container">
          {promotions.length > 0 && (
            <Carousel
              speed={3000}
              autoplay
              style={{ width: "100%", height: 665 }}
            >
              {promotions.map((item) => (
                <div key={item.id}>
                  <img
                    src={item.imageURL}
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                      maxHeight: 665,
                      borderRadius: 10,
                    }}
                    alt=""
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "35%",
                      left: 60,
                    }}
                  >
                    <Title className="m-0" level={1}>
                      {item.title}
                    </Title>
                    <Title level={3} className="fw-normal">
                      UP TO {item.value} {item.type === "percent" ? "%" : ""}
                    </Title>

                    <div className="mt-4">
                      <Button
                        iconPosition="end"
                        type="primary"
                        size="large"
                        icon={<ArrowRight size={20} />}
                      >
                        Shop now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          )}
        </div>
      </div>
      <div className="container">
        <Section>
          <TabbarComponent
            title="Shop by Categories "
            right={
              <Space className="gap-4">
                <Button
                  size="large"
                  icon={<ArrowLeft size={18} />}
                  onClick={() => catSlideRef.current?.next()}
                />
                <Button
                  size="large"
                  icon={<ArrowRight size={18} />}
                  onClick={() => catSlideRef.current?.next()}
                />
              </Space>
            }
          />
          <Carousel ref={catSlideRef} speed={3000} autoplay initialSlide={0}>
            {catsArray.map((array, index) => (
              <div key={index}>
                <div className="row" style={{ paddingLeft: 20 }}>
                  {array.values.map((item) => (
                    <div className="col" key={item.id}>
                      <div style={{ position: "relative" }}>
                        <img
                          src={
                            item.image ??
                            "https://images.pexels.com/photos/1557843/pexels-photo-1557843.jpeg"
                          }
                          style={{
                            width: "100%",
                            borderRadius: 10,
                          }}
                          alt={item.title}
                        />
                        <div
                          className="d-none"
                          style={{
                            position: "absolute",
                            bottom: 20,
                            right: 0,
                            left: 0,
                            textAlign: "center",
                          }}
                        >
                          <Button
                            onClick={() =>
                              navigate(`/filter-product?cartId=${item.id}`)
                            }
                            type="default"
                            style={{ width: "80%" }}
                            size="large"
                          >
                            {item.title}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Carousel>
        </Section>
        <Section>
          <TabbarComponent title="Our Bestseller" />
          <div className="row">
            {bestSellers.map((item) => (
              <ProductItem item={item} key={item.id} />
            ))}
          </div>
        </Section>
      </div>
    </>
  );
};

export default HomePage;
