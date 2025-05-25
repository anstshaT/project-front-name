import React, { useState } from "react";
import TransactionType from "../../components/TransactionType/TransactionType";
import Chart from "../../components/Chart/Chart";

const StatisticsPage = () => {
  const [transactionType, setTransactionType] = useState("expense");
  return (
    <div>
      <TransactionType
        transactionType={transactionType}
        setTransactionType={setTransactionType}
      />
      <Chart transactionType={transactionType} />
    </div>
  );
};

export default StatisticsPage;
