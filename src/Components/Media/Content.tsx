import React from "react";
import SubcontentContainer from "./SubcontentContainer";

export interface IMediaContentElement {
  title: string;
  theme: "Short" | "Long";
  content: any[];
}

interface IContentProps {
  mediaContent: IMediaContentElement[];
}

const Content: React.FC<IContentProps> = (props) => {
  return (
    <div className={"content"}>
      {props.mediaContent.map((el: IMediaContentElement) => {
        return (
          <SubcontentContainer
            key={el.title}
            theme={el.theme}
            title={el.title}
            content={el.content}
          />
        );
      })}
    </div>
  );
};

export default Content;
