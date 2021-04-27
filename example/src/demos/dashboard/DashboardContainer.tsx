import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dashboard } from "./Dashboard";
import { nodes, relationships } from "../../assets/mocks/random";

const nodesUrl = `${process.env.REACT_APP_GRAPH_API_URL}/${process.env.REACT_APP_GRAPH_API_NODES_PATH}`;
const relationshipssUrl = `${process.env.REACT_APP_GRAPH_API_URL}/${process.env.REACT_APP_GRAPH_API_RELATIONSHIPS_PATH}`;

const DashboardContainer = () => {
  const [grapshState, setgrapshState] = useState({
    nodes: [],
    relationships: [],
  });

  useEffect(() => {
    axios
      .get(nodesUrl)
      .then(({ data: nodesData }) => {
        // TODO: Move to utils
        axios
          .get(relationshipssUrl)
          .then(({ data: relationshipsData }) => {
            // TODO: Move to outside
            const nodesIdMap = {};
            nodesData.forEach((node: any) => {
              // @ts-ignore
              nodesIdMap[node.id] = node;
            });

            const filteredRelationships = relationshipsData.filter(
              (relationship: any) =>
                // @ts-ignore
                nodesIdMap[relationship.startNodeId] &&
                // @ts-ignore
                nodesIdMap[relationship.endNodeId]
            );

            // @ts-ignore
            setgrapshState({
              nodes: nodesData,
              relationships: filteredRelationships,
            });
          })
          // eslint-disable-next-line no-console
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
        // @ts-ignore
        setgrapshState({ nodes, relationships });
      });
  }, []);

  return (
    <Dashboard
      nodes={grapshState.nodes}
      relationships={grapshState.relationships}
    />
  );
};

export { DashboardContainer };
