import React, { useState } from "react";

const StatisticsPage = () => {
  const [transactionType, setTransactionType] = useState("expense");
  return (
    <div>
      <TransactionType 
        transactionType={transactionType}
        setTransactionType={setTransactionType}/>
      <Chart transactionType={transactionType}/>
    </div>
  );
};

export default StatisticsPage;
