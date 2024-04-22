import React from "react";
import { Link } from "react-router-dom";
import { Table, Button, Tag, Space } from "antd";
import AuthorLayout from "../../components/layout";
import { paths } from "../../../../utils/paths";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons"; // Import icons
import { useDeleteBlog } from "../../../../actions/_blog";

const BlogList = () => {
  const { list, deleteLoading, DeleteBlog, listLoading:loading } = useDeleteBlog();

  let postId = null;

  // Define columns for the table
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Published",
      dataIndex: "published",
      key: "published",
      render: (published) => (
        <div className="d-flex justify-content-center">
          {published ? (
            <CheckCircleOutlined
              style={{ color: "#52c41a", fontSize: "20px" }}
            />
          ) : (
            <CloseCircleOutlined
              style={{ color: "#f5222d", fontSize: "20px" }}
            />
          )}
        </div>
      ),
    },
    {
      title: "Categories",
      dataIndex: "categories",
      key: "categories",
      render: (categories) => (
        <>
          {categories.map((category) => (
            <Tag color="blue" key={category._id}>
              {category.name}
            </Tag>
          ))}
        </>
      ),
    },
    ,
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Link to={paths.editBlog(record.slug)}>
            <Button
              icon={<EditOutlined style={{ color: "#52c41a" }} />}
              style={{ borderColor: "#2563eb" }}
            >
              Edit
            </Button>
          </Link>
          <Button
            type="danger"
            loading={postId ? deleteLoading : false}
            icon={<DeleteOutlined style={{ color: "#f5222d" }} />}
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  // Function to handle delete action
  const handleDelete = (record) => {
    postId = record._id;
    console.log(record.title, record._id);
    DeleteBlog(record._id, record.title);
  };

  return (
    <AuthorLayout>
      <Table
        dataSource={list}
        columns={columns}
        loading={loading}
        rowKey="_id"
      />
    </AuthorLayout>
  );
};

export default BlogList;
