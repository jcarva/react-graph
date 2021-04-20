import React from "react";
import { Dashboard, Minimalist } from "./demos";
import { root, nodes, relationships } from "./assets/mocks/random";

const App = (props: { minimalist?: any }) =>
  props.minimalist ? (
    <Minimalist root={root} nodes={nodes} relationships={relationships} />
  ) : (
    <Dashboard nodes={nodes} relationships={relationships} />
  );

export default App;
