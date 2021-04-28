import React, { useState, useEffect } from "react";
import deepmerge from "deepmerge";
import {
  initGraphStyle,
  createNodeStyleGetter,
  createRelationshipStyleGetter,
} from "./utils/graphStyle";
import { ReactGraphWrapper } from "./organisms/styled";
import { LegendComponent } from "./organisms/legend/Legend";
import { Graph } from "./Graph";
import { InspectorComponent } from "./organisms/inspector/Inspector";

const ReactGraph = (props: any) => {
  const [graphStyle, setGraphStyle] = useState(initGraphStyle());
  const [styleVersion, setStyleVersion] = useState(0);
  const [selectedItem, setSelectedItem] = useState({});
  const [hoveredItem, setHoveredItem] = useState({});
  const [stats, setStats] = useState({ labels: {}, relTypes: {} });

  useEffect(() => {
    if (props.onStyleVersionChange) props.onStyleVersionChange(styleVersion); // TODO: Use types default value
    if (props.onStyleChange) props.onStyleChange(getStyles()); // TODO: Use types default value
  }, [props.nodes, props.relationships]);

  useEffect(() => {
    if (props.onStyleVersionChange) props.onStyleVersionChange(styleVersion); // TODO: Use types default value
    if (props.onStyleChange) props.onStyleChange(getStyles()); // TODO: Use types default value
  }, [styleVersion, graphStyle]);

  useEffect(() => {
    if (props.onInspect) props.onInspect({ hoveredItem, selectedItem }); // TODO: Use types default value
  }, [hoveredItem, selectedItem]);

  useEffect(() => {
    if (props.onStatsChange) props.onStatsChange(stats); // TODO: Use types default value
  }, [stats]);

  useEffect(() => {
    setSelectedItem({});
  }, [props.initialState.nodes]);

  const getStyles = () => {
    // TODO: Check if 'labels'
    const nodes = {};
    props.nodes.map((node: any) => {
      node.labels.map((label: string) => {
        nodes[label] = createNodeStyleGetter(graphStyle)(label);
      });
    });

    // TODO: Check if 'type'
    const relationships = {};
    props.relationships.map((relationship: any) => {
      relationships[relationship.type] = createRelationshipStyleGetter(
        graphStyle
      )(relationship.type);
    });

    return { nodes, relationships };
  };

  const onSelectedLabel = (label: any, propertyKeys: any) =>
    setSelectedItem({
      type: "legend-item",
      item: {
        selectedLabel: { label: label, propertyKeys: propertyKeys },
        selectedRelType: null,
      },
    });

  const onSelectedRelType = (relType: any, propertyKeys: any) =>
    setSelectedItem({
      type: "legend-item",
      item: {
        selectedLabel: null,
        selectedRelType: { relType: relType, propertyKeys: propertyKeys },
      },
    });

  const updateStyle = (graphStyleData: any) => {
    graphStyle.loadRules(deepmerge(graphStyle.toSheet(), graphStyleData));
    setGraphStyle(graphStyle);
    setStyleVersion(styleVersion + 1);
  };

  return (
    // @ts-ignore
    <ReactGraphWrapper width={props.width} height={props.height}>
      {props.hasLegends && (
        <LegendComponent
          stats={stats}
          graphStyle={graphStyle}
          onSelectedLabel={onSelectedLabel}
          onSelectedRelType={onSelectedRelType}
        />
      )}
      <Graph
        initialNodes={props.initialState.nodes}
        initialRelationships={props.initialState.relationships}
        allNodes={props.nodes}
        allRelationships={props.relationships}
        addedNodes={props.addedNodes}
        onItemMouseOver={setHoveredItem}
        onItemSelect={setSelectedItem}
        graphStyle={graphStyle}
        styleVersion={styleVersion}
        onGraphModelChange={setStats}
        setGraph={props.setGraph}
        zoomMenu={props.zoomMenu}
      />
      {(props.hasInspector || props.hasLegends) && (
        <InspectorComponent
          hoveredItem={hoveredItem}
          selectedItem={selectedItem}
          graphStyle={graphStyle}
          updateStyle={updateStyle}
          hasInspector={props.hasInspector}
          hasLegends={props.hasLegends}
          hasTruncatedFields={props.hasTruncatedFields}
        />
      )}
    </ReactGraphWrapper>
  );
};

export { ReactGraph };
