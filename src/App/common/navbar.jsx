import React, { useState } from "react";
import { Menu, Drawer, Button, Space, Row, Col, Typography } from "antd";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router
import { GrMenu } from "react-icons/gr";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Header } from "antd/es/layout/layout";
import { useAuth } from "../../context/auth";
import { paths } from "../../utils/paths";
import { usePoints } from "../../utils/custom-hooks";

const { Title, Link } = Typography;

const ResponsiveNavBar = () => {
  const points = usePoints();
  const [auth] = useAuth();
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  // console.log(points, "points");
  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Header className="bg-custom sticky-header">
        <Row className="container">
          {points.md && (
            <Col span={8}>
              <Menu
                mode="horizontal"
                overflowed={false}
                className="bg-custom-menu"
                style={{ color: "white" }}
              >
                <Menu.Item key="trending" className="bg-custom-item">
                  <Link style={{ color: "white" }} className="font-item">
                    Trending
                  </Link>
                </Menu.Item>
                <Menu.Item key="most-viewed" className="bg-custom-item">
                  <Link style={{ color: "white" }} className="font-item">
                    Most Viewed
                  </Link>
                </Menu.Item>
                <Menu.Item key="recent" className="bg-custom-item">
                  <Link style={{ color: "white" }} className="font-item">
                    Recent
                  </Link>
                </Menu.Item>
              </Menu>
            </Col>
          )}
          <Col
            span={points.md ? 8 : 17}
            className={`d-flex align-items-center
              ${points.md ? "justify-content-center" : "justify-content-start"}
                `}
          >
            <Title
              level={points.md ? 3 : 5}
              style={{ color: "white", margin: "10px 0px" }}
            >
              The Author's Hub
            </Title>
          </Col>
          {points.md && (
            <Col span={8}>
              <Menu
                mode="horizontal"
                overflowed={false}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                }}
                className="bg-custom-menu"
              >
                <Menu.Item key="login" className="bg-custom-item">
                  {!auth.token ? (
                    <Link
                      onClick={() => navigate(paths.login)}
                      style={{ color: "white" }}
                      className="font-item"
                    >
                      Login
                    </Link>
                  ) : auth?.user?.role === "Author" ? (
                    <Link
                      onClick={() => navigate(paths.authorDashboard)}
                      style={{ color: "white" }}
                      className="font-item"
                    >
                      Author Dashbaord
                    </Link>
                  ) : auth?.user?.role === "Subscriber" ? (
                    <Link
                      onClick={() => navigate("/")}
                      style={{ color: "white" }}
                      className="font-item"
                    >
                      Subscriber Dashbaord
                    </Link>
                  ) : (
                    <Link
                      onClick={() => navigate("/")}
                      style={{ color: "white" }}
                      className="font-item"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item key="register" className="bg-custom-item">
                  <Link
                    onClick={() => navigate(paths.register)}
                    style={{ color: "white" }}
                    className="font-item"
                  >
                    SignUp
                  </Link>
                </Menu.Item>
              </Menu>
            </Col>
          )}
          {!points.md && (
            <Col
              span={5}
              className="menu-btn d-flex justify-content-end align-items-center w-full "
            >
              <Button
                icon={
                  <GrMenu
                    color="white"
                    size={15}
                    style={{ paddingBottom: "2px" }}
                  />
                }
                onClick={() => setVisible(true)}
                style={{
                  backgroundColor: "transparent",
                }}
                size="small"
              />
            </Col>
          )}
        </Row>
      </Header>
      <Drawer
        title="The Author's Hub"
        placement="right"
        onClose={onClose}
        open={visible}
        width={250}
        closeIcon={<IoMdCloseCircleOutline size={20} color="blue" />}
      >
        <Menu mode="vertical" style={{ border: "none" }}>
          <Menu.Item key="trending">
            <Link className="font-item">Trending</Link>
          </Menu.Item>
          <Menu.Item key="most-viewed">
            <Link className="font-item">Most Viewed</Link>
          </Menu.Item>
          <Menu.Item key="recent">
            <Link className="font-item">Recent</Link>
          </Menu.Item>
          <Menu.Item key="login">
            {!auth.token ? (
              <Link onClick={() => navigate(paths.login)} className="font-item">
                Login
              </Link>
            ) : auth?.user?.role === "Author" ? (
              <Link
                onClick={() => navigate(paths.authorDashboard)}
                className="font-item"
              >
                Author Dashbaord
              </Link>
            ) : auth?.user?.role === "Subscriber" ? (
              <Link onClick={() => navigate("/")} className="font-item">
                Subscriber Dashbaord
              </Link>
            ) : (
              <Link onClick={() => navigate("/")} className="font-item">
                Admin Dashboard
              </Link>
            )}
          </Menu.Item>
          <Menu.Item key="register" className="bg-custom-item">
            <Link
              onClick={() => navigate(paths.register)}
              className="font-item"
            >
              SignUp
            </Link>
          </Menu.Item>
        </Menu>
      </Drawer>
    </>
  );
};

export default ResponsiveNavBar;
