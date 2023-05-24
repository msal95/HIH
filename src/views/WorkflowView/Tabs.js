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
  Briefcase,
  Cpu,
  GitPullRequest,
  Settings,
} from "react-feather";

const Tabs = ({ activeTab, toggleTab }) => {
  return (
    <Nav pills className="mb-2">
      <NavItem>
        <NavLink active={activeTab === "1"} onClick={() => toggleTab("1")}>
          <Cpu size={18} className="me-50" />
          <span className="fw-bold">FLow</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === "2"} onClick={() => toggleTab("2")}>
          <Briefcase size={18} className="me-50" />
          <span className="fw-bold">Jobs</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === "3"} onClick={() => toggleTab("3")}>
          <GitPullRequest size={18} className="me-50" />
          <span className="fw-bold">Versions</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === "4"} onClick={() => toggleTab("4")}>
          <Settings size={18} className="me-50" />
          <span className="fw-bold">Settigs</span>
        </NavLink>
      </NavItem>
      {/*<NavItem>
        <NavLink active={activeTab === "5"} onClick={() => toggleTab("5")}>
          <Link size={18} className="me-50" />
          <span className="fw-bold">Connections</span>
        </NavLink>
      </NavItem> */}
    </Nav>
  );
};

export default Tabs;
