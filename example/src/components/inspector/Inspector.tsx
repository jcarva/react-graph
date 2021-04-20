import React, { useState, useEffect } from "react";
// @ts-ignore
import {
  StatusBar,
  StatusItem,
  ContextMenuItem,
  CanvasItem,
  NodeItem,
  RelationshipItem,
} from "./Organisms";

const Inspector = (props: any) => {
  const [graphStyle, setGraphStyle] = useState(props.graphStyle);
  const [item, setItem] = useState({
    id: "",
    label: "",
    labels: "",
    content: {},
    nodeCount: 0,
    relationshipCount: 0,
    type: "",
    properties: null,
  });
  const [type, setType] = useState("");

  useEffect(() => {
    if (props.hoveredItem && props.hoveredItem.type !== "canvas") {
      setItem(props.hoveredItem.item);
      setType(props.hoveredItem.type);
    } else if (props.selectedItem) {
      setItem(props.selectedItem.item);
      setType(props.selectedItem.type);
    } else if (props.hoveredItem) {
      // Canvas
      setItem(props.hoveredItem.item);
      setType(props.hoveredItem.type);
    }
  }, [props.hoveredItem, props.selectedItem]);

  useEffect(() => {
    setGraphStyle(props.graphStyle);
  }, [props.graphStyle]);

  const renderInspectorContent = () => {
    if (item && type) {
      switch (type) {
        case "status-item":
          return <StatusItem item={item} />;
        case "context-menu-item":
          return <ContextMenuItem item={item} />;
        case "canvas":
          return (
            <CanvasItem
              item={item}
              hasTruncatedFields={props.hasTruncatedFields}
            />
          );
        case "node":
          return <NodeItem item={item} graphStyle={graphStyle} />;
        case "relationship":
          return <RelationshipItem item={item} graphStyle={graphStyle} />;
        default:
          return "Nothing to see here!!";
      }
    } else {
      return "Select an element to start.";
    }
  };

  return (
    <StatusBar className="status-bar">{renderInspectorContent()}</StatusBar>
  );
};

export { Inspector };
