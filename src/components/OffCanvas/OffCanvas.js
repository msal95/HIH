import React, { useEffect, useState } from "react";
import { Clock, Search } from "react-feather";
import {
  Button,
  Input,
  InputGroup,
  InputGroupText,
  Nav,
  NavItem,
  NavLink,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  Spinner,
  TabContent,
  TabPane,
} from "reactstrap";
import "../../style/components/offCanvasAnimation.scss";

import NoRecordFound from "../NoRecordFound/NoRecordFound";

export default function CustomOffCanvas(props) {
  const {
    canvasOpen,
    canvasScroll,
    toggleCanvasScroll,
    canvasPlacement,
    toggleCanvasEnd,
    active,
    toggleTabs,
    isLoading,
    data,
    error,
    isError,
    onAddNode,
  } = props;
  const [query, setQuery] = useState("");

  let list = data?.integrations;

  useEffect(() => {
    if (query?.length) {
      const searchedData = data?.integrations?.filter((post) => {
        return post.name.toLowerCase().includes(query.toLowerCase());
      });
      list = searchedData;
      // setIntegrationData(searchedData);
    } else {
      // setIntegrationData(data);
      list = data?.integrations;
    }
  }, [query]);

  const handleOnChange = (event) => {
    setQuery(event.target.value);
  };

  // if (isLoading) {
  //   return (
  //     <div className="d-flex justify-content-center align-items-center">
  //       <Spinner type="grow" color="primary" />
  //     </div>
  //   );
  // }

  return (
    <Offcanvas
      scrollable={canvasScroll}
      direction={canvasPlacement}
      isOpen={canvasOpen}
      toggle={toggleCanvasScroll}
      style={{ width: "25rem" }}
      className={canvasOpen ? "offcanvas-open" : "offcanvas-close"}
    >
      <OffcanvasHeader toggle={toggleCanvasEnd} />

      {isError && (
        <div className="container-xxl d-flex justify-content-center align-items-center">
          <h3>{error.message}</h3>
        </div>
      )}

      <OffcanvasBody className="mx-0 flex-grow-0">
        <Nav tabs>
          <NavItem>
            <NavLink
              active={active === "1"}
              onClick={() => {
                toggleTabs("1");
              }}
            >
              All
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={active === "2"}
              onClick={() => {
                toggleTabs("2");
              }}
            >
              App
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={active === "3"}
              onClick={() => {
                toggleTabs("3");
              }}
            >
              Core
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={active === "4"}
              onClick={() => {
                toggleTabs("4");
              }}
            >
              Trigger
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={active}>
          <TabPane tabId="1">
            {isLoading && (
              <div className="d-flex justify-content-center align-items-center">
                <Spinner type="grow" color="primary" />
              </div>
            )}
            <InputGroup className="input-group-merge  ">
              <InputGroupText
              // className="round"
              >
                <Search className="text-muted" size={14} />
              </InputGroupText>
              <Input
                value={query}
                // className="round"
                placeholder="Search for nodes"
                onChange={handleOnChange}
              />
            </InputGroup>
            <div className="row">
              {!list?.length && !!query?.length && (
                <NoRecordFound searchTerm={query} />
              )}

              {list?.map((item) => {
                return (
                  <div
                    className="col-md-5 d-flex flex-column align-items-center mt-2 ps-0"
                    key={item.id}
                  >
                    <img
                      src={item?.image}
                      alt="Google Icon"
                      width="56px"
                      height="56px"
                      onClick={() => onAddNode(item)}
                      className="cursor-pointer"
                    />
                    <h3
                      className="icon-title mt-1 cursor-pointer"
                      onClick={() => onAddNode(item)}
                    >
                      {/* {item?.name} */}
                      {item.name?.length > 6
                        ? `${item.name.substr(0, 6)}..`
                        : item.name}
                    </h3>
                  </div>
                );
              })}
            </div>
          </TabPane>
          <TabPane tabId="2">
            <p>
              Dragée jujubes caramels tootsie roll gummies gummies icing bonbon.
              Candy jujubes cake cotton candy. Jelly-o lollipop oat cake
              marshmallow fruitcake candy canes toffee. Jelly oat cake pudding
              jelly beans brownie lemon drops ice cream halvah muffin. Brownie
              candy tiramisu macaroon tootsie roll danish.
            </p>
            <p>
              Croissant pie cheesecake sweet roll. Gummi bears cotton candy tart
              jelly-o caramels apple pie jelly danish marshmallow. Icing
              caramels lollipop topping. Bear claw powder sesame snaps.
            </p>
          </TabPane>
          <TabPane tabId="3">
            <p>
              Gingerbread cake cheesecake lollipop topping bonbon chocolate
              sesame snaps. Dessert macaroon bonbon carrot cake biscuit.
              Lollipop lemon drops cake gingerbread liquorice. Sweet gummies
              dragée. Donut bear claw pie halvah oat cake cotton candy sweet
              roll. Cotton candy sweet roll donut ice cream.
            </p>
            <p>
              Halvah bonbon topping halvah ice cream cake candy. Wafer gummi
              bears chocolate cake topping powder. Sweet marzipan cheesecake
              jelly-o powder wafer lemon drops lollipop cotton candy.
            </p>
          </TabPane>
          <TabPane tabId="4">
            <div className="d-flex mt-1">
              <Clock size={18} className="me-1" />
              <div>
                <h5>Test Heading</h5>
                <p>Run the flows every day, hour, or custom interval</p>
              </div>
            </div>
          </TabPane>
        </TabContent>
      </OffcanvasBody>
    </Offcanvas>
  );
}
