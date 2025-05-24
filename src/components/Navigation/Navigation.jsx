import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';

export const Navigation = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className={css.nav}>
      <NavLink to="/" className={({ isActive }) => `${css.link} ${isActive ? css.active : ''}`}>
        <svg className={css.icon} width="24" height="24">
          <use href="/icons.svg#baseline-home-24px" />
        </svg>
        <span className={css.label}>Home</span>
      </NavLink>

      <NavLink to="/statistics" className={({ isActive }) => `${css.link} ${isActive ? css.active : ''}`}>
        <svg className={css.icon} width="24" height="24">
          <use href="/icons.svg#baseline-timeline-24px" />
        </svg>
        <span className={css.label}>Statistics</span>
      </NavLink>

      {isMobile && (
        <NavLink to="/currency" className={({ isActive }) => `${css.link} ${isActive ? css.active : ''}`}>
          <svg className={css.icon} width="24" height="24">
            <use href="/icons.svg#baseline-currency-24px" />
          </svg>
          <span className={css.label}>Currency</span>
        </NavLink>
      )}
    </nav>
  );
};