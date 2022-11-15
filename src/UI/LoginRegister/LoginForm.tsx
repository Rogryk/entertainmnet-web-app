import { useForm, SubmitHandler } from "react-hook-form";
import { getAuth } from "firebase/auth";
import type { UserCredentialsProps } from "../../store/authSlice";
import Button from "../AuthButton";

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
    <form className={"form dimensions login"} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email</label>
        <input
          className={`input position dimensions styles`}
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
          <p className={"error position styles"}>{errors.email.message}</p>
        )}
      </div>
      <div>
        <label>Password</label>
        <input
          className={`input position dimensions styles`}
          type="password"
          {...register("password", {
            required: "Password is required",
          })}
        />
      </div>
      <Button classList="button position dimensions" onClick={() => {}}>
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
