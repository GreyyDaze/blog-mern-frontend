import { Button, Card, Form, Input, Typography } from "antd";
import { AiFillGoogleCircle, AiOutlineLogin } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { paths } from "../../utils/paths";
import { useAuthentication } from "../../actions/_auth";
const { Link, Title, Paragraph } = Typography;

const Login = () => {
  const { loading, onFinish } = useAuthentication();
  const navigate = useNavigate();

  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex justify-content-center align-items-center "
    >
      <Card
        title={
          <Title
            level={3}
            style={{ textAlign: "center", color: "blue" }}
            className="my-3"
          >
            Sign In
          </Title>
        }
        style={{
          width: "400px",
          boxShadow: "0 4px 8px rgba(135, 206, 235, 0.3)",
        }}
      >
        <p
          style={{
            fontSize: "16px",
            fontWeight: "500",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Ready to dive back in? Just log in!
        </p>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Password is required!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item className="">
            <Button
              loading={loading}
              icon={<AiOutlineLogin />}
              className="btnP mt-2"
              htmlType="submit"
            >
              Login
            </Button>

            <Button
              icon={<AiFillGoogleCircle />}
              className="bg-danger text-white mt-4"
            >
              Login with google
            </Button>
          </Form.Item>
        </Form>
        <Paragraph className="text-center">
          Do you have an account?{" "}
          <Link onClick={() => navigate(paths.register)}>Register!</Link>
        </Paragraph>
      </Card>
    </div>
  );
};

export default Login;
