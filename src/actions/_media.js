import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";

export const useGetMedia = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();
  // console.log(auth)

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const { data: fetchedData } = await axios.get(`/media`);
      const filteredData = fetchedData.filter(
        (media) => media.postedBy._id === auth?.user?._id
      );
      setData(filteredData);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [auth?.user?._id]); // Dependency array includes user's ID

  useEffect(() => {
    if (auth?.user?._id) {
      fetchData();
    }
  }, [auth?.user?._id, fetchData]); // Ensure fetchData is updated when user's ID changes

  return { data, loading };
};
