import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dashboard, Minimalist } from "./demos";
import { root, nodes, relationships } from "./assets/mocks/random";

const App = (props: { minimalist?: any }) =>
  props.minimalist ? (
    <Minimalist root={root} nodes={nodes} relationships={relationships} />
  ) : (
    <DashboardContainer />
  );

export default App;

// eslint-disable-next-line no-unused-vars
const DashboardContainer = () => {
  const [grapshS, setgrapshS] = useState({ nodes: [], relationships: [] });

  useEffect(() => {
    axios
      .get("http://localhost:8088/v3/crystals")
      .then(({ data: nodesData }) => {
        // TODO: Move to utils
        axios
          .get("http://localhost:8088/v3/crystals/relationships")
          .then(({ data: relationshipsData }) => {
            const nodesIdMap = {};
            nodesData.forEach((node: any) => {
              // @ts-ignore
              nodesIdMap[node.id] = node;
            });

            // eslint-disable-next-line no-unused-vars
            const filteredRelationships = relationshipsData.filter(
              (relationship: any) =>
                // @ts-ignore
                nodesIdMap[relationship.startNodeId] &&
                // @ts-ignore
                nodesIdMap[relationship.endNodeId]
            );

            // console.log({ filteredRelationships, nodesData });
            // @ts-ignore
            console.log({ nodes, relationships })
            // @ts-ignore
            setgrapshS({ nodes: nodesData, relationships: filteredRelationships });
          })
          // eslint-disable-next-line no-console
          .catch((err) => console.log(err));
      })
      // eslint-disable-next-line no-console
      .catch((err) => {
        console.log(err);
        // @ts-ignore
        setgrapshS({ nodes, relationships });
      });
  }, []);

  return (
    <Dashboard nodes={grapshS.nodes} relationships={grapshS.relationships} />
  );
};
