import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
import { useMediaQuery } from 'react-responsive';

const Navigation = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <nav className={css.nav}>
      <NavLink to="/" className={({ isActive }) => isActive ? css.linkActive : css.link}>
        <svg className={css.icon}>
          <use href="/icons.svg#baseline-home-24px" />
        </svg>
        <span className={css.label}>Home</span>
      </NavLink>

      <NavLink to="/statistics" className={({ isActive }) => isActive ? css.linkActive : css.link}>
        <svg className={css.icon}>
          <use href="/icons.svg#icon-statistics" />
        </svg>
        <span className={css.label}>Statistics</span>
      </NavLink>

      {isMobile && (
        <NavLink to="/currency" className={({ isActive }) => isActive ? css.linkActive : css.link}>
          <svg className={css.icon}>
            <use href="/icons.svg#icon-currency" />
          </svg>
        </NavLink>
      )}
    </nav>
  );
};

export { Navigation };

// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import css from './Navigation.module.css';

// const Navigation = () => {
//   return (
//     <nav className={css.nav}>
//       {/* Home */}
//       <NavLink to="/" className={({ isActive }) => isActive ? css.linkActive : css.link}>
//         <svg className={css.icon}>
//           <use href="/icons.svg#baseline-home-24px" />
//         </svg>
//         <span className={css.label}>Home</span>
//       </NavLink>

//       {/* Statistics */}
//       <NavLink to="/statistics" className={({ isActive }) => isActive ? css.linkActive : css.link}>
//         <svg className={css.icon}>
//           <use href="/icons.svg#baseline-timeline-24px" />
//         </svg>
//         <span className={css.label}>Statistics</span>
//       </NavLink>

//       {/* Currency (для мобілки тільки) */}
//       <NavLink to="/currency" className={({ isActive }) => isActive ? css.linkActive : css.link} id={css.currencyLink}>
//         <svg className={css.icon}>
//           <use href="/icons.svg#icon-currency" />
//         </svg>
//       </NavLink>
//     </nav>
//   );
// };

// export { Navigation };