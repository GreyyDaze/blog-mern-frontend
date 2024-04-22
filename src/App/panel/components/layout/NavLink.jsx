import React, { useEffect, useState } from "react";
import {
  MdArrowDownward,
  MdLogout,
  MdOutlineQueryStats,
  MdSettings,
} from "react-icons/md";
import { RiAccountCircleLine } from "react-icons/ri";
import { BiMessageSquareEdit } from "react-icons/bi";
import { FaImages } from "react-icons/fa";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";
import { paths } from "../../../../utils/paths";
import { useLogout } from "../../../../actions/_auth";

const MenuList = [
  {
    icon: (
      <MdOutlineQueryStats
        size={20}
        color={"blue"}
        style={{ marginRight: "5px" }}
      />
    ),
    name: "Dashboard",
    path: paths.authorDashboard,
    gap: true,
  },
  {
    icon: (
      <HiOutlineClipboardDocumentList
        size={20}
        color={"blue"}
        style={{ marginRight: "5px" }}
      />
    ),
    name: "Posts",
    path: paths.blogs,
    gap: false,
  },
  {
    icon: (
      <BiMessageSquareEdit
        size={20}
        color={"blue"}
        style={{ marginRight: "5px" }}
      />
    ),
    name: "Create Posts",
    path: paths.createBlog,
    gap: false,
  },
  {
    icon: <FaImages size={20} color={"blue"} style={{ marginRight: "5px" }} />,
    name: "Gallery",
    path: paths.gallery,
    gap: true,
  },
  {
    icon: (
      <MdSettings size={20} color={"blue"} style={{ marginRight: "5px" }} />
    ),
    name: "Uploads",
    // path: "/settings",
    gap: false,
  },
  {
    icon: (
      <RiAccountCircleLine
        size={20}
        color={"blue"}
        style={{ marginRight: "5px" }}
      />
    ),
    name: "Profile",
    path: paths.profile,
    gap: false,
  },
  {
    icon: <MdLogout size={20} color={"blue"} style={{ marginRight: "5px" }} />,
    name: "Logout",
    path: "/login",
    gap: true,
  },
];

const NavLink = ({ from = "medScreen" }) => {
  const [selectedItem, setSelectedItem] = useState(-1);
  const location = useLocation();
  const { logout } = useLogout();

  useEffect(() => {
    const findActiveIndex = MenuList.findIndex((item) =>
      location.pathname.startsWith(item.path)
    );
    setSelectedItem(findActiveIndex !== -1 ? findActiveIndex : -1);
  }, [location]); // Update selection on location change

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  return (
    <>
      {MenuList.map((item, index) => (
        <div
          key={index}
          className={`d-flex justify-content-start align-items-center gap-1 ${
            item.gap ? "mt-5" : "mt-3"
          } ${selectedItem === index ? "active" : ""}`} // Use a separate class name for active state
          onClick={() => handleItemClick(index)}
        >
          {item.icon}
          {item.name === "Logout" ? (
            <Link
              className="_link"
              to={item.path}
              style={{ fontSize: "15px" }}
              onClick={logout}
            >
              {item.name}
            </Link>
          ) : (
            <Link className="_link" to={item.path} style={{ fontSize: "15px" }}>
              {item.name}
            </Link>
          )}
        </div>
      ))}
    </>
  );
};

export default NavLink;
