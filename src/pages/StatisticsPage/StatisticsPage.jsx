import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import TransactionType from "../../components/TransactionType/TransactionType";
import Chart from "../../components/Chart/Chart";
import StatisticsDashboard from "../../components/StatisticsDashboard/StatisticsDashboard";
import StatisticsTable from "../../components/StatisticsTable/StatisticsTable";
import s from "./StatisticsPage.module.css";

import { fetchStatistics } from "../../redux/statistics/statisticsOperations";

const StatisticsPage = () => {
  const dispatch = useDispatch();

  const [transactionType, setTransactionType] = useState("expense");

  // Додай ці два стейти
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Тригер на фетч
  useEffect(() => {
    dispatch(fetchStatistics({ month: selectedMonth, year: selectedYear }));
  }, [dispatch, selectedMonth, selectedYear]);

  return (
    <div className={s.statisticDiv}>
      <div className={s.typeAndChart}>
        <div className={s.toggle}>
          <p
            className={s.toggleText}
            onClick={() => setTransactionType("income")}
          >
            Income
          </p>
          <TransactionType
            transactionType={transactionType}
            setTransactionType={setTransactionType}
          />
          <p
            className={s.toggleText}
            onClick={() => setTransactionType("expense")}
          >
            Expense
          </p>
        </div>
        <Chart transactionType={transactionType} />
      </div>

      <div className={s.dashboardAndList}>
        <StatisticsDashboard
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onMonthChange={setSelectedMonth}
          onYearChange={setSelectedYear}
        />
        <div className={s.table}>
          <StatisticsTable />
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
