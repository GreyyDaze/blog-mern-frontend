import { Card, Form, Input, Button, Typography } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "../../actions/_auth";
import { paths } from "../../utils/paths";
const { Link, Title, Paragraph } = Typography;

const Register = () => {
  const navigate = useNavigate();
  const { onFinish, loading } = useSignUp();

  return (
    <div style={{ maxWidth: 400, margin: "100px auto auto auto" }}>
      <Card
        title={
          <Title
            level={3}
            style={{ textAlign: "center", color: "blue" }}
            className="my-3"
          >
            Sign Up
          </Title>
        }
        style={{ boxShadow: "0 4px 8px rgba(135, 206, 235, 0.3)" }}
      >
        <Paragraph
          style={{
            fontSize: "16px",
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          Welcome! Please create an account
          <SmileOutlined
            style={{ color: "#faad14", marginLeft: "8px", fontSize: "20px" }}
          />
        </Paragraph>
        <Form
          name="register"
          onFinish={onFinish}
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your Name!" }]}
          >
            <Input
              prefix={
                <UserOutlined
                  style={{
                    fontSize: "17px",
                    marginRight: "5px",
                    color: "blue",
                  }}
                />
              }
              placeholder="Name"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              prefix={
                <MailOutlined
                  style={{
                    fontSize: "17px",
                    marginRight: "5px",
                    color: "blue",
                  }}
                />
              }
              type="email"
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={
                <LockOutlined
                  style={{
                    fontSize: "17px",
                    marginRight: "5px",
                    color: "blue",
                  }}
                />
              }
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
              loading={loading}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
        <Paragraph style={{ textAlign: "center" }}>
          Have an account?{" "}
          <Link onClick={() => navigate(paths.login)}>Sign in</Link>
        </Paragraph>
      </Card>
    </div>
  );
};

export default Register;
