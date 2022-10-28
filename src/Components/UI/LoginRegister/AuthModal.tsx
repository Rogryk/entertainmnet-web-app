import ReactDOM from "react-dom";
import Logout from "./Logout";
import AuthContainer from "./AuthContainer";
import { useAppSelector } from "../../../hooks/reduxHooks";
import type { UserCredentialsProps } from "../../../store/authSlice";
import styles from "./AuthModal.module.scss";

const Backdrop = () => {
  return <div className={styles.backdrop}></div>;
};

interface AuthOverlayProps {
  onLogin: (userCredentials: UserCredentialsProps) => void;
  onLogout: () => void;
  onRegister: (userCredentials: UserCredentialsProps) => void;
  onBlur: () => void;
}

const AuthOverlay = (props: AuthOverlayProps) => {
  const { onLogin, onLogout, onRegister, onBlur } = { ...props };
  const authSel = useAppSelector((state) => state.auth);
  return (
    <div className={styles.auth}>
      {authSel.isAuthorized ? (
        <Logout logoutHandler={onLogout} onBlur={onBlur} />
      ) : (
        <AuthContainer
          onLogin={onLogin}
          onRegister={onRegister}
          onBlur={onBlur}
        />
      )}
    </div>
  );
};

const AuthModal = (props: AuthOverlayProps) => {
  const { onLogin, onLogout, onRegister, onBlur } = { ...props };
  const authOverlayRef = document.getElementById("auth-overlay");
  const authBackdropRef = document.getElementById("auth-backdrop");
  return (
    <>
      {authBackdropRef && ReactDOM.createPortal(<Backdrop />, authBackdropRef)}

      {authOverlayRef &&
        ReactDOM.createPortal(
          <AuthOverlay
            onLogin={onLogin}
            onLogout={onLogout}
            onRegister={onRegister}
            onBlur={onBlur}
          />,
          authOverlayRef
        )}
    </>
  );
};

export default AuthModal;
