import React from "react";
import { Dashboard, Minimalist } from "./demos";

const App = ({ minimalist }: { minimalist?: boolean }) =>
  minimalist ? <Minimalist /> : <Dashboard />;

export default App;
