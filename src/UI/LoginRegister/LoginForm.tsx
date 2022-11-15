import { useForm } from "react-hook-form";
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

  return (
    <form className={"form dimensions login"} onSubmit={handleSubmit(onLogin)}>
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
