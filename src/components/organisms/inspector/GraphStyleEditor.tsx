import React, { Component } from "react";
import neoGraphStyle from "../../utils/graphStyle";
import {
  StyledPickerSelector,
  StyledTokenRelationshipType,
  StyledInlineList,
  StyledInlineListItem,
  StyledLabelToken,
  StyledPickerListItem,
  StyledCircleSelector,
  StyledCaptionSelector,
} from "../styled";
import { toKeyString } from "../../utils/utils";

export class GraphStyleEditor extends Component<any> {
  update: ((a: any) => { a: any }) | undefined;
  graphStyleData = {};
  meta = {};
  graphStyle: any;
  nodeDisplaySizes: any;
  picker: any;
  widths: any;
  constructor(props: any) {
    super(props);
    this.graphStyle = neoGraphStyle();
    if (this.graphStyleData) {
      this.graphStyle.loadRules(this.graphStyleData);
    }
    this.nodeDisplaySizes = [];
    this.widths = [];
    for (let index = 0; index < 10; index++) {
      this.nodeDisplaySizes.push(`${12 + 2 * index}px`);
      this.widths.push(`${5 + 3 * index}px`);
    }
  }

  sizeLessThan(size1: any, size2: any) {
    const size1Numerical = size1 ? size1.replace("px", "") + 0 : 0;
    const size2Numerical = size1 ? size2.replace("px", "") + 0 : 0;
    return size1Numerical <= size2Numerical;
  }

  updateStyle(selector: any, styleProp: any) {
    this.graphStyle.changeForSelector(selector, styleProp);
    this.props.update(this.graphStyle.toSheet());
  }

  circleSelector(
    styleProps: any,
    styleProvider: any,
    activeProvider: any,
    className: any,
    selector: any,
    textProvider = (_: any) => {
      return "";
    }
  ) {
    return styleProps.map((styleProp: any, i: any) => {
      const onClick = () => {
        this.updateStyle(selector, styleProp);
      };
      const style = styleProvider(styleProp, i);
      const text = textProvider(styleProp);
      const active = activeProvider(styleProp);
      return (
        <StyledPickerListItem
          className={className}
          key={toKeyString("circle" + i)}
        >
          <StyledCircleSelector
            className={active ? "active" : ""}
            style={style}
            onClick={onClick}
          >
            {text}
          </StyledCircleSelector>
        </StyledPickerListItem>
      );
    });
  }

  colorPicker(selector: any, styleForLabel: any) {
    return (
      <StyledInlineListItem key="color-picker">
        <StyledInlineList className="color-picker picker">
          <StyledInlineListItem>Color:</StyledInlineListItem>
          {this.circleSelector(
            this.graphStyle.defaultColors(),
            (color: any) => {
              return { backgroundColor: color.color };
            },
            (color: any) => {
              return color.color === styleForLabel.get("color");
            },
            "color-picker-item",
            selector
          )}
        </StyledInlineList>
      </StyledInlineListItem>
    );
  }

  sizePicker(selector: any, styleForLabel: any) {
    return (
      <StyledInlineListItem key="size-picker">
        <StyledInlineList className="size-picker picker">
          <StyledInlineListItem>Size:</StyledInlineListItem>
          {this.circleSelector(
            this.graphStyle.defaultSizes(),
            (_size: any, index: any) => {
              return {
                width: this.nodeDisplaySizes[index],
                height: this.nodeDisplaySizes[index],
              };
            },
            (size: any) => {
              return this.sizeLessThan(
                size.diameter,
                styleForLabel.get("diameter")
              );
            },
            "size-picker-item",
            selector
          )}
        </StyledInlineList>
      </StyledInlineListItem>
    );
  }

  widthPicker(selector: any, styleForItem: any) {
    const widthSelectors = this.graphStyle
      .defaultArrayWidths()
      .map((widthValue: any, i: any) => {
        const onClick = () => {
          this.updateStyle(selector, widthValue);
        };
        const style = { width: this.widths[i] };
        const active =
          styleForItem.get("shaft-width") === widthValue["shaft-width"];
        return (
          <StyledPickerListItem
            className="width-picker-item"
            key={toKeyString("width" + i)}
          >
            <StyledPickerSelector
              className={active ? "active" : ""}
              style={style}
              onClick={onClick}
            />
          </StyledPickerListItem>
        );
      });
    return (
      <StyledInlineListItem key="width-picker">
        <StyledInlineList className="width-picker picker">
          <StyledInlineListItem>Line width:</StyledInlineListItem>
          {widthSelectors}
        </StyledInlineList>
      </StyledInlineListItem>
    );
  }

  iconPicker(selector: any) {
    return (
      <li key="icon-picker">
        Icon:
        <ul className="icon-picker picker">
          {this.picker(
            this.graphStyle.defaultIconCodes(),
            () => {
              return { fontFamily: "streamline" };
            },
            "icon-picker-item",
            selector,
            (iconCode: any) => {
              return iconCode["icon-code"];
            }
          )}
        </ul>
      </li>
    );
  }

  captionPicker(
    selector: any,
    styleForItem: any,
    propertyKeys: any,
    showTypeSelector = false
  ) {
    const captionSelector = (displayCaption: string, captionToSave: string) => {
      const onClick = () => {
        this.updateStyle(selector, { caption: captionToSave });
      };
      const active = styleForItem.props.caption === captionToSave;
      return (
        <StyledPickerListItem key={toKeyString("caption" + displayCaption)}>
          <StyledCaptionSelector
            className={active ? "active" : ""}
            onClick={onClick}
          >
            {displayCaption}
          </StyledCaptionSelector>
        </StyledPickerListItem>
      );
    };
    const captionSelectors = propertyKeys.map((propKey: any) => {
      return captionSelector(propKey, `{${propKey}}`);
    });
    let typeCaptionSelector = null;
    if (showTypeSelector) {
      typeCaptionSelector = captionSelector("<type>", "<type>");
    }
    return (
      <StyledInlineListItem key="caption-picker">
        <StyledInlineList className="caption-picker picker">
          <StyledInlineListItem>Caption:</StyledInlineListItem>
          {captionSelector("<id>", "<id>")}
          {typeCaptionSelector}
          {captionSelectors}
        </StyledInlineList>
      </StyledInlineListItem>
    );
  }

  stylePicker() {
    let pickers;
    let title;
    if (this.props.selectedLabel) {
      const labelList =
        this.props.selectedLabel.label !== "*"
          ? [this.props.selectedLabel.label]
          : [];
      const styleForLabel = this.graphStyle.forNode({ labels: labelList });
      const inlineStyle = {
        backgroundColor: styleForLabel.get("color"),
        color: styleForLabel.get("text-color-internal"),
      };
      pickers = [
        this.colorPicker(styleForLabel.selector, styleForLabel),
        this.sizePicker(styleForLabel.selector, styleForLabel),
        this.captionPicker(
          styleForLabel.selector,
          styleForLabel,
          this.props.selectedLabel.propertyKeys
        ),
      ];
      title = (
        <StyledLabelToken className="token token-label" style={inlineStyle}>
          {this.props.selectedLabel.label || "*"}
        </StyledLabelToken>
      );
    } else if (this.props.selectedRelType) {
      const relTypeSelector =
        this.props.selectedRelType.relType !== "*"
          ? { type: this.props.selectedRelType.relType }
          : {};
      const styleForRelType = this.graphStyle.forRelationship(relTypeSelector);
      const inlineStyle = {
        backgroundColor: styleForRelType.get("color"),
        color: styleForRelType.get("text-color-internal"),
      };
      pickers = [
        this.colorPicker(styleForRelType.selector, styleForRelType),
        this.widthPicker(styleForRelType.selector, styleForRelType),
        this.captionPicker(
          styleForRelType.selector,
          styleForRelType,
          this.props.selectedRelType.propertyKeys,
          true
        ),
      ];
      title = (
        <StyledTokenRelationshipType
          className="token token-relationship"
          style={inlineStyle}
        >
          {this.props.selectedRelType.relType || "*"}
        </StyledTokenRelationshipType>
      );
    } else {
      return null;
    }
    return (
      <StyledInlineList className="style-picker">
        {title}
        {pickers}
      </StyledInlineList>
    );
  }

  componentDidUpdate(prevProps: any) {
    if (
      this.graphStyleData &&
      prevProps.graphStyleData !== this.graphStyleData
    ) {
      this.graphStyle.loadRules(this.graphStyleData);
    }
  }

  render() {
    return this.stylePicker();
  }
}
