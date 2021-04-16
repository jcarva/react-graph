import React from "react";
import styled from "styled-components";

const LabelsWrapper = styled.div`
   display: flex;
   flex-direction: column;
   
   h3 {
    margin: 0 0 8px 0;
   }
`;

const StyledToken = styled.div`
  display: inline-block;
  font-weight: bold;
  line-height: 1em;
  white-space: nowrap;
  user-select: none;
  font-size: 12px;
  margin: 4px;
`;

const LabelWrapper = styled(StyledToken)`
  padding: 4px 8px;
  border-radius: ${(props: any) => props.borderRadius ? props.borderRadius : "16px"};
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  * {
    cursor: pointer;
  }
`;

const CheckBox = styled.input`
  margin-left: 0;
`;

const Labels = (props: any) => {
  return(
    <div>
      {
        props.labels.map((label: any) => {
          return (
            // @ts-ignore
            <LabelWrapper borderRadius={props.borderRadius} style={(props.styles && props.styles) ? props.styles[label] : {}}>
              <Label>
                <CheckBox type="checkbox" onChange={props.handleCheckBoxChange} id={label} name={label} value={label} checked={props.checkedLabels.includes(label)}/>
                <label htmlFor={label}> {label}</label>
              </Label>
            </LabelWrapper>
          )
        })
      }
    </div>
  )
};

const NodesLabels = (props: any) => (
  <LabelsWrapper>
    <Labels
      labels={props.nodesLabel}
      checkedLabels={props.checkedNodeLabels}
      styles={props.styles}
      handleCheckBoxChange={props.handleCheckBoxChange}
    />
  </LabelsWrapper>
);

const RelationshipsLabels = (props: any) => (
  <LabelsWrapper>
    <Labels
      labels={props.relationshipsLabel}
      checkedLabels={props.checkedRelationshipsLabels}
      styles={props.styles}
      handleCheckBoxChange={props.handleCheckBoxChange}
      borderRadius={"4px"}
    />
  </LabelsWrapper>
);

export { NodesLabels, RelationshipsLabels };
