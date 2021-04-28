import React from "react";
import styled from "styled-components";
import reactGraphLogo from "../../../assets/images/react-graph-logo.png";
import npmLogo from "../../../assets/images/npm-logo.png";
import gitHubLogo from "../../../assets/images/github-logo.png";

export const Header = (props: any) => (
  <HeaderWrapper>
    <ReactGraphLogoContainer>
      <img onClick={props.onClick} src={reactGraphLogo} />
    </ReactGraphLogoContainer>
    <h2 style={{ display: "inline" }}>React Graph</h2>
  </HeaderWrapper>
);

export const Footer = () => (
  <div style={{ textAlign: "center", borderTop: "solid 1px #ddd" }}>
    <div style={{ padding: "15px 0" }}>
      <a
        href="https://www.npmjs.com/package/react-graph"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={npmLogo} width={50} height={15} />
      </a>
    </div>
    <div style={{ padding: "15px 0" }}>
      <a
        href="https://github.com/jcarva/react-graph"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={gitHubLogo} width={40} height={40} />
      </a>
    </div>
  </div>
);

export const LabelsList = (props: any) => {
  return (
    <div>
      {props.labels.map((label: any) => {
        return (
          <LabelWrapper
            key={label}
            // @ts-ignore
            borderRadius={props.borderRadius}
            style={
              props.styles && props.styles[label]
                ? props.styles[label]
                : { color: "#FFFFFF", background: "#A5ABB6" }
            }
          >
            <Label>
              <CheckBox
                type="checkbox"
                onChange={props.handleCheckBoxChange}
                id={label}
                name={label}
                value={label}
                checked={props.checkedLabels.includes(label)}
              />
              <label htmlFor={label}> {label}</label>
            </Label>
          </LabelWrapper>
        );
      })}
    </div>
  );
};

export const HeaderWrapper = styled.div`
  width: 270px;
  min-height: 72px;
  height: 72px;
  background-color: #f0f0f0;
  border-bottom: solid 1px #ddd;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  position: absolute;
  z-index: 1001;
  color: #333;
`;

export const SideBarWrapper = styled.div`
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
          // Fix flickering .popper-element when expand sidebar
          display: ${(props: any) => (!props.isCollapsed ? "none" : "inherit")};
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

export const LabelsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 270px;

  h3 {
    margin: 0 0 8px 0;
  }
`;

export const StyledToken = styled.div`
  display: inline-block;
  font-weight: bold;
  line-height: 1em;
  white-space: nowrap;
  user-select: none;
  font-size: 12px;
  margin: 4px;
`;

export const LabelWrapper = styled(StyledToken)`
  padding: 4px 8px;
  border-radius: ${(props: any) =>
    props.borderRadius ? props.borderRadius : "20px"};
`;

export const Label = styled.div`
  display: flex;
  align-items: center;
  * {
    cursor: pointer;
  }
`;

export const CheckBox = styled.input`
  margin-left: 0;
`;

export const ReactGraphLogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 80px;

  img {
    width: 40px;
    height: 40px;
    cursor: pointer;
  }
`;
