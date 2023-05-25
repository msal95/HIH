// ** Icons Import
import {
  Mail,
  MessageSquare,
  CheckSquare,
  Calendar,
  FileText,
  Circle,
  ShoppingCart,
  User,
  Shield,
  Table,
  Settings,
} from "react-feather";

export default [
  {
    header: "Apps & Pages",
  },
  {
    id: "credentials",
    title: "Credentials",
    icon: <Table size={20} />,
    navLink: "/apps/credentials",
  },
  {
    id: "integration",
    title: "Integrations",
    icon: <Table size={20} />,
    navLink: "/apps/integration",
  },
  {
    id: "builderApp",
    title: "Builder",
    icon: <FileText size={20} />,
    children: [
      {
        id: "form-generated",
        title: "Form generated",
        icon: <Circle size={12} />,
        navLink: "/apps/form/generated",
      },
      {
        id: "Formlisting",
        title: "Listing",
        icon: <Circle size={12} />,
        navLink: "/apps/form/listing",
      },
      {
        id: "Editor",
        title: "Editor",
        icon: <Circle size={12} />,
        navLink: "/apps/editor",
      },
      //   {
      //     id: "view",
      //     title: "View",
      //     icon: <Circle size={12} />,
      //     navLink: "/apps/view",
      //   },
    ],
  },
  {
    id: "flows",
    title: "Flows",
    icon: (
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M13.0559 9.48779H11.7217V11.6661H5.59521V15.0969H6.92943V13.0003H17.8482V15.0969H19.1824V11.6661H13.0559V9.48779Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M2.85873 15.6143C2.46515 15.6143 2.0877 15.7706 1.8094 16.0489C1.5311 16.3272 1.37476 16.7047 1.37476 17.0982V21.1825C1.37476 21.5761 1.5311 21.9536 1.8094 22.2319C2.0877 22.5102 2.46515 22.6665 2.85873 22.6665H9.66593C10.0595 22.6665 10.437 22.5102 10.7153 22.2319C10.9936 21.9536 11.1499 21.5761 11.1499 21.1825V17.0982C11.1499 16.7047 10.9936 16.3272 10.7153 16.0489C10.437 15.7706 10.0595 15.6143 9.66593 15.6143H2.85873ZM2.98126 21.06V17.2208H9.5434V21.06H2.98126Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M15.1117 15.6143C14.7181 15.6143 14.3406 15.7706 14.0623 16.0489C13.784 16.3272 13.6277 16.7047 13.6277 17.0982V21.1825C13.6277 21.5761 13.784 21.9536 14.0623 22.2319C14.3406 22.5102 14.7181 22.6665 15.1117 22.6665H21.9189C22.3124 22.6665 22.6899 22.5102 22.9682 22.2319C23.2465 21.9536 23.4028 21.5761 23.4028 21.1825V17.0982C23.4028 16.7047 23.2465 16.3272 22.9682 16.0489C22.6899 15.7706 22.3124 15.6143 21.9189 15.6143H15.1117ZM15.2342 21.06V17.2208H21.7963V21.06H15.2342Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8.98519 2C8.59162 2 8.21416 2.15635 7.93587 2.43464C7.65757 2.71294 7.50122 3.0904 7.50122 3.48397V7.56829C7.50122 7.96186 7.65757 8.33932 7.93587 8.61762C8.21416 8.89591 8.59162 9.05226 8.98519 9.05226H15.7924C16.186 9.05226 16.5634 8.89591 16.8417 8.61762C17.12 8.33932 17.2764 7.96186 17.2764 7.56829V3.48397C17.2764 3.0904 17.12 2.71294 16.8417 2.43464C16.5634 2.15635 16.186 2 15.7924 2H8.98519ZM9.10772 7.44576V3.6065H15.6699V7.44576H9.10772Z"
          fill="currentColor"
        />
      </svg>
      // <img
      //   src={flows}
      //   width={20}
      //   height={20}
      //   className="me-1"
      //   alt="Flows Icon"
      // />
    ),
    navLink: "/apps/flows",
  },
  {
    id: "users",
    title: "User",
    icon: <User size={20} />,
    navLink: "/apps/user/list",
    // children: [
    //   {
    //     id: "list",
    //     title: "List",
    //     icon: <Circle size={12} />,
    //     navLink: "/apps/user/list",
    //   },
    //   {
    //     id: "view",
    //     title: "View",
    //     icon: <Circle size={12} />,
    //     navLink: "/apps/user/view",
    //   },
    // ],
  },
  // {
  //   id: "settings",
  //   title: "Settings",
  //   icon: <Settings size={20} />,
  //   navLink: "/apps/settings/:id",
  // },
  {
    id: "settings",
    title: "Settings",
    icon: <Settings size={20} />,
    navLink: "/apps/settings",
  },
  // {
  //   id: "email",
  //   title: "Email",
  //   icon: <Mail size={20} />,
  //   navLink: "/apps/email",
  // },
  // {
  //   id: "chat",
  //   title: "Chat",
  //   icon: <MessageSquare size={20} />,
  //   navLink: "/apps/chat",
  // },
  // {
  //   id: "todo",
  //   title: "Todo",
  //   icon: <CheckSquare size={20} />,
  //   navLink: "/apps/todo",
  // },
  // {
  //   id: "calendar",
  //   title: "Calendar",
  //   icon: <Calendar size={20} />,
  //   navLink: "/apps/calendar",
  // },
  // {
  //   id: "kanban",
  //   title: "Kanban",
  //   icon: <CheckSquare size={20} />,
  //   navLink: "/apps/kanban",
  // },
  // {
  //   id: "invoiceApp",
  //   title: "Invoice",
  //   icon: <FileText size={20} />,
  //   children: [
  //     {
  //       id: "invoiceList",
  //       title: "List",
  //       icon: <Circle size={12} />,
  //       navLink: "/apps/invoice/list",
  //     },
  //     {
  //       id: "invoicePreview",
  //       title: "Preview",
  //       icon: <Circle size={12} />,
  //       navLink: "/apps/invoice/preview",
  //     },
  //     {
  //       id: "invoiceEdit",
  //       title: "Edit",
  //       icon: <Circle size={12} />,
  //       navLink: "/apps/invoice/edit",
  //     },
  //     {
  //       id: "invoiceAdd",
  //       title: "Add",
  //       icon: <Circle size={12} />,
  //       navLink: "/apps/invoice/add",
  //     },
  //   ],
  // },

  // {
  //   id: "roles-permissions",
  //   title: "Roles & Permissions",
  //   icon: <Shield size={20} />,
  //   children: [
  //     {
  //       id: "roles",
  //       title: "Roles",
  //       icon: <Circle size={12} />,
  //       navLink: "/apps/roles",
  //     },
  //     {
  //       id: "permissions",
  //       title: "Permissions",
  //       icon: <Circle size={12} />,
  //       navLink: "/apps/permissions",
  //     },
  //   ],
  // },
  // {
  //   id: "eCommerce",
  //   title: "eCommerce",
  //   icon: <ShoppingCart size={20} />,
  //   children: [
  //     {
  //       id: "shop",
  //       title: "Shop",
  //       icon: <Circle size={12} />,
  //       navLink: "/apps/ecommerce/shop",
  //     },
  //     {
  //       id: "detail",
  //       title: "Details",
  //       icon: <Circle size={12} />,
  //       navLink: "/apps/ecommerce/product-detail",
  //     },
  //     {
  //       id: "wishList",
  //       title: "Wish List",
  //       icon: <Circle size={12} />,
  //       navLink: "/apps/ecommerce/wishlist",
  //     },
  //     {
  //       id: "checkout",
  //       title: "Checkout",
  //       icon: <Circle size={12} />,
  //       navLink: "/apps/ecommerce/checkout",
  //     },
  //   ],
  // },
];
