import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
import { useMediaQuery } from 'react-responsive';

const Navigation = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className={css.container}>
      <nav className={css.nav}>
        <NavLink to="/" className={({ isActive }) => `${css.linkContainer} ${isActive ? css.linkActive : ''}`}>
          <div className={css.iconWrapper}>
            <svg className={css.icon}>
              <use href="/icons.svg#icon-home1" />
            </svg>
          </div>
          {!isMobile && <span className={css.label}>Home</span>}
        </NavLink>

        <NavLink to="/statistics" className={({ isActive }) => `${css.linkContainer} ${isActive ? css.linkActive : ''}`}>
          <div className={css.iconWrapper}>
            <svg className={css.icon}>
              <use href="/icons.svg#icon-statistics" />
            </svg>
          </div>
          {!isMobile && <span className={css.label}>Statistics</span>}
        </NavLink>

        {isMobile && (
          <NavLink to="/currency" className={({ isActive }) =>
            `${css.linkContainer} ${css.currency} ${isActive ? css.linkActive : ''}`
          }>
            <div className={css.iconWrapper}>
              <svg className={css.icon}>
                <use href="/icons.svg#icon-currency" />
              </svg>
            </div>
          </NavLink>
        )}
      </nav>
    </div>
  );
};

export { Navigation };