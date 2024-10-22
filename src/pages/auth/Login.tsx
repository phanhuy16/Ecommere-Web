import { Button } from "antd";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <Link to={"/Account/signup"}>
        <Button>Sign Up</Button>
      </Link>
    </div>
  );
};

export default Login;
