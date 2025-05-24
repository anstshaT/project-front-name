import { Suspense } from "react";
import SideBar from "../../components/SideBar/SideBar";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import LogoutModal from "../../components/LogoutModal/LogoutModal";
import ModalAddTransaction from "../../components/ModalAddTransaction/ModalAddTransaction";

const UserLayout = () => {
  return (
    <>
      <Header />
      <main>
        <SideBar />
        <Suspense fallback={<p>Loading...</p>}>
          <Outlet />
        </Suspense>
        {/* <LogoutModal />
        <ModalAddTransaction /> */}
        {/* <ModalEditTransaction /> */}
      </main>
    </>
  );
};

export default UserLayout;
