import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../Button";
import { getAuth } from "firebase/auth";
import type { UserCredentialsProps } from "../../../store/authSlice";
import styles from "./RegisterForm.module.scss";

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
            minLength: {
              value: 6,
              message: "Minimum 6 characters",
            },
          })}
        />
        {errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}
      </div>
      <div>
        <label>Repeat password</label>
        <input
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
          <p className={styles.error}>{errors.cpassword.message}</p>
        )}
      </div>
      <Button onClick={() => {}}>Register</Button>
    </form>
  );
};

export default RegisterForm;
