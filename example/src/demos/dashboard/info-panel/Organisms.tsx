import React from "react";
import styled from "styled-components";
import SVGInline from "react-svg-inline";
import ClickableUrls from "./ClickableUrls";
import { numberToUSLocale, optionalToString } from "./utils";

export const InfoPanelHandle = () => (
  <HandleWrapper>
    <p style={{ margin: "0 8px", fontWeight: "bold" }}>Inspector:</p>
  </HandleWrapper>
);

export const StatusItem = (props: any) => (
  <InspectorMessage className="value">{props.item}</InspectorMessage>
);

export const ContextMenuItem = (props: any) => (
  <InlineList className="list-inline">
    <NodeLabelContextMenuKey
      key="token"
      className={"token" + " " + "token-context-menu-key" + " " + "token-label"}
    >
      <SVGInline svg={props.item && props.item.label} width="12px" />
    </NodeLabelContextMenuKey>
    <InspectorDataPair key="pair" className="pair">
      <InspectorDataValue className="value">
        {props.item && props.item.content}
      </InspectorDataValue>
    </InspectorDataPair>
  </InlineList>
);

export const CanvasItem = (props: any) => {
  const description = `Displaying ${numberToUSLocale(
    props.item.nodeCount
  )} nodes, ${numberToUSLocale(props.item.relationshipCount)} relationships.`;
  return (
    <InlineList className="list-inline">
      <InspectorDataPair className="pair" key="pair">
        <InspectorDataValue className="value">
          {props.hasTruncatedFields && (
            <TruncatedMessage>
              Record fields have been truncated.&nbsp;
            </TruncatedMessage>
          )}
          {description}
        </InspectorDataValue>
      </InspectorDataPair>
    </InlineList>
  );
};

export const NodeItem = (props: any) => (
  <InlineList className="list-inline">
    {mapLabels(props.graphStyle, props.item.labels)}
    <InspectorDataPair key="pair" className="pair">
      <InspectorDataKey className="key">{"<id>:"}</InspectorDataKey>
      <InspectorDataValue className="value">{props.item.id}</InspectorDataValue>
    </InspectorDataPair>
    {mapItemProperties(props.item.properties)}
  </InlineList>
);

export const RelationshipItem = (props: any) => (
  <InlineList className="list-inline">
    <RelationshipLabel
      key="token"
      style={props.graphStyle.relationships[props.item.type]}
      className={"token" + " " + "token-relationship-type"}
    >
      {props.item.type}
    </RelationshipLabel>
    <InspectorDataPair key="pair" className="pair">
      <InspectorDataKey className="key">{"<id>:"}</InspectorDataKey>
      <InspectorDataValue className="value">{props.item.id}</InspectorDataValue>
    </InspectorDataPair>
    {mapItemProperties(props.item.properties)}
  </InlineList>
);

const mapItemProperties = (itemProperties: any) =>
  itemProperties
    .sort(({ key: keyA }: any, { key: keyB }: any) =>
      keyA < keyB ? -1 : keyA === keyB ? 0 : 1
    )
    .map((prop: any, i: any) => (
      <InspectorDataPair className="pair" key={"prop" + i}>
        <InspectorDataKey className="key">{prop.key + ": "}</InspectorDataKey>
        <InspectorDataValue className="value">
          <ClickableUrls text={optionalToString(prop.value)} />
        </InspectorDataValue>
      </InspectorDataPair>
    ));

const mapLabels = (graphStyle: any, itemLabels: any) => {
  return itemLabels.map((label: any, i: any) => (
    <NodeLabel
      key={"label" + i}
      style={graphStyle.nodes[label]}
      className={"token" + " " + "token-label"}
    >
      {label}
    </NodeLabel>
  ));
};

const HandleWrapper = styled.div`
  width: 100%;
  height: 28px;
  background-color: #708090;
  margin-top: 5px;
  padding-top: 2px;
  border-top: #465560 2px solid;
  box-sizing: border-box;
  color: white;
`;

export const StatusBar: any = styled.div`
  padding-top: 4px;
  overflow: scroll;
  box-sizing: border-box;
  position: relative;
  line-height: 40px;
  color: ${(props) => props.theme.secondaryText};
  font-size: 13px;
  width: 100%;
`;

export const InlineList = styled.ul`
  margin: 0;
  padding-left: 0;
  list-style: none;
  word-break: break-word;
`;

export const InlineListItem = styled.li`
  display: inline-block;
  padding-right: 5px;
  padding-left: 5px;
`;

export const InspectorDataPair = styled(InlineListItem)`
  vertical-align: middle;
  font-size: 13px;
`;

export const InspectorDataKey = styled.div`
  float: left;
  font-weight: 800;
`;

export const InspectorDataValue = styled.div`
  padding-left: 3px;
  overflow: hidden;
  float: left;
  white-space: pre-wrap;
`;

export const Label = styled(InlineListItem)`
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

export const NodeLabel = styled(Label)`
  padding: 4px 7px 4px 9px;
  border-radius: 20px;
`;

export const RelationshipLabel = styled(Label)`
  padding: 4px 7px 4px 5px;
  border-radius: 3px;
`;

export const NodeLabelContextMenuKey = styled(NodeLabel)`
  color: #f9fbfd;
  background-color: #d2d5da;
  padding: 4px 9px;
`;

export const TruncatedMessage = styled.span`
  color: orange;
`;

export const InspectorMessage = styled.div`
  font-weight: bold;
`;
