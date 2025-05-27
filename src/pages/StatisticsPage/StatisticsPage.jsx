import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TransactionType from "../../components/TransactionType/TransactionType";
import Chart from "../../components/Chart/Chart";
import StatisticsDashboard from "../../components/StatisticsDashboard/StatisticsDashboard";
import StatisticsTable from "../../components/StatisticsTable/StatisticsTable";
import s from "./StatisticsPage.module.css";

import { fetchStatistics } from "../../redux/statistics/statisticsOperations";

const StatisticsPage = () => {
  const dispatch = useDispatch();

  const [transactionType, setTransactionType] = useState("expense");

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const incomeData = useSelector((state) => state.statistics.income) || [];
  const expenseData = useSelector((state) => state.statistics.expense) || [];

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    dispatch(fetchStatistics({ month, year: selectedYear })); // Виклик API
  };

  // Викликаємо dispatch при зміні року
  const handleYearChange = (year) => {
    setSelectedYear(year);
    dispatch(fetchStatistics({ month: selectedMonth, year })); // Виклик API
  };

  useEffect(() => {
    dispatch(fetchStatistics({ month: selectedMonth, year: selectedYear }));
  }, [dispatch]);

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
          onMonthChange={handleMonthChange}
          onYearChange={handleYearChange}
        />
        <div className={s.table}>
          <StatisticsTable
            isIncome={transactionType === "income"}
            data={transactionType === "income" ? incomeData : expenseData}
          />
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
