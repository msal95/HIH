// ** Icons Imports
import { Search } from "react-feather";

// ** Reactstrap Imports
import { Form, Input, InputGroup, InputGroupText, Row } from "reactstrap";
import DropDown from "../../components/DropDown/DropDown";

const CredentialsFilter = ({ searchTerm, handleSearchTerm }) => {
  const options = [
    { id: 1, title: "Option 1" },
    { id: 2, title: "Option 2" },
    { id: 3, title: "Option 3" },
    { id: 4, title: "Option 4" },
  ];

  return (
    <div id="faq-search-filter">
      <div className="row mt-4">
        <div className="col-md-9 col-12 mb-2">
          <Row>
            <div className="col-md-4">
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
          <DropDown title="Sort" options={options} />
        </div>
      </div>
    </div>
  );
};

export default CredentialsFilter;
