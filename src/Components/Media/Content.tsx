import React, { useContext } from "react";
import styles from "./Content.module.scss";
import SubcontentContainer from "./SubcontentContainer";
import ElementContext from "../../store/element-context";

export interface IMediaContentElement {
  title: string;
  theme: "Short" | "Long";
  content: any[];
}

interface IContentProps {
  mediaContent: IMediaContentElement[];
}

const Content: React.FC<IContentProps> = (props) => {
  const elementCtx = useContext(ElementContext);

  return (
    <div className={styles.contentContainer}>
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
