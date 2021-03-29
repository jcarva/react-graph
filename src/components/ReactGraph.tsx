import React, { useState, useEffect } from "react";
import deepmerge from "deepmerge";
import styled from "styled-components";
import { LegendComponent } from "./organisms/legend/Legend";
import { GraphContainer } from "./GraphContainer";
import { InspectorComponent } from "./organisms/inspector/Inspector";
import neoGraphStyle, {
  createNodeStyleGetter,
  createRelationshipStyleGetter,
} from "./utils/graphStyle";

const ReactGraphWrapper = styled.div`
  display: flex;
  width: ${(props: any) =>
    props.width || "500px"}; // TODO: Use types default value
  height: ${(props: any) =>
    props.height || "500px"}; // TODO: Use types default value
  justify-content: center;
  position: relative;
  text-align: center;
`;

const ReactGraph = (props: any) => {
  const [graphStyle, setGraphStyle] = useState(neoGraphStyle());
  const [styleVersion, setStyleVersion] = useState(0);
  const [selectedItem, setSelectedItem] = useState({});
  const [hoveredItem, setHoveredItem] = useState({});
  const [stats, setStats] = useState({ labels: {}, relTypes: {} });

  useEffect(() => {
    if (props.onStyleVersionChange) props.onStyleVersionChange(styleVersion); // TODO: Use types default value
    if (props.onStyleChange) props.onStyleChange(getStyles()); // TODO: Use types default value
  }, []);

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
      <GraphContainer
        hasTruncatedFields={props.hasTruncatedFields}
        initialState={props.initialState}
        graphStyle={graphStyle}
        styleVersion={styleVersion}
        nodes={props.nodes}
        relationships={props.relationships}
        fullscreen={false}
        setGraph={props.setGraph}
        onGraphModelChange={setStats}
        onItemMouseOver={setHoveredItem}
        onItemSelect={setSelectedItem}
        addedNodes={props.addedNodes}
        zoomMenu={props.zoomMenu}
      />
      {(props.hasInspector || props.hasLegends) && (
        <InspectorComponent
          hasTruncatedFields={props.hasTruncatedFields}
          hoveredItem={hoveredItem}
          selectedItem={selectedItem}
          graphStyle={graphStyle}
          updateStyle={updateStyle}
          hasInspector={props.hasInspector}
          hasLegends={props.hasLegends}
        />
      )}
    </ReactGraphWrapper>
  );
};

export { ReactGraph };

// MATCH (n:api {name: "AMfB ACS Main"}) RETURN n | get an specific node my name
// MATCH (n)-[r]->(m) RETURN n,r,m  | get all node which has edges along with their properties
// MATCH (n) WHERE NOT (n)--() RETURN n | get nodes without edges
