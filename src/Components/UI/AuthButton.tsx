interface ButtonProps {
  onClick: () => void;
  type?: string;
  children?: React.ReactNode;
  classList?: string;
}

const Button = (props: ButtonProps) => {
  return (
    <button
      className={`authButton dimensions effects styles ${props.classList}`}
      type="submit"
      onClick={() => props.onClick()}
      autoFocus={true}
    >
      {props.children}
    </button>
  );
};

export default Button;
