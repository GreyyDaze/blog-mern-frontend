import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";

// useGet
export const useList = (url, route) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [auth] = useAuth();

  const fetchlist = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(url);
      setList(data);
    } catch (error) {
      toast.error("something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (auth.token && route != "home") {
      fetchlist();
    } else if (route === "home") {
      fetchlist();
    }
  }, [fetchlist, auth.token]);

  return { list, loading };
};

export const useCats = (route) => useList("/categories", route);
export const useMyList = (route) => useList("/posts-by-author", route);
export const useAllList = (route) => useList("/posts", route);

export const useGetById = (url) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const [auth] = useAuth();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(url);
      setData(data);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (auth.token) fetchData();
  }, [fetchData, auth.token]);

  return { data, loading };
};

// export const usePost = (url, onSuccess, values) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const submit = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axios.post(url, values);

//       if (data.error) {
//         setError(data.error);
//         return;
//       } else {
//         onSuccess();
//       }
//     } catch (error) {
//       // 500
//       console.log(error, "from create post");
//       return toast.error("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     loading,
//     error,
//     submit,
//   };
// };
// export const useDelete
