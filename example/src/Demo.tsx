import React, { Component } from 'react';
import { nodes as nodesMock, relationships as relationshipsMock} from './assets/mocks/movies';
import ReactGraph from 'react-graph';
import { Resizable } from "re-resizable";
import styled from "styled-components";
import Select from 'react-select';

const StyledSelect  = styled(Select)`
  width: 90%;
`;

const totalNodesHash = {}
// @ts-ignore
nodesMock.map((x: any) => { if(!totalNodesHash[x.id]) totalNodesHash[x.id] = x });

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0"
} as const;

const sidebarStyle = {
    display: "flex",
    justifyContent: "center",
    border: "solid 1px #ddd",
    background: "#f0f0f0",
    paddingTop: "60px"
} as const;

export class Visualization extends Component<any, any> {
  graph: any;
  selectOptions = nodesMock.map((node: { properties: { name: any; }; id: any; }) => {
    if(node.properties && node.properties.name){
        const nodeOptions = {
            label: node.properties.name,
            value: node.id
        };
        return nodeOptions;
    }
  });

  state: any = {
    nodes: [],
    relationships: [],
    selectedOption: null,
    options: this.selectOptions,
    addedNodes: [],
    checkedLabels: []
  };
  dataOnInspect: any;
  stats: any;
  nodeStyleGetter: any;
  relationshipStyleGetter: any;

  componentDidMount() {
    // @ts-ignore
    this.populateDataToStateFromProps({nodes: [], relationships: []});
  }

    populateDataToStateFromProps(props: any) {
    this.setState({
      nodes: props.nodes,
      relationships: props.relationships,
      hasTruncatedFields: true,
      updated: new Date().getTime()
    })
  }

  setGraph(graph: any) {
    this.graph = graph
  }

  handleInspe(es: any) {
    this.dataOnInspect = es;
    // console.log("inspector", { es })
    // if(es.hoveredItem.type == "node" && es.hoveredItem.item.labels && es.hoveredItem.item.labels[0]) {
    //     console.log("type", es.hoveredItem.item.labels[0])
    //     if(this.dataStyleChanges && this.dataStyleChanges[es.hoveredItem.type]) {
    //       console.log("dataStyleChanges:", this.dataStyleChanges)
    //       console.log("In:", this.dataStyleChanges[`node.${es.hoveredItem.item.labels[0]}`])
    //     }
    // }
    //
    // if(es.hoveredItem.type == "relationship") {
    //   console.log("type", es.hoveredItem.item)
    //   // if(this.dataStyleChanges) {
    //   //   console.log("In:", this.dataStyleChanges)
    //   // }
    // }
  }

  getStats(es: any) {
    this.stats = es;
    // console.log("stats", { es })
  }

    handleChange = (selectedOption: any) => {
      let selectedNodes: any;

      if(selectedOption) {
          selectedNodes = selectedOption.map((option: any) => {
              // @ts-ignore
              return totalNodesHash[option.value]
          });
      }

        this.setState(
            { ...this.state, selectedOption, addedNodes: selectedNodes },
            () => {
                // console.log(`selectedNodes:`, selectedNodes)
            }
        );
    };

    resetSelect = () => {
        this.setState({
            selectedOption: null,
            addedNodes: []
        });
    };

    handleCheckBoxChange(event: any){
        let { value, checked } = event.target;
        let stateChecked = this.state.checkedLabels;
        // @ts-ignore
        if (checked) {
            stateChecked.push(value);
        } else {
            stateChecked = stateChecked.filter((e: any) => e !== value);
        }

        // TODO: Improve filter to reduce complexity time
        const filteredNodes = nodesMock.filter((node: any) => {
            const hasNodeAnyCheckedLabelList = stateChecked.filter((checkLabel: any) =>  node.labels.includes(checkLabel));
            return hasNodeAnyCheckedLabelList.length;
        });

        this.setState({ nodes: filteredNodes, checkedLabels: stateChecked }, this.resetSelect);

    }

    renderCheckBoxes(){
        let labels = {};
        nodesMock.map((node: any) => {
            node.labels.map((label: string) => { // @ts-ignore
                labels[label] = true
            })
        });

        return(
            <div>
                {
                    Object.keys(labels).map((label: any) => {
                        return (
                            <div style={ this.nodeStyleGetter ? {...this.nodeStyleGetter(label)} : {}}>
                                <input type="checkbox" onChange={this.handleCheckBoxChange.bind(this)} id={label}
                                       name="vehicle1" value={label}/>
                                <label htmlFor={label}> {label}</label>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

  render() {
    return (
        <div style={{display: "flex",  flexDirection: "column", width: "100vw", height: "100vh"}}>
          <div style={{display: "flex", width: "100%", height: "100%"}}>
              <Resizable
                  style={sidebarStyle}
                  defaultSize={{
                      width: 400,
                      height: "100%"
                  }}
                  enable={{
                      top:false, right:true, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false
                  }}
                  minWidth={30}
                  maxWidth={400}
              >
                  {this.renderCheckBoxes()}
              </Resizable>
            <div style={{display: "flex",  flexDirection: "column", width: "100%", height: "100%"}}>
              <Resizable
                  style={style}
                  defaultSize={{
                    width: "100%",
                    height: 80
                  }}
                  enable={{
                    top:false, right:false, bottom:true, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false
                  }}
                  minHeight={10}
                  maxHeight={80}
              >
                  <StyledSelect
                      value={this.state.selectedOption}
                      onChange={this.handleChange}
                      options={this.state.options}
                      isMulti
                      name="colors"
                      className="basic-multi-select"
                      classNamePrefix="select"
                  />
              </Resizable>
              <div style={{display: "flex",  flex: 2, alignItems: "center", width: "100%", height: "30vh"}}>
                <ReactGraph
                    // TODO: FIXME
                    // @ts-ignore
                    initialState={{ nodes: this.state.nodes, relationships: [] }}
                    nodes={nodesMock}
                    relationships={relationshipsMock}
                    setGraph={this.setGraph.bind(this)}
                    hasTruncatedFields={this.state.hasTruncatedFields}
                    // height="60vh"
                    // width="65vw"
                    hasLegends
                    hasInspector
                    onInspect={this.handleInspe.bind(this)}
                    onStatsChange={this.getStats.bind(this)}
                    getStyleVersion={(version: any) => this.setState({...this.state, styleVersion: version})}
                    addedNodes={this.state.addedNodes}
                    zoomMenu={ZoomMenu}
                    nodeStyleGetter={(nodeStyleGetter: any) => this.nodeStyleGetter = nodeStyleGetter}
                    relationshipStyleGetter={(relationshipStyleGetter: any) => this.relationshipStyleGetter = relationshipStyleGetter}
                />
              </div>
            </div>
          </div>
          <Resizable
              style={style}
              defaultSize={{
                width: "100%",
                height: 100
              }}
              enable={{
                top:true, right:false, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false
              }}
              minHeight={30}
              maxHeight={300}
          >
            001
          </Resizable>
        </div>
    )
  }
}

export default Visualization ;

const ZoomButton = (props: any) =>  <button {...props}>{props.children}</button>;

const ZoomInButton = (props: any) =>  <ZoomButton {...props}>Zoom In</ZoomButton>;

const ZoomOutButton = (props: any) =>  <ZoomButton {...props}>Zoom Out</ZoomButton>;

const ZoomMenu = (props: any) => (
    <>
        <ZoomInButton onClick={props.onZoomInClick}/>
        <ZoomOutButton onClick={props.onZoomOutClick}/>
    </>
);

