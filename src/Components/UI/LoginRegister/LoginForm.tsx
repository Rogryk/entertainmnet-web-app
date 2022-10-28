import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./LoginForm.module.scss";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { UserCredentialsProps } from "../../../store/authSlice";

interface LoginFormProps {
  onLogin: (userCredentials: UserCredentialsProps) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitted, errors },
  } = useForm<UserCredentialsProps>({ reValidateMode: "onSubmit" });
  const auth = getAuth();

  const onSubmit: SubmitHandler<UserCredentialsProps> = (UserCredentials) => {
    onLogin(UserCredentials);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email</label>
        <input
          autoFocus={true}
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/,
              message: "Invalid email",
            },
          })}
        />
        {errors.email && isSubmitted && (
          <p className={styles.error}>{errors.email.message}</p>
        )}
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
          })}
        />
      </div>

      <button type="submit" onClick={() => {}}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
