import { useState } from "react";
import { Row, Col, Drawer } from "antd";
import NavLink from "./NavLink";
import Header from "./Header";
import { usePoints } from "../../../../utils/custom-hooks";

const AuthorLayout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const onClose = () => {
    setShowSidebar(false);
  };

  const points = usePoints();

  return (
    <>
      <div className="container-fluid">
        <Row className="mainLayout ">
          <Col md={8} className="d-none d-md-block sidebar border-end ps-3">
            <div className="mt-4">
              <div>
                <h5>The Author's Hub</h5>
              </div>
              <NavLink />
            </div>
          </Col>
          <Col md={19} className="content px-3">
            <Header setShowSidebar={setShowSidebar} />

            {children}
          </Col>
        </Row>

        {!points.md && (
          <Drawer title="The Author's Hub" onClose={onClose} open={showSidebar} >
            <NavLink from={"smallScreen"} />
          </Drawer>
        )}
      </div>
    </>
  );
};

export default AuthorLayout;
