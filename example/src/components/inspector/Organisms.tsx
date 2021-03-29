import React from "react";
import styled from "styled-components";
import SVGInline from "react-svg-inline";
import ClickableUrls from "./ClickableUrls";
import { numberToUSLocale, optionalToString } from "./utils";

export const StyledTruncatedMessage = styled.span`
  color: orange;
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
  margin: 0;
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
  padding-top: 4px;
  overflow: scroll;
  box-sizing: border-box;
  position: relative;
  line-height: 40px;
  color: ${(props) => props.theme.secondaryText};
  font-size: 13px;
  width: 100%;
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

export const StyledInspectorFooterStatusMessage = styled.div`
  font-weight: bold;
`;

export const StatusItem = (props: any) => (
  <StyledInspectorFooterStatusMessage className="value">
    {props.item}
  </StyledInspectorFooterStatusMessage>
);

export const ContextMenuItem = (props: any) => (
  <StyledInlineList className="list-inline">
    <StyledTokenContextMenuKey
      key="token"
      className={
        "token" + " " + "token-context-menu-key" + " " + "token-label"
      }
    >
      <SVGInline svg={props.item && props.item.label} width="12px" />
    </StyledTokenContextMenuKey>
    <StyledInspectorFooterRowListPair key="pair" className="pair">
      <StyledInspectorFooterRowListValue className="value">
        {props.item && props.item.content}
      </StyledInspectorFooterRowListValue>
    </StyledInspectorFooterRowListPair>
  </StyledInlineList>
);

export const CanvasItem = (props: any) => {
  const description = `Displaying ${numberToUSLocale(
    props.item.nodeCount
  )} nodes, ${numberToUSLocale(props.item.relationshipCount)} relationships.`;
  return(
    <StyledInlineList className="list-inline">
      <StyledInspectorFooterRowListPair className="pair" key="pair">
        <StyledInspectorFooterRowListValue className="value">
          {props.hasTruncatedFields && (
            <StyledTruncatedMessage>
              Record fields have been truncated.&nbsp;
            </StyledTruncatedMessage>
          )}
          {description}
        </StyledInspectorFooterRowListValue>
      </StyledInspectorFooterRowListPair>
    </StyledInlineList>
  )
};

export const NodeItem = (props: any) => (
  <StyledInlineList className="list-inline">
    {mapLabels(props.graphStyle, props.item.labels)}
    <StyledInspectorFooterRowListPair key="pair" className="pair">
      <StyledInspectorFooterRowListKey className="key">
        {"<id>:"}
      </StyledInspectorFooterRowListKey>
      <StyledInspectorFooterRowListValue className="value">
        {props.item.id}
      </StyledInspectorFooterRowListValue>
    </StyledInspectorFooterRowListPair>
    {mapItemProperties(props.item.properties)}
  </StyledInlineList>
);

export const RelationshipItem = (props: any) => (
  <StyledInlineList className="list-inline">
    <StyledTokenRelationshipType
      key="token"
      style={props.graphStyle.relationships[props.item.type]}
      className={"token" + " " + "token-relationship-type"}
    >
      {props.item.type}
    </StyledTokenRelationshipType>
    <StyledInspectorFooterRowListPair key="pair" className="pair">
      <StyledInspectorFooterRowListKey className="key">
        {"<id>:"}
      </StyledInspectorFooterRowListKey>
      <StyledInspectorFooterRowListValue className="value">
        {props.item.id}
      </StyledInspectorFooterRowListValue>
    </StyledInspectorFooterRowListPair>
    {mapItemProperties(props.item.properties)}
  </StyledInlineList>
);

const mapItemProperties = (itemProperties: any) =>
  itemProperties
    .sort(({ key: keyA }: any, { key: keyB }: any) =>
      keyA < keyB ? -1 : keyA === keyB ? 0 : 1
    )
    .map((prop: any, i: any) => (
      <StyledInspectorFooterRowListPair className="pair" key={"prop" + i}>
        <StyledInspectorFooterRowListKey className="key">
          {prop.key + ": "}
        </StyledInspectorFooterRowListKey>
        <StyledInspectorFooterRowListValue className="value">
          <ClickableUrls text={optionalToString(prop.value)} />
        </StyledInspectorFooterRowListValue>
      </StyledInspectorFooterRowListPair>
    ));

const mapLabels = (graphStyle: any, itemLabels: any) => {
  return itemLabels.map((label: any, i: any) => {
    const style = graphStyle.nodes[label];
    return (
      <StyledLabelToken
        key={"label" + i}
        style={style}
        className={"token" + " " + "token-label"}
      >
        {label}
      </StyledLabelToken>
    );
  });
};
