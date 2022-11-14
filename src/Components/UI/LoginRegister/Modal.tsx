import ReactDOM from "react-dom";
import Logout from "./Logout";
import AuthContainer from "./AuthContainer";
import { useAppSelector } from "../../../hooks/reduxHooks";
import type { UserCredentialsProps } from "../../../store/authSlice";

const Backdrop = () => {
  return <div className={"modalBackdrop position dimensions styles"}></div>;
};

interface AuthWindowProps {
  onLogin: (userCredentials: UserCredentialsProps) => void;
  onLogout: () => void;
  onRegister: (userCredentials: UserCredentialsProps) => void;
  onBlur: () => void;
}

const AuthWindow = (props: AuthWindowProps) => {
  const { onLogin, onLogout, onRegister, onBlur } = { ...props };
  const authSel = useAppSelector((state) => state.auth);
  return (
    <div className={"modalWindow position dimensions"}>
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

const Modal = (props: AuthWindowProps) => {
  const { onLogin, onLogout, onRegister, onBlur } = { ...props };
  const authOverlayRef = document.getElementById("auth-overlay");
  const authBackdropRef = document.getElementById("auth-backdrop");
  return (
    <>
      {authBackdropRef && ReactDOM.createPortal(<Backdrop />, authBackdropRef)}

      {authOverlayRef &&
        ReactDOM.createPortal(
          <AuthWindow
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

export default Modal;
