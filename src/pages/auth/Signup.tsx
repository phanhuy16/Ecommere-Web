import { useState } from "react";
import BG_Sign from "/assets/images/signup.png";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import handleAPI from "../../apis/handleAPI";
import { useDispatch } from "react-redux";
import { addAuth } from "../../redux/reducres/authReducer";
import { useNavigate } from "react-router-dom";

interface SignUp {
  fisrtName: string;
  lastName: string;
  email: string;
  password: string;
}

const Signup = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isAgree, setIsAgree] = useState(true);

  const handleSignUp = async (values: SignUp) => {
    const api = "/Customers/sign-up";
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
        localStorage.setItem("authData", JSON.stringify(res.value));
      }
      navigate("/");
    } catch (error) {
      console.log(error);
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
            backgroundImage: `url(${BG_Sign})`,
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
                  Create New Account
                </Typography.Title>
                <Typography.Paragraph type="secondary">
                  Please enter details
                </Typography.Paragraph>
              </div>
              <Form
                disabled={isLoading}
                form={form}
                layout="vertical"
                onFinish={handleSignUp}
                size="large"
              >
                <Form.Item name={"firtName"} label="Fisrt Name">
                  <Input placeholder="" allowClear />
                </Form.Item>
                <Form.Item name={"lastName"} label="Last Name">
                  <Input placeholder="" allowClear />
                </Form.Item>
                <Form.Item
                  name={"email"}
                  label="Email Address"
                  rules={[
                    { required: true, message: "Please enter your email!" },
                  ]}
                >
                  <Input placeholder="name@example.com" allowClear />
                </Form.Item>
                <Form.Item
                  name={"password"}
                  label="Password"
                  rules={[
                    { required: true, message: "Please enter your password!" },
                  ]}
                >
                  <Input.Password placeholder="" allowClear />
                </Form.Item>
              </Form>
              <div className="mt-4">
                <Checkbox
                  onChange={(val) => setIsAgree(val.target.checked)}
                  checked={isAgree}
                >
                  I agree to the Terms & Conditions
                </Checkbox>
              </div>
              <div className="mt-4">
                <Button
                  loading={isLoading}
                  type="primary"
                  style={{ width: "100%" }}
                  size="large"
                  onClick={() => form.submit()}
                >
                  Signup
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
