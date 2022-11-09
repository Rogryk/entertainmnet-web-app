import { useForm, SubmitHandler } from "react-hook-form";
import { getAuth } from "firebase/auth";
import type { UserCredentialsProps } from "../../../store/authSlice";
import Button from "../AuthButton";

interface IFormInput {
  email: string;
  password: string;
  cpassword: string;
}

interface RegisterFormProps {
  onRegister: (userCredentials: UserCredentialsProps) => void;
}

const RegisterForm = ({ onRegister }: RegisterFormProps) => {
  const {
    handleSubmit,
    watch,
    register,
    resetField,
    reset,
    formState: { isSubmitted, errors },
  } = useForm<IFormInput>({ reValidateMode: "onSubmit" });
  const auth = getAuth();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    onRegister({ email: data.email, password: data.password });
  };

  return (
    <form
      className={"form dimensions register"}
      onSubmit={handleSubmit(onSubmit)}
    >
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
            minLength: {
              value: 6,
              message: "Minimum 6 characters",
            },
          })}
        />
        {errors.password && (
          <p className={"error position styles"}>{errors.password.message}</p>
        )}
      </div>
      <div>
        <label>Repeat password</label>
        <input
          className={`input position dimensions styles`}
          type="password"
          {...register("cpassword", {
            required: true,
            validate: (val: string) => {
              if (watch("password") != val && watch("email").length > 1) {
                resetField("password");
                resetField("cpassword");
                reset({ email: watch("email") }, { keepErrors: true });
                return "Your passwords do not match";
              }
            },
          })}
        />
        {errors.cpassword && (
          <p className={"error position styles"}>{errors.cpassword.message}</p>
        )}
      </div>
      <Button classList="button position dimensions" onClick={() => {}}>
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
