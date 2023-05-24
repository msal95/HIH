// ** React Imports
import { useState } from "react";

// ** Reactstrap Imports
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Col,
  Card,
  Row,
} from "reactstrap";

const TabsVerticalLeft = () => {
  // ** State
  const [active, setActive] = useState("1");

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <div className="nav-vertical">
      <Row>
        <Col md="3">
          <Card className="p-2">
            <Nav tabs className="nav-left">
              <NavItem>
                <NavLink
                  active={active === "1"}
                  onClick={() => {
                    toggle("1");
                  }}
                >
                  General
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={active === "2"}
                  onClick={() => {
                    toggle("2");
                  }}
                >
                  Sharing
                </NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink
                  active={active === "3"}
                  onClick={() => {
                    toggle("3");
                  }}
                >
                  Tab 3
                </NavLink>
              </NavItem> */}
            </Nav>
          </Card>
        </Col>
        <Col md="9">
          <Card className="p-3">
            <TabContent activeTab={active}>
              <TabPane tabId="1">
                <p>
                  Oat cake marzipan cake lollipop caramels wafer pie jelly
                  beans. Icing halvah chocolate cake carrot cake. Jelly beans
                  carrot cake marshmallow gingerbread chocolate cake. Sweet
                  fruitcake cheesecake biscuit cotton candy. Cookie powder
                  marshmallow donut. Gummies cupcake croissant.
                </p>
              </TabPane>
              <TabPane tabId="2">
                <p>
                  Sugar plum tootsie roll biscuit caramels. Liquorice brownie
                  pastry cotton candy oat cake fruitcake jelly chupa chups.
                  Sweet fruitcake cheesecake biscuit cotton candy. Cookie powder
                  marshmallow donut. Pudding caramels pastry powder cake soufflé
                  wafer caramels. Jelly-o pie cupcake.
                </p>
              </TabPane>
            </TabContent>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default TabsVerticalLeft;
