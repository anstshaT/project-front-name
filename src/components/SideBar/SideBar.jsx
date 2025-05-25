import React from "react";
import CurrencyPage from "../../pages/CurrencyPage/CurrencyPage";
import { Navigation } from "../Navigation/Navigation";
import css from './SideBar.module.css';
import { useMediaQuery } from 'react-responsive';
import Balance from "../Balance/Balance";

const SideBar = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1279 });
  const isDesktop = useMediaQuery({ minWidth: 1280 });
  
    return (
      <div>
          <Navigation />
          <Balance />
          <CurrencyPage />
      </div>
    );
};

export default SideBar;

