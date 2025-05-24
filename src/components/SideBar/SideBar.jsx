import React from "react";
import CurrencyPage from "../../pages/CurrencyPage/CurrencyPage";
import { Navigation } from "../Navigation/Navigation";
import css from "./SideBar.module.css";
import Balance from "../Balance/Balance";

const SideBar = () => {
  return (
    <div className={css.sidebar}>
      {/* Navigation Container */}
      <div className={css.navigationContainer}>
        <Navigation />
      </div>

      {/* Balance Container */}
      {/* <div className={css.balanceContainer}>
        <p style={{ color: '#fff' }}>Balance Block</p>
      </div> */}

      <Balance />

      {/* Card 1 */}
      <div className={css.card1}>
        <CurrencyPage />
      </div>
    </div>
  );
};

export default SideBar;

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
