import React, { useState } from "react";
import { ProSidebar, Menu, SubMenu } from "react-pro-sidebar";
import { NodesLabels, RelationshipsLabels } from "./Labels";
import { SideBarWrapper, Header, Footer } from "./Organisms";
import nodesIcon from "../../../assets/images/nodes.svg";
import relationshipsIcon from "../../../assets/images/relationships.svg";
import "react-pro-sidebar/dist/css/styles.css";

const SideBar = (props: any) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggle = () => setIsCollapsed(!isCollapsed);

  return (
    // @ts-ignore
    <SideBarWrapper isCollapsed={isCollapsed}>
      <ProSidebar collapsed={isCollapsed}>
        <Header onClick={toggle} />
        <Menu iconShape="circle">
          <SubMenu
            title="Nodes"
            icon={
              <img
                src={nodesIcon}
                width={20}
                height={20}
                style={{ marginRight: 3 }}
              />
            }
          >
            <NodesLabels
              nodesLabels={props.nodesLabels}
              checkedNodesLabels={props.checkedNodesLabels}
              handleCheckBoxChange={props.handleNodeLabelsCheckBoxChange}
              styles={props.styles.nodes}
            />
          </SubMenu>
          <SubMenu
            title="Relationships"
            icon={
              <img
                src={relationshipsIcon}
                width={24}
                height={24}
                style={{ marginRight: 0 }}
              />
            }
          >
            <RelationshipsLabels
              relationshipsLabels={props.relationshipsLabels}
              checkedRelationshipsLabels={props.checkedRelationshipsLabels}
              handleCheckBoxChange={props.handleRelationshipsCheckBoxChange}
              styles={props.styles.relationships}
            />
          </SubMenu>
        </Menu>
        <Footer />
      </ProSidebar>
    </SideBarWrapper>
  );
};

export { SideBar };
