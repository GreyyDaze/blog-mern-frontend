import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import toast from "react-hot-toast";

import Crypto from "crypto-js";
import { privateKey } from "../utils/keys";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

export const useAuthentication = () => {
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();
  const router = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/signin", values);
      if (data.error) {
        toast.error(data.error);
      } else {
        let enc = Crypto.AES.encrypt(
          JSON.stringify(data),
          privateKey
        ).toString();
        Cookies.set("auth", enc);
        setAuth({ user: data.user, token: data.token });
        router("/");
        toast.success("login");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return { onFinish, loading };
};

export const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();
  const router = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/signup", values);
      if (data.error) {
        toast.error(data.error);
      } else {
        router("/login");
        toast.success("Signup Successfully. Please login.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return { onFinish, loading };
};

export const useLogout = () => {
  const [auth, setAuth] = useAuth();

  const logout = () => {
    Cookies.remove("auth");
    setAuth(null);
  };

  return { logout };
};
