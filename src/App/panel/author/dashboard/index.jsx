import { useMyList } from "../../../../actions/_commons";
import AuthorLayout from "../../components/layout";
import { Row, Col, Card, Typography } from "antd";
import { useMemo } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";

const { Title, Text } = Typography;

const AuthorDashboard = () => {
  const { list, loading } = useMyList("dashboard");

  // const list = [
  //   { id: 1, createdAt: "2024-04-01", published: true },
  //   { id: 2, createdAt: "2024-04-01", published: false },
  //   { id: 3, createdAt: "2024-04-02", published: true },
  //   { id: 4, createdAt: "2024-04-02", published: true },
  //   { id: 5, createdAt: "2024-04-02", published: false },
  //   { id: 6, createdAt: "2024-04-03", published: false },
  // ];

  const { publishedCount, unpublishedCount } = useMemo(() => {
    const publishedCount = list.filter((post) => post.published).length;
    const unpublishedCount = list.filter((post) => !post.published).length;
    return { publishedCount, unpublishedCount };
  }, [list]);

  // Group posts by date
  const data = useMemo(() => {
    const groupedByDate = list.reduce((acc, post) => {
      // console.log(post.createdAt);
      const date = moment(post.createdAt).format("YYYY-MM-DD"); // Group by day

      if (!acc[date]) {
        acc[date] = { date, published: 0, unpublished: 0, total: 0 };
        // console.log(acc);
      }
      if (post.published) {
        acc[date].published += 1;
      } else {
        acc[date].unpublished += 1;
      }
      acc[date].total += 1; // Increment total regardless of published status
      return acc;
    }, {});
    // console.log(groupedByDate);
    // console.log(Object.values(groupedByDate));

    return Object.values(groupedByDate);
  }, [list]);

  return (
    <AuthorLayout>
      <Row gutter={16}>
        <Col span={8}>
          <Card
            hoverable
            style={{ boxShadow: "0 4px 8px rgba(135, 206, 235, 0.3)" }}
          >
            <Title level={3}>Total Posts:</Title>
            <Text type="secondary" style={{ fontSize: "16px" }}>
              {list.length}
            </Text>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            hoverable
            style={{ boxShadow: "0 4px 8px rgba(135, 206, 235, 0.3)" }}
          >
            <Title level={3}>Total Published:</Title>
            <Text type="secondary" style={{ fontSize: "16px" }}>
              {publishedCount}
            </Text>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            hoverable
            style={{ boxShadow: "0 4px 8px rgba(135, 206, 235, 0.3)" }}
          >
            <Title level={3}>Total Unpublished:</Title>
            <Text type="secondary" style={{ fontSize: "16px" }}>
              {unpublishedCount}
            </Text>
          </Card>
        </Col>
      </Row>
      <Row gutter={19} style={{ marginTop: "30px" }}>
        <Col span={12}>
          <Card
            bordered={false}
            hoverable
            style={{ boxShadow: "0 4px 8px rgba(135, 206, 235, 0.3)" }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="published"
                  fill="#0284c7"
                  name="Published Posts"
                />
                <Bar
                  dataKey="unpublished"
                  fill="#16a34a"
                  name="Unpublished Posts"
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            bordered={false}
            hoverable
            style={{ boxShadow: "0 4px 8px rgba(135, 206, 235, 0.3)" }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#ff7300"
                  name="Total Posts"
                />
                <Line
                  type="monotone"
                  dataKey="published"
                  stroke="#0284c7"
                  name="Published Posts"
                />
                <Line
                  type="monotone"
                  dataKey="unpublished"
                  stroke="#16a34a"
                  name="Unpublished Posts"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </AuthorLayout>
  );
};

export default AuthorDashboard;
