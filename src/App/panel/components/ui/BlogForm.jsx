import { Button, Col, Input, Row, Select, Card, Typography, Modal } from "antd";
import { PictureOutlined } from "@ant-design/icons";
import { RiCloseCircleLine } from "react-icons/ri";
import { usePoints } from "../../../../utils/custom-hooks";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useGetMedia } from "../../../../actions/_media";
import { useBlogForm } from "../../../../actions/_blog";
import { TailSpin } from "react-loader-spinner";

const BlogForm = ({
  values,
  setValues,
  submit,
  loading,
  categoriesList,
  categoriesLoading,
  error,
  imageUrl = null,
  from = "create",
}) => {
  const points = usePoints();
  const { data, loading: mediaLoading } = useGetMedia();

  const {
    selectedImage,
    // setSelectedImage,
    handleImageClick,
    defaultCategories,
    handleCategoryChange,
    isModalOpen,
    showModal,
    handleCancel,
  } = useBlogForm({
    values,
    setValues,
    categoriesList,
  });

  console.log(values);

  return (
    <Row>
      <Col md={16} xs={24} className={points.md && "p-2"}>
        <div className="p-2">
          <div className="py-2">
            <Typography.Title level={5}>Blog Title</Typography.Title>
            <Input
              name="title"
              value={values.title}
              placeholder="Give your post a title"
              onChange={(e) => setValues({ ...values, title: e.target.value })}
            />
          </div>

          <div className="py-2">
            <Typography.Title level={5}>Content</Typography.Title>
            <ReactQuill
              theme="snow"
              value={values.content}
              onChange={(v) => setValues({ ...values, content: v })}
            />
          </div>
        </div>
      </Col>
      <Col md={8} xs={24} className={points.md && "p-2"} onClick={showModal}>
        {from == "edit" && (
          <div style={{ border: "2px dotted #a1a1aa", borderRadius: "10px" }}>
            {imageUrl || selectedImage ? (
              <Card bordered={false} hoverable>
                <img
                  alt="selected"
                  src={imageUrl || selectedImage.url}
                  style={{
                    height: "200px",
                    borderRadius: "10px",
                    width: "100%",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                />
              </Card>
            ) : (
              <Card
                bordered={false}
                hoverable
                style={{ textAlign: "center", background: "#f5f5f4" }}
                onClick={showModal}
              >
                <PictureOutlined
                  style={{ fontSize: "48px", color: "#1890ff" }}
                />
                <Typography
                  style={{
                    marginTop: "10px",
                    fontSize: "14px",
                  }}
                >
                  Upload Image from Gallery
                </Typography>
              </Card>
            )}
            <Modal
              title={
                <Typography.Title level={3} style={{ color: "blue" }}>
                  Gallery Images
                </Typography.Title>
              }
              open={isModalOpen}
              closeIcon={
                <RiCloseCircleLine
                  onClick={handleCancel}
                  size={26}
                  color="blue"
                />
              }
              maskClosable={true}
              footer={null}
              width={900}
            >
              <>
                {!mediaLoading ? (
                  <Row gutter={[12, 12]} className="mx-2 mt-4">
                    {data.map((image) => (
                      <Col
                        key={image._id}
                        xs={5}
                        style={{ marginRight: "20px" }}
                      >
                        <div className="image-container">
                          <img
                            alt="gallery"
                            src={image.url}
                            style={{
                              width: "100%",
                              height: "140px",
                              objectFit: "cover",
                              cursor: "pointer",
                            }}
                            onClick={(e) => handleImageClick(image, e)}
                          />
                        </div>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      height: "40vh",
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
                )}
              </>
            </Modal>
          </div>
        )}
        <div className="border rounded-3 p-2 mt-4">
          <Select
            mode="multiple"
            loading={categoriesLoading}
            allowClear={true}
            placeholder="Select categories"
            style={{ width: "100%" }}
            value={defaultCategories} // Use value instead of defaultValue
            onChange={handleCategoryChange}
          >
            {categoriesList.map((item) => (
              <Select.Option key={item.name}>{item.name}</Select.Option>
            ))}
          </Select>
        </div>
        <Button
          loading={loading}
          style={{ margin: "10px 0px 10px 0px", width: "100%" }}
          type="primary"
          onClick={(e) => {
            e.stopPropagation();
            submit();
          }}
        >
          Publish
        </Button>
        {error && <p className="text-danger">{error}</p>}
      </Col>
    </Row>
  );
};

export default BlogForm;
