import { Button, Card, Carousel, Typography } from "antd";
import { ArrowRight } from "iconsax-react";
import { useEffect, useState } from "react";
import handleAPI from "../../apis/handleAPI";
import { PromotionModel } from "../../models/PromotionModel";
import { TabbarComponent } from "../../components";
import Section from "../../components/Section";
import { CategoryModel } from "../../models/Products";

const { Title } = Typography;

const HomePage = () => {
  const [promotions, setPromotions] = useState<PromotionModel[]>([]);
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(true);

    try {
      await getPromotions();
      await getCategories();
    } catch (error) {
      console.log(error);
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

  const cats = categories.filter((element) => !element.parentId);

  console.log(cats);

  return (
    <>
      <div className="container-fuild d-none d-md-block">
        <div className="container">
          {promotions.length > 0 && (
            <Carousel style={{ width: "100%", height: 665 }}>
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
          <TabbarComponent title="Shop by Categories " right={<>das</>} />
          <div className="row">
            {cats.map((cat) => (
              <div key={cat.id}>
                <div className="col">
                  <Card
                    cover={
                      <img
                        src={
                          "https://images.pexels.com/photos/1557843/pexels-photo-1557843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        }
                      />
                    }
                    style={{ width: 240 }}
                  ></Card>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </>
  );
};

export default HomePage;
