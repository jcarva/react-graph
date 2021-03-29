import { ZoomMenuWrapper } from "../styled";
import React from "react";

const ZoomButton = (props: any) => <button {...props}>{props.children}</button>;

const ZoomInButton = (props: any) => <ZoomButton {...props}>In</ZoomButton>;

const ZoomOutButton = (props: any) => <ZoomButton {...props}>Out</ZoomButton>;

const ZoomControlsDefault = (props: any) => (
  <>
    <ZoomInButton onClick={props.onZoomInClick} />
    <ZoomOutButton onClick={props.onZoomOutClick} />
  </>
);

// TODO: Improve interface
export const ZoomControls = (props: any) => {
  const ZoomMenu = props.zoomMenu || ZoomControlsDefault;

  return (
    <ZoomMenuWrapper>
      <ZoomMenu
        onZoomInClick={props.onZoomInClick}
        onZoomOutClick={props.onZoomOutClick}
      />
    </ZoomMenuWrapper>
  );
};
