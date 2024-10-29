import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";
import {
  BlogPage,
  ContactPage,
  HomePage,
  ProductDetail,
  ShopPage,
  StoryPage,
} from "../pages";
import { HeaderComponent } from "../components";
const { Content, Footer } = Layout;
const MainRouter = () => {
  return (
    <Layout className="bg-white">
      <HeaderComponent />
      <Content>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/sotry" element={<StoryPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/product/detail/:slug" element={<ProductDetail />} />
        </Routes>
      </Content>
      <Footer />
    </Layout>
  );
};

export default MainRouter;
