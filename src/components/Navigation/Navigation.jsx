import React from "react";
import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import { useMediaQuery } from "react-responsive";

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
            <svg className={css.icon}>
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
