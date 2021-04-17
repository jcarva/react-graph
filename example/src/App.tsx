import React from 'react';
import Dashboard from './Dashboard';
import Minimalist from './Minimalist';
import { root, nodes, relationships} from './assets/mocks/random';
import './App.css';

const App = (props: { minimalist?: any; }) => props.minimalist
  ? <Minimalist root={root} nodes={nodes} relationships={relationships}/>
  : <Dashboard nodes={nodes} relationships={relationships}/>;

export default App;
