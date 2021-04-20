import React from "react";
import styled from "styled-components";
import Select from "react-select";

export const SearchBarWrapper = styled.div`
  height: 72px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  background-color: #f0f0f0;
  box-sizing: border-box;
  border-bottom: solid 1px #ddd;
`;

const StyledSelect = styled(Select)`
  flex: 1;
`;

const SearchBar = (props: any) => {
  return (
    <SearchBarWrapper>
      <StyledSelect
        value={props.selectedOptions}
        onChange={props.handleSelectChange}
        options={props.selectOptions}
        isMulti
        name="nodes"
        className="basic-multi-select"
        classNamePrefix="select"
      />
    </SearchBarWrapper>
  );
};

export { SearchBar };
