import { useEffect } from "react";
import handleAPI from "../../apis/handleAPI";
import { Button } from "antd";

const HomePage = () => {
  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const api = "/Categories/get-all";
    try {
      const res = await handleAPI({ url: api });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row m-0">
      <div className="col">
        <Button onClick={getCategories}>Get Categories</Button>
      </div>
    </div>
  );
};

export default HomePage;
