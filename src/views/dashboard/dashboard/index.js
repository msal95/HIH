// ** React Imports
import { Fragment, useContext, useEffect, useState } from "react";

// ** Reactstrap Imports
import {
  Row,
  Col,
  TabContent,
  TabPane,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Badge,
  Alert,
  Progress,
  Button,
} from "reactstrap";
import axios from "axios";

// ** Context
import { ThemeColors } from "@src/utility/context/ThemeColors";

// ** Demo Components
import CompanyTable from "./CompanyTable";
import Earnings from "@src/views/ui-elements/cards/analytics/Earnings";
import CardMedal from "@src/views/ui-elements/cards/advance/CardMedal";
import CardMeetup from "@src/views/ui-elements/cards/advance/CardMeetup";
import StatsCard from "@src/views/ui-elements/cards/statistics/StatsCard";
import GoalOverview from "@src/views/ui-elements/cards/analytics/GoalOverview";
import RevenueReport from "@src/views/ui-elements/cards/analytics/RevenueReport";
import OrdersBarChart from "@src/views/ui-elements/cards/statistics/OrdersBarChart";
import CardTransactions from "@src/views/ui-elements/cards/advance/CardTransactions";
import ProfitLineChart from "@src/views/ui-elements/cards/statistics/ProfitLineChart";
import CardBrowserStates from "@src/views/ui-elements/cards/advance/CardBrowserState";
import Tabs from "./Tabs";
import { useSkin } from "@hooks/useSkin";
import { basicData } from "./data";
import Timeline from "@components/timeline";

// ** Context
// import { ThemeColors } from "@src/utility/context/ThemeColors";

// ** Styles
import "@styles/react/libs/charts/apex-charts.scss";
import "@styles/base/pages/dashboard-ecommerce.scss";
import BreadCrumbs from "../../components/breadcrumbs";
import Divider from "../../../components/Divider/Divider";
import DropDown from "../../../components/DropDown/DropDown";
import AreaChart from "./ChartjsAreaChart";
import ApexAreaCharts from "./ApexAreaCharts";
import ApexBarChart from "../../charts/apex/ApexBarChart";

const options = [
  { id: 1, title: "Option 1" },
  { id: 2, title: "Option 2" },
  { id: 3, title: "Option 3" },
  { id: 4, title: "Option 4" },
];

const Dashboard = () => {
  // ** Context
  const [activeTab, setActiveTab] = useState("1");
  const [data, setData] = useState(null);

  const { colors } = useContext(ThemeColors),
    { skin } = useSkin(),
    labelColor = skin === "dark" ? "#b4b7bd" : "#6e6b7b",
    gridLineColor = "rgba(200, 200, 200, 0.2)",
    blueColor = "#2c9aff",
    blueLightColor = "#84D0FF",
    greyLightColor = "#EDF1F4";

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  const token = localStorage.getItem("accessToken");
  console.log("🚀 ~ file: apiEndPoint.js:4 ~ token:", token);

  useEffect(() => {
    axios
      .get("/account-setting/data")
      .then((response) => setData(response.data));
  }, []);

  // ** vars

  return (
    <Fragment>
      {/* <BreadCrumbs
        title="Dashboard"
        // data={[{ title: "Pages" }, { title: "Account Settings" }]}
      /> */}
      <h2 className="text-primary py-2">Dashboard</h2>
      {data !== null ? (
        <Row className="mb-2">
          <Col xs={12}>
            <Tabs
              className="mb-2"
              activeTab={activeTab}
              toggleTab={toggleTab}
            />

            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                {/* <h3>Tab 1</h3> */}
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex">
                    <DropDown
                      title="All Projects"
                      options={options}
                      className="me-1"
                      // handleOnSelectSort={handleOnSelectSort}
                    />
                    <DropDown
                      title="All Recipes"
                      options={options}
                      className="me-1"
                      // handleOnSelectSort={handleOnSelectSort}
                    />
                    <DropDown
                      title="Service/App"
                      options={options}
                      className="me-1"
                      // handleOnSelectSort={handleOnSelectSort}
                    />
                  </div>
                  <Row>
                    <h5>Dashboard last updated 30 minutes ago</h5>
                  </Row>
                </div>
                <div className="my-2">
                  <Row>
                    <Col md="8">
                      <ApexAreaCharts
                        blueColor={blueColor}
                        labelColor={labelColor}
                        gridLineColor={gridLineColor}
                        blueLightColor={blueLightColor}
                        greyLightColor={greyLightColor}
                      />
                    </Col>
                    <Col md="4">
                      <Card className="plan-card border-primary">
                        <CardBody>
                          <div className="d-flex justify-content-between align-items-start">
                            <Badge color="light-primary">Standard</Badge>
                            <div className="d-flex justify-content-center">
                              <sup className="h5 pricing-currency text-primary mt-1 mb-0">
                                $
                              </sup>
                              <span className="fw-bolder display-5 mb-0 text-primary">
                                99
                              </span>
                              <sub className="pricing-duration font-small-4 ms-25 mt-auto mb-2">
                                /month
                              </sub>
                            </div>
                          </div>
                          <ul className="ps-1 mb-2">
                            <li className="mb-50">10 Users</li>
                            <li className="mb-50">Up to 10 GB storage</li>
                            <li>Basic Support</li>
                          </ul>
                          <div className="d-flex justify-content-between align-items-center fw-bolder mb-50">
                            <span>Days</span>
                            <span>4 of 30 Days</span>
                          </div>
                          <Progress
                            className="mb-50"
                            value={85}
                            style={{ height: "8px" }}
                          />
                          <span>4 days remaining</span>
                          <div className="d-grid w-100 mt-2">
                            <Button
                              color="primary"
                              // onClick={() => setShow(true)}
                            >
                              Upgrade Plan
                            </Button>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </div>
                <div className="my-1">
                  <h5>What happened in all my recipes for the last 7 days?</h5>
                  <Divider />
                  <Col xl="12" md="12" xs="12">
                    <StatsCard cols={{ xl: "3", sm: "6" }} />
                  </Col>
                </div>
                {/* <AccountTabContent data={data.general} /> */}
              </TabPane>
              <TabPane tabId="2">
                <div className="d-flex mb-2">
                  <DropDown
                    title="All Projects"
                    options={options}
                    className="me-1"
                    // handleOnSelectSort={handleOnSelectSort}
                  />
                  <DropDown
                    title="All Recipes"
                    options={options}
                    className="me-1"
                    // handleOnSelectSort={handleOnSelectSort}
                  />
                  {/* <DropDown
                      title="Service/App"
                      options={options}
                      className="me-1"
                      // handleOnSelectSort={handleOnSelectSort}
                    /> */}
                </div>
                <ApexBarChart
                  blueColor={blueColor}
                  labelColor={labelColor}
                  gridLineColor={gridLineColor}
                  blueLightColor={blueLightColor}
                  greyLightColor={greyLightColor}
                />
                <Row className="match-height my-2">
                  <Col xl="4" md="6" xs="12">
                    <CardMedal />
                  </Col>
                  <Col xl="8" md="6" xs="12">
                    <StatsCard cols={{ xl: "3", sm: "6" }} />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="3">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Yesterday</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Timeline data={basicData} />
                  </CardBody>
                </Card>
              </TabPane>
              <TabPane tabId="4">
                {/* <NotificationsTabContent /> */}
                <h3>Tab 4</h3>
              </TabPane>
              <TabPane tabId="5">
                {/* <ConnectionsTabContent /> */}
                <h3>Tab 5</h3>
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      ) : null}

      {/* <Divider /> */}
      <Row className="match-height">
        {/* <Col xl="4" md="6" xs="12">
          <CardMedal />
        </Col>
        <Col xl="8" md="6" xs="12">
          <StatsCard cols={{ xl: "3", sm: "6" }} />
        </Col> */}
      </Row>
      {/* <Row className="match-height">
        <Col lg="4" md="12">
          <Row className="match-height">
            <Col lg="6" md="3" xs="6">
              <OrdersBarChart warning={colors.warning.main} />
            </Col>
            <Col lg="6" md="3" xs="6">
              <ProfitLineChart info={colors.info.main} />
            </Col>
            <Col lg="12" md="6" xs="12">
              <Earnings success={colors.success.main} />
            </Col>
          </Row>
        </Col>
        <Col lg="8" md="12">
          <RevenueReport
            primary={colors.primary.main}
            warning={colors.warning.main}
          />
        </Col>
      </Row>
      <Row className="match-height">
        <Col lg="8" xs="12">
          <CompanyTable />
        </Col>
        <Col lg="4" md="6" xs="12">
          <CardMeetup />
        </Col>
        <Col lg="4" md="6" xs="12">
          <CardBrowserStates colors={colors} trackBgColor={trackBgColor} />
        </Col>
        <Col lg="4" md="6" xs="12">
          <GoalOverview success={colors.success.main} />
        </Col>
        <Col lg="4" md="6" xs="12">
          <CardTransactions />
        </Col>
      </Row> */}
    </Fragment>
  );
};

export default Dashboard;
