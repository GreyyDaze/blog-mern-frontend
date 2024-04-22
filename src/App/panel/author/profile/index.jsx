import AuthorLayout from "../../components/layout";
import { Button, Card, Typography, Row, Col, Modal, Form, Input } from "antd";
import { TbBrandPicsart } from "react-icons/tb";
import { TailSpin } from "react-loader-spinner";
import { PictureOutlined } from "@ant-design/icons";
import { RiCloseCircleLine } from "react-icons/ri";
import { MdUpdate } from "react-icons/md";
import { useImageHandler } from "../../../../actions/_blog";
import { useGetMedia } from "../../../../actions/_media";
import { useGetProfile, useUpdateProfile } from "../../../../actions/_profile";

const Profile = () => {
  const { data, loading: mediaLoading } = useGetMedia();
  const {
    form,
    values,
    setValues,
    updateProfile,
    loading,
    profileLoading,
    imageUrl,
  } = useUpdateProfile();
  const {
    selectedImage,
    setSelectedImage,
    selectedImageIdRef,
    handleImageClick,
    isModalOpen,
    showModal,
    handleCancel,
  } = useImageHandler({
    values,
    setValues,
  });

  return (
    <AuthorLayout>
      {profileLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "70vh",
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
      {!profileLoading && values && (
        <div className="d-flex justify-content-center align-items-center mt-4">
          <Card
            style={{
              width: 500,
              boxShadow: "0 4px 8px rgba(135, 206, 235, 0.3)",
            }}
            hoverable
            title={[
              <div className="d-flex align-items-center gap-3 justify-content-center">
                <TbBrandPicsart color="blue" size={26} />
                <p className="h5 m-0">Profile Settings</p>
              </div>,
            ]}
            key={1}
          >
            <Form
              form={form}
              preserve={true}
              initialValues={{
                remember: true,
              }}
              onFinish={updateProfile}
              autoComplete="off"
              className="px-3"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
              >
                {imageUrl || selectedImage ? (
                  <img
                    alt="selected"
                    src={imageUrl || selectedImage.url}
                    style={{
                      background: "#f5f5f4",
                      border: "2px dotted #a1a1aa",
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <Card
                    bordered={false}
                    hoverable
                    style={{
                      textAlign: "center",
                      background: "#f5f5f4",
                      border: "2px dotted #a1a1aa",
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={showModal}
                    key={2}
                  >
                    <PictureOutlined
                      style={{ fontSize: "28px", color: "#1890ff" }}
                    />
                  </Card>
                )}
                <Modal
                  title="Gallery Images"
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
                  width={1100}
                >
                  <Row gutter={[2, 2]}>
                    {mediaLoading && (
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
                    {!mediaLoading && (
                      <>
                        {data.map((image) => (
                          <Col key={image._id} xs={5}>
                            <div className="image-container">
                              <img
                                alt="gallery"
                                src={image.url}
                                style={{
                                  width: "180px",
                                  height: "140px",
                                  cursor: "pointer",
                                }}
                                onClick={(e) => handleImageClick(image, e)}
                              />
                            </div>
                          </Col>
                        ))}
                      </>
                    )}
                  </Row>
                </Modal>
              </div>
              {!imageUrl && (
                <Typography
                  style={{
                    marginTop: "10px",
                    marginBottom: "10px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Upload Profile Image from Gallery
                </Typography>
              )}

              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Username cannot be empty",
                  },
                ]}
                className="mt-3"
              >
                <Input placeholder="User Name" defaultValue={values.name} />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please new email cannot be empty",
                  },
                ]}
              >
                <Input placeholder="Email" defaultValue={values.email} />
              </Form.Item>

              <Form.Item name="password" rules={[{}]}>
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  span: 24,
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  icon={<MdUpdate size={19} />}
                >
                  Update Profile
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      )}
    </AuthorLayout>
  );
};
export default Profile;
