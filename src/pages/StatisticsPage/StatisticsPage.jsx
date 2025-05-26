import React, { useState } from "react";
import TransactionType from "../../components/TransactionType/TransactionType.jsx";
import Chart from "../../components/Chart/Chart.jsx";
import StatisticsDashboard from "../../components/StatisticsDashboard/StatisticsDashboard.jsx";
import s from "./StatisticsPage.module.css";

const StatisticsPage = () => {
  const [transactionType, setTransactionType] = useState("expense");

  return (
    <div className={s.statisticDiv}>
      <div className={s.typeAndChart}>
        <div className={s.toggle}>
          <p
            className={s.toggleText}
            onClick={() => {
              setTransactionType("income");
            }}
          >
            Income
          </p>
          <TransactionType
            transactionType={transactionType}
            setTransactionType={setTransactionType}
          />
          <p
            className={s.toggleText}
            onClick={() => {
              setTransactionType("expense");
            }}
          >
            Expense
          </p>
        </div>
        <Chart transactionType={transactionType} />
      </div>

      <div className={s.dashboardAndList}>
        <StatisticsDashboard />
        <div className={s.table}>Statistic Table</div>
        {/* <StatisticsTable /> */}
      </div>
    </div>
  );
};

export default StatisticsPage;
