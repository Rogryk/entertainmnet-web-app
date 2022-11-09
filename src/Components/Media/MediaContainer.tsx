import ContentContainer from "./ContentContainer";
import Searchbar from "../search-bar/Searchbar";
import styles from "./MediaContainer.module.scss";

interface MediaContainerProps {
  isSidebarMenuHidden: boolean;
}

const MediaContainer = ({ isSidebarMenuHidden }: MediaContainerProps) => {
  return (
    <div
      className={`${styles.mediaContainer} ${
        isSidebarMenuHidden && styles.thin
      }`}
    >
      <ContentContainer />
    </div>
  );
};

export default MediaContainer;
