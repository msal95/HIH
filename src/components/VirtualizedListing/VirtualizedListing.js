import React from "react";
import { List } from "react-virtualized";

export default function VirtualizedListing(props) {
  const { data, renderdList } = props;
  return (
    <List
      width={400} // Width of the list container
      height={600} // Height of the list container
      rowCount={data.length} // Total number of items in the list
      rowHeight={50} // Height of each row in the list
      rowRenderer={renderdList} // Render method for each row
    />
  );
}
