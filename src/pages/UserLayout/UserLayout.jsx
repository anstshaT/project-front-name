import { Suspense } from "react";
import SideBar from "../../components/SideBar/SideBar";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import LogoutModal from "../../components/LogoutModal/LogoutModal";
import ModalAddTransaction from "../../components/ModalAddTransaction/ModalAddTransaction";
import s from "./UserLayout.module.css";

const UserLayout = () => {
  return (
    <>
      <Header />
      <main className={s.main}>
        <div className={s.userLayout}>
          <div className={s.sideBar}>
            <SideBar />
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Outlet />
          </Suspense>
        </div>
        {/* <LogoutModal />
        <ModalAddTransaction /> */}
        {/* <ModalEditTransaction /> */}
      </main>
    </>
  );
};

export default UserLayout;
