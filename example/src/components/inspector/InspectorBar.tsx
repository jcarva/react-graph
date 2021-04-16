import React from "react";
import {InspectorComponent} from "./Inspector";
import styled from "styled-components";
import { Resizable } from "re-resizable";

const StyledResizable= styled(Resizable)`
   display: flex;
   justify-content: center;
   align-items: center;
   background: #f0f0f0;
`;

const InspectorBarWrapper = styled(StyledResizable)`
   flex-direction: column;
   justify-content: flex-start;
   align-items: flex-start;
   padding: 24px 16px 4px 16px;
   min-height: 24px;
   max-height: 40vh;
`;

const InspectorBar = (props: any) => {
  return(
    <InspectorBarWrapper
      defaultSize={{ width: "100%", height: 96 }}
      enable={{top:true, right:false, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false}}
      handleComponent={{
        top: <div style={{ width: "100%", height: "28px", backgroundColor: "#708090", marginTop: "5px", paddingTop: "2px", borderTop: "#465560 2px solid", boxSizing: "border-box", color: "white"}}>
          <p style={{margin: "0 8px", fontWeight: "bold"}}>Inspector:</p>
        </div>,
      }}
    >
      <InspectorComponent
        hasTruncatedFields={true}
        hoveredItem={props.dataOnInspect.hoveredItem}
        selectedItem={props.dataOnInspect.selectedItem}
        graphStyle={props.styles}
      />
    </InspectorBarWrapper>
  )
};

export { InspectorBar };
