import React from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";

import { months, years } from "../../components/StatisticsDashboard/constants";
import css from "./StatisticsDashboard.module.css";

import arrowDown from "../../images/Arrows/arrow-down-white.svg";
import arrowUp from "../../images/Arrows/arrow-up-white.svg";

const StatisticsDashboard = ({
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
}) => {
  const currentMonthLabel =
    months.find((m) => m.value === selectedMonth)?.label || "Month";
  const currentYearLabel =
    years.find((y) => y.value === selectedYear)?.label || "Year";

  console.log("Month", selectedMonth);
  console.log("Year", selectedYear);

  return (
    <div className={css.wrapper}>
      {/* Month Selector */}
      <Listbox value={selectedMonth} onChange={onMonthChange}>
        {({ open }) => (
          <div className={css.dropdownWrapper}>
            <ListboxButton className={css.dropdownButton}>
              <span>{currentMonthLabel}</span>
              <img
                src={open ? arrowUp : arrowDown}
                alt="Arrow"
                className={`${css.arrowIcon} ${open ? css.open : ""}`}
              />
            </ListboxButton>
            <ListboxOptions className={css.dropdownList}>
              {months.map(({ label, value }) => (
                <ListboxOption key={value} value={value}>
                  {({ selected }) => (
                    <div
                      className={`${css.dropdownItem} ${
                        selected ? css.dropdownItemActive : ""
                      }`}
                    >
                      {label}
                    </div>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        )}
      </Listbox>

      {/* Year Selector */}
      <Listbox value={selectedYear} onChange={onYearChange}>
        {({ open }) => (
          <div className={css.dropdownWrapper}>
            <ListboxButton className={css.dropdownButton}>
              <span>{currentYearLabel}</span>
              <img
                src={open ? arrowUp : arrowDown}
                alt="Arrow"
                className={`${css.arrowIcon} ${open ? css.open : ""}`}
              />
            </ListboxButton>
            <ListboxOptions className={css.dropdownList}>
              {years.map(({ label, value }) => (
                <ListboxOption key={value} value={value} as="li">
                  {({ selected }) => (
                    <div
                      className={`${css.dropdownItem} ${
                        selected ? css.dropdownItemActive : ""
                      }`}
                    >
                      {label}
                    </div>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        )}
      </Listbox>
    </div>
  );
};

export default StatisticsDashboard;
