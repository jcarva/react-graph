import React from 'react';
import Demo from './Dashboard';
import { nodes, relationships} from './assets/mocks/random';
import './App.css';

const App = () => <Demo nodes={nodes} relationships={relationships}/>;

export default App;
