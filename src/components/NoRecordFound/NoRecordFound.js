import React from "react";

export default function NoRecordFound(props) {
  const { searchTerm } = props;
  return (
    <div className="d-flex justify-content-center align-items-center p-3 container-xxl ">
      <h4>No Search Record Found For `{searchTerm}`</h4>
    </div>
  );
}
