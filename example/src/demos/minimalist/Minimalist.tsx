import React from "react";
import ReactGraph from "react-graph";
import { PageWrapper } from "../common/Organisms";
import { root, nodes, relationships } from "../../assets/mocks/random";

const Minimalist = () => (
  <PageWrapper>
    <ReactGraph
      initialState={root}
      nodes={nodes}
      relationships={relationships}
      width="100%"
      height="100%"
      hasLegends
      hasInspector
      hasTruncatedFields
    />
  </PageWrapper>
);

export { Minimalist };
