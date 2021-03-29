import { ZoomMenuWrapper } from "../styled";
import React from "react";
import styled from "styled-components";

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 16px 16px 0;
  padding: 1px;
  background: #f0f0f0;
  border-radius: 4px;
  box-sizing: border-box;
  box-shadow: 0 1px 4px rgb(0 0 0 / 30%);
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 32px;
  height: 32px;
  padding: 4px;
  border: none;
  font-size: 32px;
  user-select: none;
  font-weight: bold;
  color: #666;

  &:focus {
    outline: 0;
  }

  &:hover {
    color: #333;
  }

  &:disabled {
    color: #d1d1d1;
  }
`;

const Divider = styled.div`
  height: 1px;
  width: 75%;
  background-color: #666;
`;

const ZoomControlsDefault = (props: any) => {
  return (
    <ButtonsWrapper>
      <Button
        className="zoom-in-button"
        onClick={props.onZoomInClick}
        disabled={props.zoomInLimitReached}
      >
        &#43;
      </Button>
      <Divider />
      <Button
        className="zoom-out-button"
        onClick={props.onZoomOutClick}
        disabled={props.zoomOutLimitReached}
      >
        &#8722;
      </Button>
    </ButtonsWrapper>
  );
};

export const ZoomControls = (props: any) => {
  const ZoomMenu = props.zoomMenu || ZoomControlsDefault;

  return (
    <ZoomMenuWrapper>
      <ZoomMenu {...props} />
    </ZoomMenuWrapper>
  );
};
