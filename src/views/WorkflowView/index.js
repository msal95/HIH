// ** React Imports
import { useContext, useState } from "react";

// ** Reactstrap Imports
import { Button, Card, Col, Row, TabContent, TabPane, Table } from "reactstrap";

// ** Context

// ** Demo Components
import Tabs from "./Tabs";

// ** Context
import { ThemeColors } from "@src/utility/context/ThemeColors";

// ** Styles
import { useSkin } from "@hooks/useSkin";
import jobImage from "@src/assets/images/backgrounds/job.svg";
import infoIcon from "@src/assets/images/icons/file-icons/info-icon.png";
import "@styles/base/pages/dashboard-ecommerce.scss";
import "@styles/react/libs/charts/apex-charts.scss";
import { Copy, Layers, Target, Trash2 } from "react-feather";
import CustomHeading from "../../components/CustomHeading/CustomHeading";
import Divider from "../../components/Divider/Divider";
import "../../style/base/base.scss";
import ApexAreaCharts from "./ApexAreaCharts"; //
import TabsVerticalLeft from "./TabsVerticalLeft";
import { tabsVerticalLeft } from "./TabSourceCode";

const WorkflowView = () => {
  // ** Context
  const [activeTab, setActiveTab] = useState("1");

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

  const handleNavigation = (item)=>{
    window.location.href=`http://127.0.0.1:8000/workflow-engine/builder/${item}`
  }

  return (
    <div className="container-xxl  overflow-auto">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <Layers size={25} className="me-1" />
          <h2 className="text-primary py-2">Workflow View</h2>
        </div>
        <div className="d-flex">
          <Button outline color="primary" onClick={()=>handleNavigation(1)}>
            Edit FLow
          </Button>
          <Button className="ms-2" color="primary">
            Start FLow
          </Button>
          <div
            className="ms-2"
            style={{
              borderBottom: "3rem solid #BFBFBF",
              width: 1,
            }}
          />
          <Button className="ms-2 btn-icon" outline color="primary">
            <Copy size={16} />
          </Button>
          <Button className="ms-2 btn-icon" outline color="primary">
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
      {/* {data !== null ? ( */}
      <Row className="mb-2">
        <Col xs={12}>
          <Tabs className="mb-2" activeTab={activeTab} toggleTab={toggleTab} />

          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <div className="my-2  me-1">
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
                  <Col md={4} className="bg-white p-2 card ">
                    <h3 className="workflow-button-status">
                      <Target size={20} className="me-1" />
                      Inactive
                    </h3>
                    <Row>
                      <Col md="6">
                        <h5>Successful Jobs</h5>
                        <p>0</p>
                      </Col>
                      <Col md="6">
                        <h5>Failed Jobs</h5>
                        <p>0</p>
                      </Col>
                      <Divider />
                    </Row>
                    <CustomHeading
                      title="Location"
                      subTitle="Folder 1"
                      iconWidth="16px"
                      iconHeight="16px"
                      titleClass="titleClass"
                      subTitleClass="subTitleClass"
                      isIcon
                    />
                    <CustomHeading
                      title="Edited"
                      subTitle="28 minutes ago"
                      // image={edit}
                      // iconWidth="16px"
                      // iconHeight="16px"
                      titleClass="titleClass"
                      subTitleClass="subTitleClass"
                    />
                    <CustomHeading
                      title="Dependencies"
                      subTitle="No assets used"
                      // image={groupIcon}
                      // iconWidth="16px"
                      // iconHeight="16px"
                      titleClass="titleClass"
                      subTitleClass="subTitleClass"
                      isDivider
                    />

                    <CustomHeading
                      title="Description"
                      subTitle="When there is a trigger event, do action"
                      // image={groupIcon}
                      // iconWidth="16px"
                      // iconHeight="16px"
                      titleClass="titleClass"
                      subTitleClass="subTitleClass"
                      // isDivider
                    />
                    <Button
                      outline
                      color="primary"
                      className="ms-1 mb-1"
                      style={{ width: "6rem" }}
                    >
                      Edit
                    </Button>
                    <Divider />

                    <CustomHeading
                      title="Latest Activity"
                      subTitle=""
                      image={infoIcon}
                      iconWidth="16px"
                      iconHeight="16px"
                      titleClass="titleClass"
                      subTitleClass="subTitleClass"
                    />
                    <p className="ms-3">
                      Check out the <a href="#">help guide</a> to learn how to
                      connect to Workday on HIH.
                    </p>

                    {/* {isNewProject && ( */}
                    {/* <CreateNewProject
              onCancel={handleOnCreateNewProject}
              onSubmit={onPressNewProject}
            /> */}
                    {/* )} */}
                  </Col>
                </Row>
              </div>
            </TabPane>
            <TabPane tabId="2">
              <div
                className="card p-5 d-flex justify-content-center align-items-center"
                style={{ height: "25rem" }}
              >
                <img src={jobImage} width="30%" alt="Job Image" />
                <div>
                  <h3 className="text-center mt-1">
                    <a href="#">Setup a trigger</a>. Then test your flow.
                  </h3>
                  <p>
                    Please tell us which event should kickstart this recipe.
                    Then come back to test it.
                  </p>
                </div>
              </div>
            </TabPane>
            <TabPane tabId="3">
              <Card className="overflow-hidden">
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Version</th>
                      <th>Created on</th>
                      <th>Change type</th>
                      <th>Modified by</th>
                      <th>Comment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="pt-3 pb-3">
                      <td>
                        {/* <img className='me-75' src={angular} alt='angular' height='20' width='20' /> */}
                        <span className="align-middle fw-bold">
                          1{" "}
                          <span
                            style={{
                              padding: 3,
                              borderRadius: 20,
                              background: "#999",
                            }}
                          >
                            Current
                          </span>
                        </span>
                      </td>
                      <td>05/05/23 6:50AM</td>
                      <td>Flow Change</td>
                      <td>User Name</td>
                      <td>Add Comment</td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </TabPane>
            <TabPane tabId="4">
              {/* <Card title="Vertical Left Tabs" code={tabsVerticalLeft}> */}
              <TabsVerticalLeft />
              {/* </Card> */}
            </TabPane>
          </TabContent>
        </Col>
      </Row>
      {/* ) : null} */}
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
    </div>
  );
};

export default WorkflowView;
