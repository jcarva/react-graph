import React from "react";
import { Inspector } from "./Inspector";
import { InfoPanelHandle } from "./Organisms";
import styled from "styled-components";
import { Resizable } from "re-resizable";

const StyledResizable = styled(Resizable)`
  display: flex;
  background: #f0f0f0;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 24px 16px 4px 16px;
  min-height: 24px;
  max-height: 40vh;
`;

const InfoPanel = (props: any) => {
  return (
    <StyledResizable
      defaultSize={{ width: "100%", height: 96 }}
      enable={{
        top: true,
        right: false,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
      handleComponent={{
        top: <InfoPanelHandle />,
      }}
    >
      <Inspector
        hoveredItem={props.dataOnInspect.hoveredItem}
        selectedItem={props.dataOnInspect.selectedItem}
        graphStyle={props.styles}
        hasTruncatedFields
      />
    </StyledResizable>
  );
};

export { InfoPanel };
