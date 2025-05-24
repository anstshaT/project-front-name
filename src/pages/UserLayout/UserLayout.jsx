import { Suspense } from "react";
import SideBar from "../../components/SideBar/SideBar";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";

const UserLayout = () => {
  return (
    <>
      <Header />
      <body>
        <SideBar />
        <Suspense fallback={<p>Loading...</p>}>
          <Outlet />
        </Suspense>
      </body>
    </>
  );
};

export default UserLayout;
