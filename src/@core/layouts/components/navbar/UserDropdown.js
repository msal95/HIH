// ** React Imports
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { isUserLoggedIn } from "@utils";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "@store/authentication";
import HIHLogo from "@src/assets/images/logo/hih_Logo.png";

// ** Third Party Components
import {
  User,
  Mail,
  CheckSquare,
  MessageSquare,
  Settings,
  CreditCard,
  HelpCircle,
  Power,
} from "react-feather";

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";

// ** Default Avatar Image
import defaultAvatar from "@src/assets/images/portrait/small/avatar-s-11.jpg";
import UserData from "../../../../utility/customUtils/CustomUtils";

const UserDropdown = () => {
  // ** Store Vars
  const dispatch = useDispatch();

  const selector = useSelector((select) => select?.auth?.userData);

  const [userData, setUserData] = useState({});

  useEffect(() => {
    // Retrieve data from local storage
    const data = UserData.getItem("userData");
    setUserData(data);
  }, [selector]);

  // ** Selector to access the user data from the Redux store

  // ** State
  // const [userData, setUserData] = useState(null);

  //** Vars
  const userAvatar = (userData && userData?.profile_photo_url) || HIHLogo;
  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold">
            {(!!Object?.keys(userData)?.length && userData?.name) || "Emmanuel"}
          </span>
          {/* <span className='user-status'>{(userData && userData.role) || 'Admin'}</span> */}
        </div>
        <Avatar img={userAvatar} imgHeight="40" imgWidth="40" status="online" />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to="/apps/profile">
          <User size={14} className="me-75" />
          <span className="align-middle">Profile</span>
        </DropdownItem>
        {/* <DropdownItem tag={Link} to='/apps/email'>
          <Mail size={14} className='me-75' />
          <span className='align-middle'>Inbox</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/apps/todo'>
          <CheckSquare size={14} className='me-75' />
          <span className='align-middle'>Tasks</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/apps/chat'>
          <MessageSquare size={14} className='me-75' />
          <span className='align-middle'>Chats</span>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem tag={Link} to='/pages/account-settings'>
          <Settings size={14} className='me-75' />
          <span className='align-middle'>Settings</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/pages/pricing'>
          <CreditCard size={14} className='me-75' />
          <span className='align-middle'>Pricing</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/pages/faq'>
          <HelpCircle size={14} className='me-75' />
          <span className='align-middle'>FAQ</span>
        </DropdownItem> */}
        <DropdownItem
          tag={Link}
          to="/login"
          onClick={() => dispatch(handleLogout())}
        >
          <Power size={14} className="me-75" />
          <span className="align-middle">Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
