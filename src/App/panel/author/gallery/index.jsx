import React, { useState, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { FaCloudDownloadAlt } from "react-icons/fa";
import AuthorLayout from "../../components/layout";
import { useGetMedia } from "../../../../actions/_media";
import { useAuth } from "../../../../context/auth";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  return isJpgOrPng;
};

const Gallery = () => {
  const [loading, setLoading] = useState(false);
  const [imagesForDisplay, setImagesForDisplay] = useState([]); // New state for storing images for display
  const { data, loading: mediaLoading } = useGetMedia();
  const [auth] = useAuth();

  useEffect(() => {
    const newImagesForDisplay = data.map((media) => ({
      uid: media._id,
      name: media.url.split("/").pop(),
      url: media.url,
    }));
    setImagesForDisplay(newImagesForDisplay);
  }, [data]);

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        // Add this image URL to our imagesForDisplay state
        const newImage = {
          uid: info.file.uid,
          name: info.file.name,
          url: imageUrl,
        };
        setImagesForDisplay((prevImages) => [...prevImages, newImage]);
        setLoading(false);
        message.success(`${info.file.name} image uploaded successfully`);
      });
    } else if (info.file.status === "error") {
      setLoading(false);
      message.error(`${info.file.name} image upload failed.`);
    }
  };

  const uploadButton =
    loading || mediaLoading ? (
      <LoadingOutlined />
    ) : (
      <button
        style={{ border: 0, background: "none", width: "100%" }}
        type="button"
      >
        <FaCloudDownloadAlt size={50} color={"#dc2626"} />
        <div style={{ marginTop: 8 }}>Upload your image here</div>
      </button>
    );

  return (
    <AuthorLayout>
      <Upload
        action="http://localhost:8000/api/upload-image-file"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={true}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        headers={{
          Authorization: `Bearer ${auth?.token}`,
        }}
        data={{
          user: JSON.stringify(auth?.user),
        }}
      >
        {uploadButton}
      </Upload>
      <div className="container mt-3">
        <div className="row mx-2">
          {imagesForDisplay.map((img) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={img.uid}>
              <img
                src={img.url}
                alt={img.name}
                className="img-fluid" // Bootstrap class to make images responsive
                style={{
                  margin: "0 10px 10px 0",
                  height: "170px",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </AuthorLayout>
  );
};

export default Gallery;
