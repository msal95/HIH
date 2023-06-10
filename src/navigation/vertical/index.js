// ** Navigation imports
import apps from "./apps";
import pages from "./pages";
import forms from "./forms";
import tables from "./tables";
import others from "./others";
import charts from "./charts";
import dashboards from "./dashboards";
import uiElements from "./ui-elements";

const userData = localStorage.getItem("userData");
console.log("🚀 ~ file: index.js:12 ~ userData:", userData);

// ** Merge & Export
// export default [...dashboards, ...apps];
let rolseBased;
if (userData?.role !== "admin") {
  rolseBased = [...dashboards, ...apps];
} else {
  rolseBased = [...apps];
}
// export default [
//   ...dashboards,
//   ...apps,
//   // ...pages,
//   // ...uiElements,
//   // ...forms,
//   // ...tables,
//   // ...charts,
//   // ...others,
// ];

export default rolseBased;
