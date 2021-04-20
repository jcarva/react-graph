import React from "react";
import ReactGraph from "react-graph";
import { PageWrapper } from "../components/common/Organisms";

const Minimalist = (props: any) => (
  <PageWrapper>
    <ReactGraph
      initialState={props.root}
      nodes={props.nodes}
      relationships={props.relationships}
      width="100%"
      height="100%"
      hasLegends
      hasInspector
      hasTruncatedFields
    />
  </PageWrapper>
);

export { Minimalist };
