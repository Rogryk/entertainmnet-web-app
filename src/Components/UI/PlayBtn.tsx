import { IconPlayerPlay } from "@tabler/icons";

interface PlayBtnProps {
  classNames: string;
}

const PlayBtn = (props: PlayBtnProps) => {
  return (
    <button className={`playButton dimensions styles ${props.classNames}`}>
      <IconPlayerPlay className={"playIcon"} fill={"white"} />
    </button>
  );
};

export default PlayBtn;
