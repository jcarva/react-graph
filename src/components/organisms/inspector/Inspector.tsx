import React, { Component } from "react";
// @ts-ignore
import { optionalToString, numberToUSLocale } from "../../utils/utils";
// @ts-ignore
import SVGInline from "react-svg-inline";
import {
  StyledInspectorFooterStatusMessage,
  StyledTokenContextMenuKey,
  StyledTokenRelationshipType,
  StyledLabelToken,
  StyledStatusBar,
  StyledInspectorFooterRowListPair,
  StyledInspectorFooterRowListKey,
  StyledInspectorFooterRowListValue,
  StyledInlineList,
  StyledTruncatedMessage,
} from "../styled";
import { GraphStyleEditor } from "./GraphStyleEditor";
import ClickableUrls from "./ClickableUrls";

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
    const graphStyleForLabel = graphStyle.forNode({ labels: [label] });
    const style = {
      backgroundColor: graphStyleForLabel.get("color"),
      color: graphStyleForLabel.get("text-color-internal"),
    };
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

export class InspectorComponent extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      graphStyle: props.graphStyle,
    };
  }

  render() {
    let item;
    let type;
    let inspectorContent;

    if (this.props.hoveredItem && this.props.hoveredItem.type !== "canvas") {
      item = this.props.hoveredItem.item;
      type = this.props.hoveredItem.type;
    } else if (this.props.selectedItem) {
      item = this.props.selectedItem.item;
      type = this.props.selectedItem.type;
    } else if (this.props.hoveredItem) {
      // Canvas
      item = this.props.hoveredItem.item;
      type = this.props.hoveredItem.type;
    }
    if (item && type) {
      if (type === "legend-item" && this.props.hasLegends) {
        // TODO: Use an ispector of colors to pick one
        inspectorContent = (
          <GraphStyleEditor
            selectedLabel={item.selectedLabel}
            selectedRelType={item.selectedRelType}
            update={this.props.updateStyle}
            graphStyle={this.props.graphStyle}
          />
        );
      }

      if (this.props.hasInspector) {
        if (type === "status-item") {
          inspectorContent = (
            <StyledInspectorFooterStatusMessage className="value">
              {item}
            </StyledInspectorFooterStatusMessage>
          );
        }
        if (type === "context-menu-item") {
          inspectorContent = (
            <StyledInlineList className="list-inline">
              <StyledTokenContextMenuKey
                key="token"
                className={
                  "token" + " " + "token-context-menu-key" + " " + "token-label"
                }
              >
                <SVGInline svg={item.label} width="12px" />
              </StyledTokenContextMenuKey>
              <StyledInspectorFooterRowListPair key="pair" className="pair">
                <StyledInspectorFooterRowListValue className="value">
                  {item.content}
                </StyledInspectorFooterRowListValue>
              </StyledInspectorFooterRowListPair>
            </StyledInlineList>
          );
        } else if (type === "canvas") {
          const description = `Displaying ${numberToUSLocale(
            item.nodeCount
          )} nodes, ${numberToUSLocale(item.relationshipCount)} relationships.`;
          inspectorContent = (
            <StyledInlineList className="list-inline">
              <StyledInspectorFooterRowListPair className="pair" key="pair">
                <StyledInspectorFooterRowListValue className="value">
                  {this.props.hasTruncatedFields && (
                    <StyledTruncatedMessage>
                      Record fields have been truncated.&nbsp;
                    </StyledTruncatedMessage>
                  )}
                  {description}
                </StyledInspectorFooterRowListValue>
              </StyledInspectorFooterRowListPair>
            </StyledInlineList>
          );
        } else if (type === "node") {
          inspectorContent = (
            <StyledInlineList className="list-inline">
              {mapLabels(this.state.graphStyle, item.labels)}
              <StyledInspectorFooterRowListPair key="pair" className="pair">
                <StyledInspectorFooterRowListKey className="key">
                  {"<id>:"}
                </StyledInspectorFooterRowListKey>
                <StyledInspectorFooterRowListValue className="value">
                  {item.id}
                </StyledInspectorFooterRowListValue>
              </StyledInspectorFooterRowListPair>
              {mapItemProperties(item.properties)}
            </StyledInlineList>
          );
        } else if (type === "relationship") {
          const style = {
            backgroundColor: this.state.graphStyle
              .forRelationship(item)
              .get("color"),
            color: this.state.graphStyle
              .forRelationship(item)
              .get("text-color-internal"),
          };
          inspectorContent = (
            <StyledInlineList className="list-inline">
              <StyledTokenRelationshipType
                key="token"
                style={style}
                className={"token" + " " + "token-relationship-type"}
              >
                {item.type}
              </StyledTokenRelationshipType>
              <StyledInspectorFooterRowListPair key="pair" className="pair">
                <StyledInspectorFooterRowListKey className="key">
                  {"<id>:"}
                </StyledInspectorFooterRowListKey>
                <StyledInspectorFooterRowListValue className="value">
                  {item.id}
                </StyledInspectorFooterRowListValue>
              </StyledInspectorFooterRowListPair>
              {mapItemProperties(item.properties)}
            </StyledInlineList>
          );
        }
      }
    }

    // FIXME: Improve all the hasInspector and hasLegends logic
    if (
      !this.props.hasInspector &&
      this.props.hasLegends &&
      this.props.selectedItem &&
      this.props.selectedItem.item
    ) {
      inspectorContent = (
        <GraphStyleEditor
          selectedLabel={this.props.selectedItem.item.selectedLabel}
          selectedRelType={this.props.selectedItem.item.selectedRelType}
          update={this.props.updateStyle}
          graphStyle={this.props.graphStyle}
        />
      );
    }

    if (!this.props.hasInspector && !this.props.hasLegends) {
      inspectorContent = null;
    }

    return (
      <StyledStatusBar className="status-bar">
        <div className="status">{inspectorContent}</div>
      </StyledStatusBar>
    );
  }
}
