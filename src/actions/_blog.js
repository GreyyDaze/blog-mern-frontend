import axios from "axios";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { useGetById, useList } from "./_commons";
import { useNavigate } from "react-router-dom";

const initValues = {
  title: "",
  content: null,
  categories: [],
  featuredImage: null,
};

export const useCreateBlog = (url, dataFromEditPage) => {
  const [values, setValues] = useState(initValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(url, values);
      console.log(data);

      if (data.error) {
        setError(data.error);
        return;
      } else {
        toast.success("Blog created successfully");
        navigate("/blogs");
      }
    } catch (error) {
      // 500
      console.log(error, "from create post");
      return toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dataFromEditPage) {
      setValues(dataFromEditPage);
    }
  }, [dataFromEditPage]);

  return {
    setValues,
    values,

    loading,
    error,
    submit,
  };
};

export const useDeleteBlog = () => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { list: initialList, loading: listLoading } =
    useList("/posts-by-author"); // Import list and loading state from useList
  const [list, setList] = useState(initialList);

  useEffect(() => {
    setList(initialList);
  }, [initialList]);

  const DeleteBlog = async (postId, postTitle) => {
    if (listLoading) return; // Don't proceed if list is still loading

    setDeleteLoading(true);
    try {
      await axios.delete(`/post/${postId}`);
      toast(`${postTitle} blog deleted!`, {
        icon: "🛑",
      });

      // Update the list of blogs after deletion
      setList((prevList) => prevList.filter((blog) => blog._id !== postId)); // Remove the deleted blog from the list
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setDeleteLoading(false);
    }
  };

  return { list, deleteLoading, DeleteBlog, listLoading };
};

export const useEditBlog = (slug) => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initValues);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const { data } = useGetById(`/post/${slug}`);

  // console.log(data, "from edit blog data");
  useEffect(() => {
    let arr = [];
    data?.categories?.map((x) => arr.push(x.name));
    setValues({
      ...values,
      content: data.content,
      title: data.title,
      categories: arr,
      featuredImage: data.featuredImage?._id,
    });
    setImageUrl(data.featuredImage?.url);
  }, [data]);
  // console.log(values);

  const EditBlog = async () => {
    console.log(values);
    setLoading(true);
    try {
      const res = await axios.put(`/edit-post/${data._id}`, values);
      if (res.data.error) {
        return toast.error(res.data.error);
      } else {
        navigate("/blogs");
        toast.success("Blog edited successfully");
      }
    } catch (error) {
      console.log(error);
      return toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { values, setValues, loading, EditBlog, imageUrl };
};

export const useBlogForm = ({ values, setValues, categoriesList }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [defaultCategories, setDefaultCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const selectedImageIdRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (categoriesList && values.categories) {
      console.log(categoriesList, "from useBlogForm");
      const selectedCategories = categoriesList?.filter((item) =>
        values.categories.includes(item.name)
      );

      const selectedCategoryNames = selectedCategories.map((item) => item.name);
      setDefaultCategories(selectedCategoryNames);
    } else {
      setDefaultCategories([]);
    }
  }, [values.categories, categoriesList]);

  const handleCategoryChange = (selectedCategories) => {
    setValues({ ...values, categories: selectedCategories });
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  const showModal = () => {
    setSelectedImage(null); // Reset selected image URL
    setIsModalOpen(true);
  };

  const handleImageClick = (image, e) => {
    e.stopPropagation();
    selectedImageIdRef.current = image._id;
    setSelectedImage(image);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (selectedImageIdRef.current) {
      // console.log("selectedImageIdRef", selectedImageIdRef);
      // console.log(selectedImage, "image");
      // console.log(values, "values");
      setValues({ ...values, featuredImage: selectedImageIdRef.current });
    }
  }, [selectedImageIdRef.current]);

  return {
    selectedImage,
    setSelectedImage,
    selectedImageIdRef,
    handleImageClick,
    defaultCategories,
    handleCategoryChange,
    isModalOpen,
    showModal,
    handleCancel,
  };
};

export const useImageHandler = ({ values, setValues }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const selectedImageIdRef = useRef(null);

  const handleCancel = (e) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  const showModal = () => {
    setSelectedImage(null); // Reset selected image URL
    setIsModalOpen(true);
  };

  const handleImageClick = (image, e) => {
    e.stopPropagation();
    selectedImageIdRef.current = image._id;
    setSelectedImage(image);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (selectedImageIdRef.current) {
      console.log("selectedImageIdRef", selectedImageIdRef);
      console.log(selectedImage, "image");
      console.log(values, "values");
      setValues({ ...values, image: selectedImageIdRef.current });
    }
  }, [selectedImageIdRef.current, setValues]);

  return {
    selectedImage,
    setSelectedImage,
    selectedImageIdRef,
    handleImageClick,
    isModalOpen,
    showModal,
    handleCancel,
  };
};
