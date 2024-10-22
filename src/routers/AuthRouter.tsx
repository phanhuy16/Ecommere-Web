import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

const AuthRouter = () => {
  return (
    <Layout className="bg-white">
      <Content>
        <Routes>
          <Route path="/Account/login" element={<Login />} />
          <Route path="/Account/signup" element={<Signup />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default AuthRouter;
