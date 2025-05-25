import React from "react";
import CurrencyPage from "../../pages/CurrencyPage/CurrencyPage";
import { Navigation } from "../Navigation/Navigation";
import css from './SideBar.module.css';
import { useMediaQuery } from 'react-responsive';

const SideBar = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1279 });
  const isDesktop = useMediaQuery({ minWidth: 1280 });

  if (isMobile) {
    return (
      <div className={css.sidebarMobile}>
        <div className={css.navigationContainer}>
          <Navigation />
        </div>
        <div className={css.balanceContainerMobile}>
          <p style={{ color: '#fff' }}>Balance</p>
        </div>
        <div className={css.currencyBlockMobile}>
          <CurrencyPage />
        </div>
      </div>
    );
  }

  if (isTablet) {
    return (
      <div className={css.sidebarTablet}>
        <div className={css.sidebarContent}>
          <div className={css.sidebarContentLeft}>
            <div className={css.sidebarContainerTablet}>
              <Navigation />
            </div>
            <div className={css.balanceSummary}>
              <p style={{ color: '#fff' }}>Balance Summary</p>
            </div>
          </div>
          <div className={css.balanceContainerTablet}>
            <p style={{ color: '#fff' }}>Balance</p>
          </div>
        </div>
        <div className={css.currencyBlockTablet}>
          <CurrencyPage />
        </div>
      </div>
    );
  }

  if (isDesktop) {
    return (
      <div className={css.sidebarDesktop}>
        <div className={css.leftColumn}>
          <div className={css.sidebarContainerDesktop}>
            <Navigation />
          </div>
          <div className={css.balanceContainerDesktop}>
            <p style={{ color: '#fff' }}>Balance</p>
          </div>
        </div>
        <div className={css.currencyBlockDesktop}>
          <CurrencyPage />
        </div>
      </div>
    );
  }

  return null;
};

export default SideBar;

// import React from "react";
// import CurrencyPage from "../../pages/CurrencyPage/CurrencyPage";
// import { Navigation } from "../Navigation/Navigation";
// import css from './SideBar.module.css';
// import { useMediaQuery } from 'react-responsive';

// const SideBar = () => {
//   const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1279 });
//   const isDesktop = useMediaQuery({ minWidth: 1280 });

//   if (isDesktop) {
//     return (
//       <div className={css.sidebar}>
//         <div className={css.sidebarContainer}>
//           <Navigation />
//         </div>
//         <div className={css.balanceContainer}>
//           <p style={{ color: '#fff' }}>Balance Block</p>
//         </div>
//         <div className={css.table}>
//           <CurrencyPage />
//         </div>
//       </div>
//     );
//   }

//   if (isTablet) {
//     return (
//       <div className={css.sidebar}>
//         <div className={css.sidebarContent}>
//           <div className={css.sidebarContainer}>
//             <Navigation />
//           </div>
//           <div className={css.balanceSummary}>
//             <p style={{ color: '#fff' }}>Balance Block</p>
//           </div>
//         </div>
//         <div className={css.balanceContainer}>
//           <CurrencyPage />
//         </div>
//       </div>
//     );
//   }

  
//   return (
//     <div className={css.sidebar}>
//       <div className={css.navigationContainer}>
//         <Navigation />
//       </div>
//       <div className={css.balanceContainer}>
//         <p style={{ color: '#fff' }}>Balance Block</p>
//       </div>
//       <div className={css.card1}>
//         <CurrencyPage />
//       </div>
//     </div>
//   );
// };

// export default SideBar;

// import React from "react";
// import CurrencyPage from "../../pages/CurrencyPage/CurrencyPage";
// import { Navigation } from '../Navigation/Navigation';

// const SideBar = () => {
//   return (
//     <div>
//       <Navigation />
//       {/* <Navigation />
//       <Ballance />
//       <CurrencyPage /> */}
//     </div>
//   );
// };

// export default SideBar;
