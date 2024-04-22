import { Typography } from "antd";
import { MdLogout, MdMenu } from "react-icons/md";
import { useLogout } from "../../../../actions/_auth";
import { useNavigate } from "react-router-dom";

const Header = ({ setShowSidebar }) => {
  const { logout } = useLogout();
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-between align-items-center pb-2 pt-3 border-bottom mb-3">
      <div>
        <MdMenu
          className="d-block d-md-none"
          onClick={() => setShowSidebar(true)}
        />
      </div>
      <div
        className="d-flex justify-content-center align-items-center gap-2 hoverable"
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        <span>
          Logout
        </span>
        <MdLogout size={20} color={"blue"} />
      </div>
    </div>
  );
};

export default Header;
