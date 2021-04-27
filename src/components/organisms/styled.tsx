import styled from "styled-components";

const pMarginTop = 6;

// Themes is here because the colors are unique to this component
const getColor = (theme: "normal" | "dark", name: "svgBackground") => {
  const themes = {
    normal: {
      svgBackground: "#f9fbfd",
    },
    dark: {
      svgBackground: "#292C33",
    },
  };
  if (themes[theme] === undefined) theme = "normal";
  return themes[theme][name] || "";
};

export const StyledTruncatedMessage = styled.span`
  color: orange;
`;

export const ReactGraphWrapper = styled.div`
  display: flex;
  width: ${(props: any) =>
    props.width || "500px"}; // TODO: Use types default value
  height: ${(props: any) =>
    props.height || "500px"}; // TODO: Use types default value
  justify-content: center;
  position: relative;
  text-align: center;
`;

export const StyledSvgWrapper = styled.div`
  line-height: 0;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  > svg {
    height: 100%;
    width: 100%;
    background-color: ${(props) => getColor(props.theme.name, "svgBackground")};
    .node {
      cursor: pointer;
      > .ring {
        fill: none;
        opacity: 0;
        stroke: #6ac6ff;
      }
      &.selected {
        > .ring {
          stroke: #fdcc59;
          opacity: 0.3;
        }
      }
      &:hover {
        > .ring {
          stroke: #6ac6ff;
          opacity: 0.3;
        }
      }
    }
    .relationship {
      > text {
        fill: ${(props) => props.theme.primaryText};
      }
      > .overlay {
        opacity: 0;
        fill: #6ac6ff;
      }
      &.selected {
        > .overlay {
          fill: #fdcc59;
          opacity: 0.3;
        }
      }
      &:hover {
        > .overlay {
          fill: #6ac6ff;
          opacity: 0.3;
        }
      }
    }
    .remove_node {
      .expand_node {
        &:hover {
          border: 2px #000 solid;
        }
      }
    }
    .outline {
      cursor: pointer;
    }
    path {
      &.context-menu-item {
        stroke-width: 2px;
        fill: slategrey; // ${(props) => props.theme.primaryBackground};
      }
    }
    text {
      line-height: normal;
      &.context-menu-item {
        fill: #fff;
        text-anchor: middle;
        pointer-events: none;
        font-size: 14px;
      }
    }
    .context-menu-item {
      cursor: pointer;
      &:hover {
        fill: #b9b9b9;
        font-size: 14px;
      }
    }
  }
`;

export const p = styled.div`
  margin-top: ${pMarginTop}px;
  font-size: 12px;
  width: 100%;
  white-space: normal;
`;

export const StyledInspectorFooterRowListKey = styled.div`
  float: left;
  font-weight: 800;
`;

export const StyledInspectorFooterRowListValue = styled.div`
  padding-left: 3px;
  overflow: hidden;
  float: left;
  white-space: pre-wrap;
`;

export const StyledInlineList = styled.ul`
  padding-left: 0;
  list-style: none;
  word-break: break-word;
`;

export const StyledInlineListItem = styled.li`
  display: inline-block;
  padding-right: 5px;
  padding-left: 5px;
`;

export const StyledStatusBar: any = styled.div`
  width: 95%;
  //min-height: 39px;
  line-height: 39px;
  color: ${(props) => props.theme.secondaryText};
  background-color: #fafbfd; // theme
  font-size: 13px;
  position: absolute;
  bottom: 0;
  left: 0;
`;

export const StyledInspectorFooterRowListPair = styled(StyledInlineListItem)`
  vertical-align: middle;
  font-size: 13px;
`;

export const StyledToken = styled(StyledInlineListItem)`
  display: inline-block;
  font-weight: bold;
  line-height: 1em;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  user-select: none;
  font-size: 12px;
  margin-right: 5px;
  cursor: pointer;
`;
export const StyledLabelToken = styled(StyledToken)`
  padding: 4px 7px 4px 9px;
  border-radius: 20px;
`;
export const StyledTokenRelationshipType = styled(StyledToken)`
  padding: 4px 7px 4px 5px;
  border-radius: 3px;
`;

export const StyledTokenContextMenuKey = styled(StyledLabelToken)`
  color: #f9fbfd;
  background-color: #d2d5da;
  padding: 4px 9px;
`;

export const StyledTokenCount = styled.span`
  font-weight: normal;
`;

export const StyledLegend = styled.div`
  background-color: #fafbfd; // ${(props) => props.theme.secondaryBackground};
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
`;

export const StyledLegendInlineListItem = styled(StyledInlineListItem)`
  margin-bottom: 3px;
`;
export const StyledPickerListItem = styled(StyledInlineListItem)`
  padding-right: 5px;
  padding-left: 0;
  vertical-align: middle;
  line-height: 0;
`;

export const StyledPickerSelector = styled.a`
  background-color: #aaa;
  display: inline-block;
  height: 12px;
  width: 12px;
  margin-top: 1px;
  line-height: 0;
  cursor: pointer;
  opacity: 0.4;
  &:hover {
    opacity: 1;
  }
  &.active {
    opacity: 1;
  }
`;
export const StyledCircleSelector = styled(StyledPickerSelector)`
  border-radius: 50%;
`;
export const StyledCaptionSelector = styled.a`
  cursor: pointer;
  user-select: none;
  display: inline-block;
  padding: 1px 6px;
  font-size: 12px;
  line-height: 1em;
  color: #9195a0;
  border: 1px solid #9195a0;
  overflow: hidden;
  border-radius: 0.25em;
  margin-right: 0;
  font-weight: bold;
  &:hover {
    border-color: #aaa;
    color: #aaa;
    text-decoration: none;
  }
  &.active {
    color: white;
    background-color: #9195a0;
  }
`;

export const StyledInspectorFooterStatusMessage = styled.div`
  font-weight: bold;
`;

export const ZoomMenuWrapper = styled.div`
  position: absolute;
  z-index: 1;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
`;
