import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import { useMediaQuery } from "react-responsive";
import clsx from 'clsx';

const Navigation = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className={css.container}>
      <nav className={css.nav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${css.link} ${css.linkActive}` : css.link
          }
        >
          <span className={css.iconWrapper}>
            <svg className={css.icon}>
              <use
                href={`/icons.svg#${
                  isMobile ? "icon-home1" : "baseline-home-24px"
                }`}
              />
            </svg>
          </span>
          <span className={css.label}>Home</span>
        </NavLink>

        <NavLink
          to="/statistic"

          className={({ isActive }) =>
            isActive ? `${css.link} ${css.linkActive}` : css.link
          }
        >
          <span className={css.iconWrapper}>
            <svg className={clsx(css.icon, css.statistic)}>
              <use
                href={`/icons.svg#${
                  isMobile ? "icon-statistics" : "baseline-timeline-24px"
                }`}
              />
            </svg>
          </span>
          <span className={css.label}>Statistics</span>
        </NavLink>

        {isMobile && (
          <NavLink
            to="/currency"
            className={({ isActive }) =>
              isActive ? `${css.link} ${css.linkActive}` : css.link
            }
          >
            <span className={css.iconWrapper}>
              <svg className={css.icon}>
                <use href="/icons.svg#icon-currency" />
              </svg>
            </span>
          </NavLink>
        )}
      </nav>
    </div>
  );
};

export { Navigation };

// import React from "react";
// import { NavLink } from "react-router-dom";
// import css from "./Navigation.module.css";
// import { useMediaQuery } from "react-responsive";

// const Navigation = () => {
//   const isMobile = useMediaQuery({ maxWidth: 767 });

//   return (
//     <div className={css.container}>
//       <nav className={css.nav}>
//         {/* HOME */}
//         <NavLink
//           to="/"
//           className={({ isActive }) =>
//             isActive ? `${css.link} ${css.linkActive}` : css.link
//           }
//         >
//           <span className={css.iconWrapper}>
//             {isMobile ? (
//               <svg className={`${css.icon} ${css.iconHome}`}>
//                 <use href="/icons.svg#icon-home1" />
//               </svg>
//             ) : (
//               <svg className={css.icon}>
//                 <use href="/icons.svg#baseline-home-24px" />
//               </svg>
//             )}
//           </span>
//           <span className={css.label}>Home</span>
//         </NavLink>

//         {/* STATISTICS */}
//         <NavLink
//           to="/statistic"
//           className={({ isActive }) =>
//             isActive ? `${css.link} ${css.linkActive}` : css.link
//           }
//         >
//           <span className={css.iconWrapper}>
//             {isMobile ? (
//               <svg className={`${css.icon} ${css.iconStatistics}`}>
//                 <use href="/icons.svg#icon-statistics" />
//               </svg>
//             ) : (
//               <svg className={css.icon}>
//                 <use href="/icons.svg#baseline-timeline-24px" />
//               </svg>
//             )}
//           </span>
//           <span className={css.label}>Statistics</span>
//         </NavLink>

//         {/* CURRENCY — тільки мобільна */}
//         {isMobile && (
//           <NavLink
//             to="/currency"
//             className={({ isActive }) =>
//               isActive ? `${css.link} ${css.linkActive}` : css.link
//             }
//           >
//             <span className={css.iconWrapper}>
//               <svg className={`${css.icon} ${css.iconCurrency}`}>
//                 <use href="/icons.svg#icon-currency" />
//               </svg>
//             </span>
//           </NavLink>
//         )}
//       </nav>
//     </div>
//   );
// };

// export { Navigation };