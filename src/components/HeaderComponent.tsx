import { Layout } from "antd";
import { Link } from "react-router-dom";

const HeaderComponent = () => {
  return (
    <Layout.Header>
      <Link to={"/Account/login"}>Login</Link>
    </Layout.Header>
  );
};

export default HeaderComponent;
