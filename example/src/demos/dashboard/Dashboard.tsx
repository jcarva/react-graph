import React, { useMemo, useState } from "react";
import ReactGraph from "react-graph";
import { PageWrapper, ReactGraphWrapper } from "../common/Organisms";
import { SideBar } from "./sidebar/Sidebar";
import { SearchBar } from "./search-bar/SearchBar";
import { InfoPanel } from "./info-panel/InfoPanel";

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
    // TODO: Optimize deep comparison to big data
    [JSON.stringify(props.nodes)]
  );

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
    // TODO: Optimize deep comparison to big data
  }, [JSON.stringify(props.nodes)]);

  const relationshipsLabels = useMemo(() => {
    const labels = new Set();
    props.relationships.map((relationship: any) => {
      if (relationship.type) {
        labels.add(relationship.type);
      }
    });

    return Array.from(labels);
    // TODO: Optimize deep comparison to big data
  }, [JSON.stringify(props.relationships)]);

  const handleSelectChange = (selectedOption: any) => {
    let selectedNodes: any;

    if (selectedOption) {
      selectedNodes = selectedOption.map(
        // @ts-ignore
        (option: any) => props.nodesIdMap[option.value]
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
    const nodes = props.nodes.filter((node: any) => {
      const hasNodeAnyCheckedLabelList = stateChecked.filter(
        (checkLabel: any) => node.labels.includes(checkLabel)
      );

      return hasNodeAnyCheckedLabelList.length;
    });

    // @ts-ignore
    setGraphState({ nodes, relationships: [] });
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
      const relationships: any[] = [];
      props.relationships.map((relationship: any) => {
        // @ts-ignore
        if (checkedRelationshipsLabels.includes(relationship.type)) {
          // @ts-ignore
          nodes.push(props.nodesIdMap[relationship.startNodeId]);
          // @ts-ignore
          nodes.push(props.nodesIdMap[relationship.endNodeId]);
          relationships.push(relationship);
        }
      });
      // @ts-ignore
      setGraphState({ nodes: [...graphState.nodes, ...nodes], relationships });
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
              addedNodes={addedNodes}
              onInspect={setDataOnInspect}
              onStyleChange={setStyles}
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
