import React, { Component } from "react";
import {
  StyledTokenRelationshipType,
  StyledLegendInlineListItem,
  StyledLegend,
  StyledLabelToken,
  StyledTokenCount,
} from "../styled";
import { numberToUSLocale } from "../../utils/utils";
import styled from "styled-components";

const StyledLegendList = styled.div`
  padding-top: 15px;
  padding-bottom: 5px;
`;

export class LegendComponent extends Component<any, any> {
  labelRowELem: any;
  typeRowElem: any;
  constructor(props: {}) {
    super(props);
    this.state = {
      typeRowContracted: true,
      labelRowContracted: true,
    };
    this.typeRowElem = null;
    this.labelRowELem = null;
  }

  setTypeRowELem(elem: any) {
    if (elem) {
      this.typeRowElem = elem;
    }
  }

  setLabelRowELem(elem: any) {
    if (elem) {
      this.labelRowELem = elem;
    }
  }

  render() {
    const mapLabels = (labels: any) => {
      const labelList = Object.keys(labels).map((legendItemKey, i) => {
        const styleForItem = this.props.graphStyle.forNode({
          labels: [legendItemKey],
        });
        const onClick = () => {
          this.props.onSelectedLabel(
            legendItemKey,
            Object.keys(labels[legendItemKey].properties)
          );
        };
        const style = {
          backgroundColor: styleForItem.get("color"),
          color: styleForItem.get("text-color-internal"),
        };
        return (
          <StyledLegendInlineListItem key={i} data-testid="viz-legend-labels">
            <StyledLabelToken
              onClick={onClick}
              style={style}
              className="token token-label"
            >
              {legendItemKey}
              <StyledTokenCount className="count">{`(${numberToUSLocale(
                labels[legendItemKey].count
              )})`}</StyledTokenCount>
            </StyledLabelToken>
          </StyledLegendInlineListItem>
        );
      });

      return (
        <div className={this.state.labelRowContracted ? "contracted" : ""}>
          <div className="list-inline" ref={this.setLabelRowELem.bind(this)}>
            {labelList}
          </div>
        </div>
      );
    };

    const mapRelTypes = (legendItems: any) => {
      if (!legendItems || !Object.keys(legendItems).length) {
        return null;
      }
      const relTypeList = Object.keys(legendItems).map((legendItemKey, i) => {
        const styleForItem = this.props.graphStyle.forRelationship({
          type: legendItemKey,
        });
        const onClick = () => {
          this.props.onSelectedRelType(
            legendItemKey,
            Object.keys(legendItems[legendItemKey].properties)
          );
        };
        const style = {
          backgroundColor: styleForItem.get("color"),
          color: styleForItem.get("text-color-internal"),
        };

        return (
          <StyledLegendInlineListItem key={i}>
            <StyledTokenRelationshipType
              onClick={onClick}
              style={style}
              className="token token-relationship-type"
            >
              {legendItemKey}
              <StyledTokenCount className="count">
                {`(${numberToUSLocale(legendItems[legendItemKey].count)})`}
              </StyledTokenCount>
            </StyledTokenRelationshipType>
          </StyledLegendInlineListItem>
        );
      });

      return (
        <div className={this.state.typeRowContracted ? "contracted" : ""}>
          <div className="list-inline" ref={this.setTypeRowELem.bind(this)}>
            {relTypeList}
          </div>
        </div>
      );
    };

    return (
      <StyledLegend>
        <StyledLegendList>
          {mapLabels(this.props.stats.labels)}
        </StyledLegendList>
        {mapRelTypes(this.props.stats.relTypes)}
      </StyledLegend>
    );
  }
}
