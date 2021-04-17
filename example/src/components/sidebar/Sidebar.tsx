import React, { useState } from "react";
import styled from "styled-components";
import { ProSidebar, Menu, SubMenu } from 'react-pro-sidebar';
import { NodesLabels, RelationshipsLabels } from "./Labels";
import reactGraphLogo from "../../assets/images/react-graph-logo.png";
import npmLogo from "../../assets/images/npm-logo.png";
import gitHubLogo from "../../assets/images/github-logo.png";
import nodesIcon from "../../assets/images/nodes.svg";
import relationshipsIcon from "../../assets/images/relationships.svg";
import 'react-pro-sidebar/dist/css/styles.css';

const SideBarWrapper = styled.div`
  box-sizing: border-box;
  height: 50vh;
  min-height: 100%;
  max-height: 100%;
  border-right: solid 1px #ddd;
  .pro-sidebar {
   .pro-sidebar-inner {
     background: #f0f0f0;

     .pro-sidebar-layout {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
     }
     
     .pro-menu {
      overflow-x: hidden;
      overflow-y: scroll;
      margin-top: 72px;
      
      .pro-inner-item {
        font-weight: bold;
        color: #666;
        &:hover {
          color: #333;
        }
        &:focus {
          outline: 0;
        }
        
        .pro-icon-wrapper {
          background-color: #708090;
        }
      }
      
      .pro-sub-menu {
        .pro-inner-list-item {
          background: #dcd9d9;
        }
      }
      
      .popper-element {
        // Fix popper-element on left-top. May cause layout issue for few labels/types
        //transform: translate3d(80px, 74px, 0) !important;
        .popper-inner {
          background-color: #dcd9d9 !important;
        }
      }
     }
   }
  }
`;

export const SideBar = (props: any) => {
  const [collapsed, setCollapsed] = useState(true);

  const handleCollapseClick = () => setCollapsed(!collapsed);

  return(
    <SideBarWrapper>
      <ProSidebar collapsed={collapsed}>
        <div
          style={{
            width: "270px",
            minHeight: "72px",
            height: "72px",
            backgroundColor: "#f0f0f0",
            borderBottom: "solid 1px #ddd",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            boxSizing: "border-box",
            position: "absolute",
            zIndex: 1001,
            color: "#333"
          }}
        >
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minWidth: "80px",
          }}>
            <img onClick={handleCollapseClick} src={reactGraphLogo} width={40} height={40} style={{cursor: "pointer"}}/>
          </div>
          <h2 style={{display: "inline"}}>React Graph</h2>
        </div>
        <Menu iconShape="circle">
          <SubMenu title="Nodes" icon={<img src={nodesIcon} width={20} height={20} style={{marginRight: 3}}/>}>
            <NodesLabels
              nodesLabel={props.nodesLabel}
              checkedNodeLabels={props.checkedNodeLabels}
              handleCheckBoxChange={props.handleNodeLabelsCheckBoxChange}
              styles={props.styles.nodes}
            />
          </SubMenu>
          <SubMenu title="Relationships" icon={<img src={relationshipsIcon} width={24} height={24} style={{marginRight: 0}}/>}>
            <RelationshipsLabels
              relationshipsLabel={props.relationshipsLabel}
              checkedRelationshipsLabels={props.checkedRelationshipsLabels}
              handleCheckBoxChange={props.handleRelationshipsCheckBoxChange}
              styles={props.styles.relationships}
            />
          </SubMenu>
        </Menu>
        <div style={{ textAlign: 'center', borderTop: "solid 1px #ddd" }}>
          <div style={{ padding: '15px 0'}}>
            <a
              href="https://www.npmjs.com/package/react-graph"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={npmLogo} width={50} height={15} />
            </a>
          </div>
          <div style={{ padding: '15px 0'}}>
            <a
              href="https://github.com/jcarva/react-graph"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={gitHubLogo} width={40} height={40} />
            </a>
          </div>
        </div>
      </ProSidebar>
    </SideBarWrapper>
  );
};
