import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { Form } from "antd";

export const useGetProfile = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const [auth] = useAuth();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/user/${auth?.user?._id}`);
      setData(data);
      // console.log(data, "get profile");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [auth?.user?._id]);

  useEffect(() => {
    if (auth.token) fetchData();
  }, [fetchData, auth.token]);

  return { data, loading };
};

export const useUpdateProfile = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const { data: auth, loading: profileLoading } = useGetProfile();
  const [form] = Form.useForm(); // Get form instance to manipulate form

  useEffect(() => {
    if (auth && !profileLoading) {
      const initialFormValues = {
        id: auth._id,
        name: auth.name,
        email: auth.email,
        password: "",
        image: auth.image?._id || null,
      };
      setValues(initialFormValues);
      setImageUrl(auth.image?.url || null);
      form.setFieldsValue(initialFormValues);
    }
  }, [auth, profileLoading, form]);

  const updateProfile = async (formValues) => {
    const isNameUnchanged = formValues.name === values.name;
    const isPasswordEmpty = formValues.password === "";
    const isImageAvailable = imageUrl == null; // true  false false
    const isImageSelected = values.image == null; //true true false

    console.log(isNameUnchanged, isPasswordEmpty, isImageAvailable, "jjjj");
    if (isNameUnchanged && isPasswordEmpty && !isImageAvailable) {
      toast.error("Please change your information before updating.");
      return;
    }

    let payload = {};
    if (!isNameUnchanged) payload.name = formValues.name;
    if (!isPasswordEmpty) payload.password = formValues.password;
    if (isImageAvailable && !isImageSelected) payload.image = values.image;

    if (Object.keys(payload).length === 0) {
      toast.error("No changes detected.");
      return;
    }

    payload = { ...payload, id: values.id, email: values.email };

    console.log(payload, "payload");
    console.log(values, "values");
    setLoading(true);
    try {
      const { data } = await axios.put("/update-user-by-user", payload);
      console.log(data);
      if (data.error) {
        toast.error(data.error);
      } else {
        navigate("/user-profile");
        toast.success("Profile updated successfully.");
        setValues((prevValues) => ({
          ...prevValues,
          ...payload,
        }));
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return {
    form, // Return form instance for direct manipulation in the component
    values,
    setValues,
    updateProfile,
    loading,
    profileLoading,
    imageUrl,
  };
};


