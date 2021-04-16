# React-Graph

Render dynamic graphs based on d3 models.

[![NPM](https://img.shields.io/npm/v/react-graph.svg)](https://www.npmjs.com/package/react-graph) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
yarn add react-graph  --save
```

## Usage (Work In Progress)

```js
import ReactGraph from 'react-graph';

const Example = () => (
  <ReactGraph
    initialState={graphState}
    nodes={nodes}
    relationships={relationships}
    onInspect={setDataOnInspect}
    onStatsChange={setStats}
    onStyleVersionChange={setStyleVersion}
    onStyleChange={setStyles}
    addedNodes={addedNodes}
    setGraph={setGraph}
    hasTruncatedFields={true}
    hasLegends
    hasInspector
  />
)
```

## License

GPLv3 &#127279; [jcarva](https://github.com/jcarva/react-graph/LICENSE)
