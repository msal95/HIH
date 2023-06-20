// ** Reactstrap Imports
import { Nav, NavItem, NavLink } from "reactstrap";

// ** Icons Imports
import {
  User,
  Lock,
  Bookmark,
  Link,
  Bell,
  Home,
  BarChart,
  Activity,
} from "react-feather";

const Tabs = ({ activeTab, toggleTab }) => {
  return (
    <Nav pills className="mb-2 bg-light">
      <NavItem>
        <NavLink active={activeTab === "1"} onClick={() => toggleTab("1")}>
          <Home size={18} className="me-50" />
          <span className="fw-bold">Workflow</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === "2"} onClick={() => toggleTab("2")}>
          <BarChart size={18} className="me-50" />
          <span className="fw-bold">Executions</span>
        </NavLink>
      </NavItem>
    </Nav>
  );
};

export default Tabs;
