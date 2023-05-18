// ** Icons Imports
import { Calendar, Search } from "react-feather";
import { Form, Input, InputGroup, InputGroupText, Row } from "reactstrap";
import { useState, useRef, useEffect } from "react";
import Flatpickr from "react-flatpickr";

import DropDown from "../../components/DropDown/DropDown";
import "../../style/components/credentialsFilter.scss";

const CredentialsFilter = (props) => {
  const options = [
    { id: 1, title: "Option 1" },
    { id: 2, title: "Option 2" },
    { id: 3, title: "Option 3" },
    { id: 4, title: "Option 4" },
  ];

  const {
    searchTerm,
    handleSearchTerm,
    searchClass = "col-md-4",
    sortOptions = options,
    handleOnSelectSort,
    selectedOption,
  } = props;

  const [picker, setPicker] = useState(new Date());

  const flatpickrRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    const icon = iconRef.current;
    const input = flatpickrRef.current.flatpickr.input;

    // Append the icon to the Flatpickr element
    input.parentNode.insertBefore(icon, input.nextSibling);
  }, []);

  const handleOpenCalender = () => {
    if (flatpickrRef.current && flatpickrRef.current.flatpickr) {
      flatpickrRef.current.flatpickr.toggle();
    }
    // setShowPicker((prevState) => !prevState);
  };

  return (
    <div id="faq-search-filter">
      <div className="row mt-4">
        <div className="col-md-9 col-12 mb-2">
          <Row>
            <div className={searchClass}>
              <Form
                className="faq-search-input"
                onSubmit={(e) => e.preventDefault()}
              >
                <InputGroup className="input-group-merge border border-secondary">
                  <InputGroupText
                    className="border border-end-0"
                    style={{ background: "#FFFFFF00" }}
                  >
                    <Search size={14} />
                  </InputGroupText>
                  <Input
                    style={{ background: "#FFFFFF00" }}
                    className="border border-start-0"
                    value={searchTerm}
                    onChange={handleSearchTerm}
                    placeholder="search Here..."
                  />
                </InputGroup>
              </Form>
            </div>
            <div className="col-md-4">
              {/* Dropdown Filters */}
              <DropDown title="Filters" options={options} />
            </div>
          </Row>
        </div>

        <div className="content-header-right text-md-end col-md-3 col-12 d-md-block d-none">
          {/* {!showPicker && ( */}
          <Calendar
            size={22}
            className="me-1"
            onClick={handleOpenCalender}
            ref={iconRef}
          />
          {/* )} */}
          {/* {showPicker && ( */}
          <Flatpickr
            ref={flatpickrRef}
            value={picker}
            id="range-picker"
            className="flatpickr-input"
            onChange={(date) => setPicker(date)}
            options={{
              mode: "range",
              inline: false,
              // defaultDate: ["2020-02-01", "2020-02-15"],
            }}
          />
          {/* )} */}
          <DropDown
            title={selectedOption ?? "Sort"}
            options={sortOptions}
            handleOnSelectSort={handleOnSelectSort}
          />
        </div>
      </div>
    </div>
  );
};

export default CredentialsFilter;
