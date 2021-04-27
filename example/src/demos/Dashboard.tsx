import React, { useMemo, useState } from "react";
import ReactGraph from "react-graph";
import { PageWrapper } from "../components/common/Organisms";
import { SideBar } from "../components/sidebar/Sidebar";
import { SearchBar } from "../components/search-bar/SearchBar";
import { InfoPanel } from "../components/inspector/InfoPanel";
import styled from "styled-components";

export const ReactGraphWrapper = styled.div`
  box-sizing: border-box;
  height: 50vh;
  min-height: 92%;
  max-height: 100%;
`;

const Dashboard = (props: any) => {
  const [graphState, setGraphState] = useState({
    nodes: [],
    relationships: [],
  });
  const [addedNodes, setAddedNodes] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState(null);
  const [checkedNodesLabels, setCheckedNodesLabels] = useState([]);
  const [checkedRelationshipsLabels, setCheckedRelationshipsLabels] = useState(
    []
  );
  const [dataOnInspect, setDataOnInspect] = useState({
    hoveredItem: {},
    selectedItem: {},
  });
  const [styles, setStyles] = useState({ nodes: {}, relationships: {} });
  // eslint-disable-next-line no-unused-vars
  const [styleVersion, setStyleVersion] = useState(0);

  const nodesIdMap = useMemo(() => {
    const nodesMap = {};
    props.nodes.forEach((node: any) => {
      // @ts-ignore
      nodesMap[node.id] = node;
    });

    return nodesMap;
  }, [props.nodes]);

  const nodesLabels = useMemo(() => {
    const labels = new Set();
    props.nodes.map((node: any) => {
      if (node.labels) {
        node.labels.map((label: string) => {
          labels.add(label);
        });
      }
    });

    return Array.from(labels);
  }, [props.nodes]);

  const relationshipsLabels = useMemo(() => {
    const labels = new Set();
    props.relationships.map((relationship: any) => {
      if (relationship.type) {
        labels.add(relationship.type);
      }
    });

    return Array.from(labels);
  }, [props.relationships]);

  const selectOptions = useMemo(
    () =>
      props.nodes.map((node: { properties: { name: any }; id: any }) => {
        if (node.properties && node.properties.name) {
          return {
            label: node.properties.name,
            value: node.id,
          };
        }
      }),
    [props.nodes]
  );

  const handleSelectChange = (selectedOption: any) => {
    let selectedNodes: any;

    if (selectedOption) {
      selectedNodes = selectedOption.map(
        // @ts-ignore
        (option: any) => nodesIdMap[option.value]
      );
    }
    setSelectedOptions(selectedOption);
    setAddedNodes(selectedNodes);
  };

  const handleNodeLabelsCheckBoxChange = (event: any) => {
    const { value, checked } = event.target;
    let stateChecked = checkedNodesLabels;

    if (checked) {
      // @ts-ignore
      stateChecked.push(value);
    } else {
      stateChecked = stateChecked.filter((e: any) => e !== value);
    }

    // TODO: Improve filter to reduce time complexity
    const filteredNodes = props.nodes.filter((node: any) => {
      const hasNodeAnyCheckedLabelList = stateChecked.filter(
        (checkLabel: any) => node.labels.includes(checkLabel)
      );
      return hasNodeAnyCheckedLabelList.length;
    });

    // @ts-ignore
    setGraphState({ nodes: filteredNodes, relationships: [] });
    setCheckedNodesLabels(stateChecked);
    setCheckedRelationshipsLabels([]);
    setSelectedOptions(null);
    setAddedNodes([]);
  };

  const handleRelationshipsLabelsCheckBoxChange = (event: any) => {
    const { value, checked } = event.target;
    let stateChecked = checkedRelationshipsLabels;

    if (checked) {
      // @ts-ignore
      stateChecked.push(value);
      // @ts-ignore
      const nodes: any[] = [];
      const filteredRelationships: any[] = [];
      props.relationships.map((relationship: any) => {
        // @ts-ignore
        if (checkedRelationshipsLabels.includes(relationship.type)) {
          // @ts-ignore
          nodes.push(nodesIdMap[relationship.startNodeId]);
          // @ts-ignore
          nodes.push(nodesIdMap[relationship.endNodeId]);
          filteredRelationships.push(relationship);
        }
      });
      setGraphState({
        // @ts-ignore
        nodes: [...graphState.nodes, ...nodes],
        // @ts-ignore
        relationships: filteredRelationships,
      });
      setSelectedOptions(null);
      setAddedNodes([]);
    } else {
      stateChecked = stateChecked.filter((e: any) => e !== value);
      const relationships = graphState.relationships.filter(
        (relationship: any) => relationship.type !== value
      );
      setGraphState({ ...graphState, relationships });
      setSelectedOptions(null);
      setAddedNodes([]);
    }
    setCheckedRelationshipsLabels(stateChecked);
    setCheckedNodesLabels([]);
  };

  return (
    <PageWrapper>
      <div style={{ display: "flex", flex: 1 }}>
        <SideBar
          nodesLabels={nodesLabels}
          relationshipsLabels={relationshipsLabels}
          handleNodeLabelsCheckBoxChange={handleNodeLabelsCheckBoxChange}
          handleRelationshipsCheckBoxChange={
            handleRelationshipsLabelsCheckBoxChange
          }
          checkedNodesLabels={checkedNodesLabels}
          checkedRelationshipsLabels={checkedRelationshipsLabels}
          styles={styles}
        />
        <div style={{ flex: 1 }}>
          <SearchBar
            selectOptions={selectOptions}
            selectedOptions={selectedOptions}
            handleSelectChange={handleSelectChange}
          />
          <ReactGraphWrapper>
            <ReactGraph
              initialState={graphState}
              nodes={props.nodes}
              relationships={props.relationships}
              onInspect={setDataOnInspect}
              onStyleVersionChange={setStyleVersion}
              onStyleChange={setStyles}
              addedNodes={addedNodes}
              width="100%"
              height="100%"
              hasLegends
              hasTruncatedFields
            />
          </ReactGraphWrapper>
        </div>
      </div>
      <InfoPanel dataOnInspect={dataOnInspect} styles={styles} />
    </PageWrapper>
  );
};

export { Dashboard };
