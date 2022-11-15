import styles from "./AuthContainer.module.scss";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Tabs } from "@mantine/core";
import type { UserCredentialsProps } from "../../store/authSlice";

interface AuthContainerProps {
  onLogin: (userCredentials: UserCredentialsProps) => void;
  onRegister: (userCredentials: UserCredentialsProps) => void;
  onBlur: () => void;
}

const AuthContainer = ({ onLogin, onRegister, onBlur }: AuthContainerProps) => {
  return (
    <div
      className={`auth position dimensions ${styles.authStyles}`}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && onBlur()}
      tabIndex={0}
    >
      <Tabs
        radius="xs"
        defaultValue="login"
        classNames={{ tab: styles.tabStyles, tabLabel: styles.tabLabelStyles }}
      >
        <Tabs.List position="center">
          <Tabs.Tab value="login">Login</Tabs.Tab>
          <Tabs.Tab value="register">Register</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="login" pt="xs">
          <LoginForm onLogin={onLogin} />
        </Tabs.Panel>

        <Tabs.Panel value="register" pt="xs">
          <RegisterForm onRegister={onRegister} />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default AuthContainer;
