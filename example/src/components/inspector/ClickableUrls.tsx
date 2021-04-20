import React from "react";

// credits to https://www.regextester.com/96504, modified though
/* eslint-disable no-useless-escape */
const URL_REGEX = /(?:https?|s?ftp|bolt):\/\/(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))?/gi;

interface ClickableUrlsProps {
  text: string;
  WrappingTag?: keyof JSX.IntrinsicElements;
}

export default function ClickableUrls({
  text = "",
  WrappingTag = "span",
}: ClickableUrlsProps): JSX.Element {
  const urls = text.match(URL_REGEX) || [];
  return (
    <WrappingTag>
      {text.split(URL_REGEX).map((text, index) => {
        /* since we never move these components this key should be fine */
        return (
          <React.Fragment key={index}>
            {text}
            {urls[index] && (
              <a href={urls[index]} target="_blank" rel="noreferrer">
                {urls[index]}
              </a>
            )}
          </React.Fragment>
        );
      })}
    </WrappingTag>
  );
}
