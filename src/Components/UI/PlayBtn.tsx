import styles from "./PlayBtn.module.scss";
import { IconPlayerPlay } from "@tabler/icons";

interface PlayBtnProps {
  classNames: string;
}

const PlayBtn = (props: PlayBtnProps) => {
  return (
    <button className={`${styles.playBtn} ${props.classNames}`}>
      <IconPlayerPlay className={styles.playIcon} fill={"white"} />
    </button>
  );
};

export default PlayBtn;
