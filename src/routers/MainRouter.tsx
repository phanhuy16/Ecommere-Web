import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import HeaderComponent from "../components/HeaderComponent";
const { Content, Footer } = Layout;
const MainRouter = () => {
  return (
    <Layout className="bg-white">
      <HeaderComponent />
      <Content>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Content>
      <Footer />
    </Layout>
  );
};

export default MainRouter;
