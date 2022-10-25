import React from "react";
import styles from "./AuthContainer.module.scss";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Tabs } from "@mantine/core";

interface AuthContainerProps {
  onLogin: () => void;
  onRegister: () => void;
  onBlur: () => void;
}

const AuthContainer = ({ onLogin, onRegister, onBlur }: AuthContainerProps) => {
  const blurHandler = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    onBlur();
  };

  return (
    <div className={styles.authContainer} onBlur={blurHandler} tabIndex={0}>
      <Tabs
        radius="xs"
        defaultValue="login"
        className={styles.tabContainer}
        classNames={{ tab: styles.tab, tabLabel: styles.tabLabel }}
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
