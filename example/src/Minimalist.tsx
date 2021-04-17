import React, { useState} from 'react';
import ReactGraph from 'react-graph';
import styled from "styled-components";

const PageWrapper = styled.div`
  display: flex; 
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

const Minimalist = (props: any) => (
  <PageWrapper>
    <ReactGraph
      initialState={props.root}
      nodes={props.nodes}
      relationships={props.relationships}
      width={"100%"}
      height={"100%"}
      hasLegends
      hasInspector
      hasTruncatedFields
    />
  </PageWrapper>
);

export default Minimalist ;
