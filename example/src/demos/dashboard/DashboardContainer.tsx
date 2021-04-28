import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dashboard } from "./Dashboard";
import { nodes, relationships } from "../../assets/mocks/random";

const nodesUrl = `${process.env.REACT_APP_GRAPH_API_URL}/${process.env.REACT_APP_GRAPH_API_NODES_PATH}`;
const relationshipssUrl = `${process.env.REACT_APP_GRAPH_API_URL}/${process.env.REACT_APP_GRAPH_API_RELATIONSHIPS_PATH}`;

const DashboardContainer = () => {
  const [graphState, setGraphState] = useState({
    nodes: [],
    nodesIdMap: {},
    relationships: [],
  });

  useEffect(() => {
    axios
      .get(nodesUrl)
      // @ts-ignore
      .then(({ data: nodesData }) => {
        axios
          .get(relationshipssUrl)
          // @ts-ignore
          .then(({ data: relationshipsData }) => {
            // @ts-ignore
            setGraphState(graphDataFilter(nodesData, relationshipsData));
          })
          // eslint-disable-next-line no-console
          .catch((err: any) => console.log(err));
      })
      .catch((err: any) => {
        // @ts-ignore
        setGraphState(graphDataFilter(nodes, relationships));
        console.log(err);
      });
  }, []);

  const graphDataFilter = (nodes: any[], relationships: any[]) => {
    const filteredNodes = nodes.filter(
      (node: any) => node.id && node.properties && node.properties.name
    );

    const nodesIdMap = {};
    filteredNodes.forEach((node: any) => {
      // @ts-ignore
      nodesIdMap[node.id] = node;
    });

    const filteredRelationships = relationships.filter(
      (relationship: any) =>
        // @ts-ignore
        nodesIdMap[relationship.startNodeId] &&
        // @ts-ignore
        nodesIdMap[relationship.endNodeId]
    );

    return {
      nodes: filteredNodes,
      nodesIdMap,
      relationships: filteredRelationships,
    };
  };

  return (
    <Dashboard
      nodes={graphState.nodes}
      nodesIdMap={graphState.nodesIdMap}
      relationships={graphState.relationships}
    />
  );
};

export { DashboardContainer };
