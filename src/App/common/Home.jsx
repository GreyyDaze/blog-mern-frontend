import React from "react";
import { Card, Carousel, Col, Row, Typography, Avatar } from "antd";
import { useAllList } from "../../actions/_commons";
import ResponsiveNavBar from "./navbar";
import stripHtml from "../../utils/cleanHtml";
import moment from "moment";
import { TailSpin } from "react-loader-spinner";
import { FaBlog } from "react-icons/fa";
import { RxGithubLogo } from "react-icons/rx";
import {
  TwitterOutlined,
  FacebookOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import { paths } from "../../utils/paths";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph, Link } = Typography;

const Home = () => {
  const { list, loading } = useAllList("home");
  const navigate = useNavigate();

  console.log(list);

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          <TailSpin
            visible={true}
            height="80"
            width="80"
            color="blue"
            ariaLabel="tail-spin-loading"
            radius="1"
          />
        </div>
      ) : (
        <>
          <ResponsiveNavBar />
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
              marginBottom: "50px",
            }}
          >
            <Col span={21}>
              <Carousel dotPosition="bottom" autoplay>
                {list.slice(0, 5).map((item) => (
                  <div key={item._id} className="carousel-item">
                    <Card
                      bordered={false}
                      className="image-card"
                      hoverable={false}
                    >
                      <div className="image-container">
                        <img
                          alt={item.title}
                          src={item.featuredImage?.url}
                          className="card-image"
                        />
                        <div className="overlay"></div>
                        <div className="text-content">
                          <h3 style={{ fontSize: "43px", width: "700px" }}>
                            {item.title}
                          </h3>
                          <p style={{ fontSize: "17px", width: "500px" }}>
                            {stripHtml(item.content).slice(0, 180)}...
                          </p>{" "}
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </Carousel>
            </Col>
          </Row>
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "50px",
            }}
          >
            <Col span={8}>
              <Card
                bordered={false}
                cover={
                  <img
                    alt={list[0]?.title}
                    src={list[0]?.featuredImage?.url}
                    style={{
                      width: "auto",
                      height: "230px",
                      objectFit: "cover",
                    }}
                  />
                }
                style={{
                  marginBottom: 20,
                  boxShadow: "none",
                  padding: "0px 25px",
                }}
                className="card-ovf-hidden card-rm-padding "
              >
                <Typography className="d-flex align-items-center mb-2 ms-0">
                  <Title level={5} className="m-0 text-secondary">
                    {list[0]?.categories[0]?.name}
                  </Title>
                  <Title level={1} className="m-0 text-secondary ms-2 me-2">
                    &#xB7;
                  </Title>
                  <Title level={5} className="m-0 text-secondary">
                    {moment(list[0]?.createdAt).format("MMM Do 'YY")}
                  </Title>
                </Typography>
                <Typography className="ms-0">
                  <Title level={2}>{list[0]?.title}</Title>
                  <Paragraph style={{ fontSize: "18px" }}>
                    {stripHtml(list[0]?.content || "").slice(0, 250)}...
                  </Paragraph>
                </Typography>
                <div className="d-flex align-items-center mt-4">
                  <Avatar size={48}>
                    {list[0]?.postedBy?.name.slice(0, 1)}
                  </Avatar>
                  <Title level={4} className="m-0 ms-3 text-dark">
                    {list[0]?.postedBy?.name}
                  </Title>
                </div>
              </Card>
            </Col>
            <Col
              span={7}
              style={{
                borderLeft: "1px solid #ccc",
                borderRight: "1px solid #ccc",
              }}
            >
              {list.slice(1, 4).map((item) => (
                <Card
                  bordered={false}
                  cover={
                    <img
                      alt={item.title}
                      src={item.featuredImage?.url}
                      style={{
                        width: "280px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                  }
                  style={{
                    boxShadow: "none",
                    padding: "0px 25px",
                  }}
                  className="card-rm-padding"
                  key={item._id}
                >
                  <Typography className="d-flex align-items-center mb-2 ms-0">
                    <Title level={5} className="m-0 text-secondary">
                      {item.categories[0]?.name}
                    </Title>
                    <Title level={1} className="m-0 text-secondary ms-2 me-2">
                      &#xB7;
                    </Title>
                    <Title level={5} className="m-0 text-secondary">
                      {moment(item.createdAt).format("MMM Do 'YY")}
                    </Title>
                  </Typography>
                  <Typography className="ms-0">
                    <Title level={4}>{item.title}</Title>
                  </Typography>
                </Card>
              ))}
            </Col>
            <Col span={7}>
              {list.slice(5, 8).map((item) => (
                <Card
                  bordered={false}
                  cover={
                    <img
                      alt={item.title}
                      src={item.featuredImage?.url}
                      style={{
                        width: "280px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                  }
                  style={{
                    boxShadow: "none",
                    padding: "0px 25px",
                  }}
                  className="card-rm-padding"
                  key={item._id}
                >
                  <Typography className="d-flex align-items-center mb-2 ms-0">
                    <Title level={5} className="m-0 text-secondary">
                      {item.categories[0]?.name}
                    </Title>
                    <Title level={1} className="m-0 text-secondary ms-2 me-2">
                      &#xB7;
                    </Title>
                    <Title level={5} className="m-0 text-secondary">
                      {moment(item.createdAt).format("MMM Do 'YY")}
                    </Title>
                  </Typography>
                  <Typography className="ms-0">
                    <Title level={4}>{item.title}</Title>
                  </Typography>
                </Card>
              ))}
            </Col>
          </Row>
          <Row
            style={{
              paddingBottom: "10px",
              borderBottom: "5px solid blue",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "50px",
            }}
            className="mx-5"
          >
            <Col>
              <Title level={1} className="m-0">
                Category
              </Title>
            </Col>
            <Col>
              <Link
                style={{
                  fontSize: "16px",
                  borderBottom: "3px solid blue",
                  paddingBottom: "5px",
                  cursor: "pointer",
                }}
              >
                See All Category
              </Link>
            </Col>
          </Row>
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "50px",
            }}
          >
            <Col span={8}>
              <Card
                bordered={false}
                cover={
                  <img
                    alt={list[0]?.title}
                    src={list[0]?.featuredImage?.url}
                    style={{
                      width: "auto",
                      height: "230px",
                      objectFit: "cover",
                    }}
                  />
                }
                style={{
                  marginBottom: 20,
                  boxShadow: "none",
                  padding: "0px 25px",
                }}
                className="card-ovf-hidden card-rm-padding "
              >
                <Typography className="d-flex align-items-center mb-2 ms-0">
                  <Title level={5} className="m-0 text-secondary">
                    {list[0]?.categories[0]?.name}
                  </Title>
                  <Title level={1} className="m-0 text-secondary ms-2 me-2">
                    &#xB7;
                  </Title>
                  <Title level={5} className="m-0 text-secondary">
                    {moment(list[0]?.createdAt).format("MMM Do 'YY")}
                  </Title>
                </Typography>
                <Typography className="ms-0">
                  <Title level={2}>{list[0]?.title}</Title>
                  <Paragraph style={{ fontSize: "18px" }}>
                    {stripHtml(list[0]?.content || "").slice(0, 250)}...
                  </Paragraph>
                </Typography>
                <div className="d-flex align-items-center mt-4">
                  <Avatar size={48}>
                    {list[0]?.postedBy?.name.slice(0, 1)}
                  </Avatar>
                  <Title level={4} className="m-0 ms-3 text-dark">
                    {list[0]?.postedBy?.name}
                  </Title>
                </div>
              </Card>
            </Col>
            <Col
              span={7}
              style={{
                borderLeft: "1px solid #ccc",
                borderRight: "1px solid #ccc",
              }}
            >
              {list.slice(1, 4).map((item) => (
                <Card
                  bordered={false}
                  cover={
                    <img
                      alt={item.title}
                      src={item.featuredImage?.url}
                      style={{
                        width: "280px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                  }
                  style={{
                    boxShadow: "none",
                    padding: "0px 25px",
                  }}
                  className="card-rm-padding"
                  key={item._id}
                >
                  <Typography className="d-flex align-items-center mb-2 ms-0">
                    <Title level={5} className="m-0 text-secondary">
                      {item.categories[0]?.name}
                    </Title>
                    <Title level={1} className="m-0 text-secondary ms-2 me-2">
                      &#xB7;
                    </Title>
                    <Title level={5} className="m-0 text-secondary">
                      {moment(item.createdAt).format("MMM Do 'YY")}
                    </Title>
                  </Typography>
                  <Typography className="ms-0">
                    <Title level={4}>{item.title}</Title>
                  </Typography>
                </Card>
              ))}
            </Col>
            <Col span={7}>
              {list.slice(5, 8).map((item) => (
                <Card
                  bordered={false}
                  cover={
                    <img
                      alt={item.title}
                      src={item.featuredImage?.url}
                      style={{
                        width: "280px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                  }
                  style={{
                    boxShadow: "none",
                    padding: "0px 25px",
                  }}
                  className="card-rm-padding"
                  key={item._id}
                >
                  <Typography className="d-flex align-items-center mb-2 ms-0">
                    <Title level={5} className="m-0 text-secondary">
                      {item.categories[0]?.name}
                    </Title>
                    <Title level={1} className="m-0 text-secondary ms-2 me-2">
                      &#xB7;
                    </Title>
                    <Title level={5} className="m-0 text-secondary">
                      {moment(item.createdAt).format("MMM Do 'YY")}
                    </Title>
                  </Typography>
                  <Typography className="ms-0">
                    <Title level={4}>{item.title}</Title>
                  </Typography>
                </Card>
              ))}
            </Col>
          </Row>
          <div style={{ backgroundColor: "#f0f2f5", padding: "20px 0" }}>
            <Row justify="space-around" align="middle">
              <Col span={6}>
                <Title level={4} style={{ marginBottom: 0 }}>
                  <FaBlog size={32} color="blue" />
                  <span style={{ fontSize: "22px", marginLeft: "8px" }}>
                    The Author's Blog
                  </span>
                </Title>
              </Col>
              <Col span={4} className="text-center">
                <Link
                  onClick={() => navigate(paths.login)}
                  style={{ marginRight: 32, fontSize: "16px" }}
                >
                  Login
                </Link>
                <Link
                  onClick={() => navigate(paths.register)}
                  style={{ fontSize: "16px" }}
                >
                  Register
                </Link>
              </Col>
              <Col span={6}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <TwitterOutlined
                    style={{
                      fontSize: "24px",
                      color: "lightblue",
                    }}
                  />
                  <FacebookOutlined
                    style={{ fontSize: "24px", color: "blue" }}
                  />
                  <LinkedinOutlined style={{ fontSize: "24px" }} />
                  <RxGithubLogo size={24} color="black" />
                </div>
              </Col>
            </Row>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
