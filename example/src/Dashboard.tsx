import React, {useEffect, useMemo, useState} from 'react';
import ReactGraph from 'react-graph';
import styled from "styled-components";
import {Sidebar, CollapsableSideBar} from './components/sidebar/Sidebar'
import {SearchBar} from './components/search-bar/SearchBar'
import {InspectorBar} from './components/inspector/InspectorBar'

const PageWrapper = styled.div`
  display: flex; 
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

const Dashboard = (props: any) => {
  const [nodes, setNodes] = useState(props.nodes);
  const [relationships, setRelationships] = useState(props.relationships);
  const [nodesIdMap, setNodesIdMap] = useState({});
  const [graph, setGraph] = useState(null);
  const [graphState, setGraphState] = useState({ nodes: [], relationships: [] });
  const [addedNodes, setAddedNodes] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState(null);
  const [checkedNodeLabels, setCheckedNodeLabels] = useState([]);
  const [checkedRelationshipsLabels, setCheckedRelationshipsLabels] = useState([]);
  const [stats, setStats] = useState({});
  const [dataOnInspect, setDataOnInspect] = useState({ hoveredItem: {}, selectedItem: {} });
  const [styleVersion, setStyleVersion] = useState(0);
  const [styles, setStyles] = useState({ nodes: {}, relationships: {} });

  const nodesLabel = useMemo(() => {
    let labels = new Set();
    props.nodes.map((node: any) => {
      if(node.labels) {
        node.labels.map((label: string) => {
          labels.add(label);
        })
      }
    });

    return Array.from(labels);
  }, [props.nodes]);

  const relationshipsLabel = useMemo(() => {
    let labels = new Set();
    props.relationships.map((relationship: any) => {
      if(relationship.type) {
        labels.add(relationship.type);
      }
    });

    return Array.from(labels);
  }, [props.relationships]);


  const selectOptions = useMemo(() =>
    props.nodes.map((node: { properties: { name: any; }; id: any; }) => {
       if (node.properties && node.properties.name) {
         return {
           label: node.properties.name,
           value: node.id
         };
       }
     }), [props.nodes]);

  useEffect(() => {
    let nodesMap = {};
    // @ts-ignore
    props.nodes.forEach((node: any) => { nodesMap[node.id] = node });
    setNodesIdMap(nodesMap);
    console.log({t: nodesMap})
  }, [props.nodes]);

  const handleSelectChange = (selectedOption: any) => {
    let selectedNodes: any;

    if(selectedOption) {
      // @ts-ignore
      selectedNodes = selectedOption.map((option: any) => nodesIdMap[option.value]);
    }
    setSelectedOptions(selectedOption);
    setAddedNodes(selectedNodes);
  };

  const handleNodeLabelsCheckBoxChange = (event: any) => {
    let { value, checked } = event.target;
    let stateChecked = checkedNodeLabels;

    if (checked) {
      // @ts-ignore
      stateChecked.push(value);
    } else {
      stateChecked = stateChecked.filter((e: any) => e !== value);
    }

    // TODO: Improve filter to reduce time complexity
    const filteredNodes = nodes.filter((node: any) => {
      const hasNodeAnyCheckedLabelList = stateChecked.filter((checkLabel: any) => node.labels.includes(checkLabel));
      return hasNodeAnyCheckedLabelList.length;
    });

    // @ts-ignore
    setGraphState({nodes: filteredNodes, relationships: []});
    setCheckedNodeLabels(stateChecked);
    setCheckedRelationshipsLabels([]);
    setSelectedOptions(null);
    setAddedNodes([]);
  };

  const handleRelationshipsLabelsCheckBoxChange = (event: any) => {
    let { value, checked } = event.target;
    let stateChecked = checkedRelationshipsLabels;

    if (checked) {
      // @ts-ignore
      stateChecked.push(value)
      // @ts-ignore
      let nodes: any[] = [];
      let filteredRelationships:  any[] = [];
      relationships.map((relationship: any) => {
        // @ts-ignore
        if(checkedRelationshipsLabels.includes(relationship.type)){
          // @ts-ignore
          nodes.push(nodesIdMap[relationship.startNodeId]);
          // @ts-ignore
          nodes.push(nodesIdMap[relationship.endNodeId]);
          filteredRelationships.push(relationship);
        }
      });
      // @ts-ignore
      setGraphState({ nodes: [...graphState.nodes, ...nodes], relationships: filteredRelationships });
      setSelectedOptions(null);
      setAddedNodes([]);
    } else {
      stateChecked = stateChecked.filter((e: any) => e !== value);
      const relationships = graphState.relationships.filter((relationship: any) => relationship.type !== value);
      setGraphState({...graphState, relationships});
      setSelectedOptions(null);
      setAddedNodes([]);
    }
    setCheckedRelationshipsLabels(stateChecked);
    setCheckedNodeLabels([]);
  };

  return (
    <PageWrapper>
      <div style={{display: "flex", flex: 1}}>
        <CollapsableSideBar
          nodesLabel={nodesLabel}
          relationshipsLabel={relationshipsLabel}
          handleNodeLabelsCheckBoxChange={handleNodeLabelsCheckBoxChange}
          handleRelationshipsCheckBoxChange={handleRelationshipsLabelsCheckBoxChange}
          checkedNodeLabels={checkedNodeLabels}
          checkedRelationshipsLabels={checkedRelationshipsLabels}
          styles={styles}
        />
        <div style={{ flex: 1, display: "flex",  flexDirection: "column"}}>
          <SearchBar
            selectOptions={selectOptions}
            selectedOptions={selectedOptions}
            handleSelectChange={handleSelectChange}
          />
          <div style={{ flex: 1, height: "50vh" }}>
            <ReactGraph
              initialState={graphState}
              nodes={nodes}
              relationships={relationships}
              setGraph={setGraph}
              hasTruncatedFields={true}
              hasLegends
              width={"100%"}
              height={"100%"}
              onInspect={setDataOnInspect}
              onStatsChange={setStats}
              onStyleVersionChange={setStyleVersion}
              onStyleChange={setStyles}
              addedNodes={addedNodes}
            />
          </div>
        </div>
      </div>
      <InspectorBar dataOnInspect={dataOnInspect} styles={styles} />
    </PageWrapper>
  )
};

export default Dashboard ;
