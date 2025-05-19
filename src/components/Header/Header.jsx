import s from "./Header.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import LogoutModal from "../LogoutModal/LogoutModal";

const Header = () => {
  const dispatch = useDispatch();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const handleLogout = () => {
    // dispatch(logout());
    console.log("Logged out");
    setIsLogoutOpen(false);
  };

  return (
    <div className={s.container}>
      <div className={s.headerWrapper}>
        <div className={s.logoWrapper}>
          <svg className={s.icon} width="30.9" height="30.9">
            <use href="/icons.svg#icon-wallet" />
          </svg>
          <p className={s.logoText}>Spendy</p>
        </div>
        <div className={s.infoWrapper}>
          <div className={s.nameText}>Name</div>
          <div className={s.verticalLine}></div>
          <button
            className={s.logoutWrapper}
            onClick={() => setIsLogoutOpen(true)}
          >
            <svg
              className={s.iconExit}
              width="18"
              height="18"
              viewBox="0 0 32 32"
            >
              <use href="/icons.svg#icon-Exit" />
            </svg>
            <span className={s.exitText}>Exit</span>
          </button>
        </div>
      </div>
      <LogoutModal
        isOpen={isLogoutOpen}
        onRequestClose={() => setIsLogoutOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};
export default Header;
