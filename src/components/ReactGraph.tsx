import React, { useState, useEffect } from "react";
import deepmerge from "deepmerge";
import { LegendComponent } from "./organisms/legend/Legend";
import { GraphContainer } from "./GraphContainer";
import { InspectorComponent } from "./organisms/inspector/Inspector";
import neoGraphStyle, {
  createNodeStyleGetter,
  createRelationshipStyleGetter,
} from "./utils/graphStyle";

const ReactGraph = (props: any) => {
  const [graphStyle, setGraphStyle] = useState(neoGraphStyle());
  const [styleVersion, setStyleVersion] = useState(0);
  const [selectedItem, setSelectedItem] = useState({});
  const [hoveredItem, setHoveredItem] = useState({});
  const [stats, setStats] = useState({ labels: {}, relTypes: {} });

  useEffect(() => {
    props.getStyleVersion(styleVersion);
    props.nodeStyleGetter(createNodeStyleGetter(graphStyle));
    props.relationshipStyleGetter(createRelationshipStyleGetter(graphStyle));
  }, [styleVersion, graphStyle]);

  useEffect(() => {
    setSelectedItem({});
  }, [props.initialState.nodes]);

  useEffect(() => {
    props.onInspect({ hoveredItem, selectedItem });
  }, [hoveredItem, selectedItem]);

  useEffect(() => {
    props.onStatsChange(stats);
  }, [stats]);

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
    <div
      style={{
        display: "flex",
        width: props.width || "100%",
        height: props.height || "100%",
        justifyContent: "center",
        position: "relative",
        textAlign: "center",
      }}
    >
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
    </div>
  );
};

export { ReactGraph };

// MATCH (n:api {name: "AMfB ACS Main"}) RETURN n | get an specific node my name
// MATCH (n)-[r]->(m) RETURN n,r,m  | get all node which has edges along with their properties
// MATCH (n) WHERE NOT (n)--() RETURN n | get nodes without edges
