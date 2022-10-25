import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./LoginForm.module.scss";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

interface IFormInput {
  email: string;
  password: string;
}

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitted, errors },
  } = useForm<IFormInput>({ reValidateMode: "onSubmit" });
  const auth = getAuth();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Logged in as: ", user.email);
        onLogin();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error: Login failed");
      });
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
