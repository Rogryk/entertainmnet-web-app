import styles from "../UI/BookmarkBtn.module.scss";

interface ButtonProps {
  onClick: () => void;
  type?: string;
  children?: React.ReactNode;
  classList?: string;
}

const Button = (props: ButtonProps) => {
  return (
    <button
      className={styles.authContainer}
      type="submit"
      onClick={() => props.onClick()}
      autoFocus={true}
    >
      {props.children}
    </button>
  );
};

export default Button;
