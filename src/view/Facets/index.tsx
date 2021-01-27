import React from "react";
import { ViewId } from "../../types";

type Props = {
  viewId: ViewId;
};

const Facets: React.FC<Props> = ({ viewId }) => {
  return (
    <p>facets {viewId}</p>
  );
};

export default Facets;
