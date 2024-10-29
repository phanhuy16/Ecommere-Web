import { Button, Form, Input, message, Typography } from "antd";
import BG_Login from "/assets/images/login.png";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import handleAPI from "../../apis/handleAPI";
import { addAuth } from "../../redux/reducres/authReducer";
import { useDispatch } from "react-redux";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const slug = searchParams.get("slug");

  const handleLogin = async (values: { email: string; password: string }) => {
    const api = "/Customers/login";
    setIsLoading(true);

    try {
      const res: any = await handleAPI({
        url: api,
        data: values,
        method: "post",
      });

      if (res.value) {
        const auth = res.value;
        dispatch(addAuth(auth));
        localStorage.setItem("authData", JSON.stringify(auth));

        navigate(id && slug ? `/product/detail/${slug}?id=${id}` : "/");
      }
    } catch (error) {
      console.log(error);
      message.error(
        "Đăng nhập thất bại, vui lòng kiểm tra lại email/password và thử lại!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
      <div className="row" style={{ height: "100vh" }}>
        <div
          className="d-none d-md-block col-6 p-0"
          style={{
            backgroundImage: `url( ${BG_Login} )`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="mt-5 ms-5" style={{ backgroundColor: "transparent" }}>
            <img
              src="/assets/images/Logo.png"
              style={{ backgroundColor: "transparent", width: "143px" }}
              alt=""
            />
          </div>
        </div>
        <div className="col-sm-12 col-md-6">
          <div
            className="container d-flex"
            style={{ height: "100%", alignItems: "center" }}
          >
            <div className="col-sm-12 col-md-12 col-lg-6 offset-lg-3">
              <div className="mb-4">
                <Typography.Title level={2} className="mb-1">
                  Welcome 👋
                </Typography.Title>
                <Typography.Paragraph type="secondary">
                  Please login here
                </Typography.Paragraph>
              </div>

              <Form
                disabled={isLoading}
                layout="vertical"
                onFinish={handleLogin}
                size="large"
                form={form}
              >
                <Form.Item
                  name={"email"}
                  label="Email Address"
                  rules={[
                    { required: true, message: "Please enter your email!" },
                  ]}
                >
                  <Input placeholder="Email" allowClear />
                </Form.Item>
                <Form.Item
                  name={"password"}
                  label="Password"
                  rules={[
                    { required: true, message: "Please enter your password!" },
                  ]}
                >
                  <Input.Password placeholder="Password" allowClear />
                </Form.Item>
              </Form>
              <div className="mt-4 text-end">
                <Link to={""}>Forgot Password?</Link>
              </div>
              <div className="mt-4">
                <Button
                  loading={isLoading}
                  type="primary"
                  size="large"
                  style={{ width: "100%" }}
                  onClick={() => form.submit()}
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
