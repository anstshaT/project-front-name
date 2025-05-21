import clsx from "clsx";
import { useState } from "react";
import s from "./TransactionType.module.css";

import IconIncome from "../../images/income.svg";
import IconExpense from "../../images/expense.svg";

const TransactionType = () => {
  const [transactionType, setTransactionType] = useState("income");

  const handleTypeChange = (evt) => {
    setTransactionType(evt.target.value);
  };

  return (
    <div className={s.transactionTypeWrapper}>
      <label
        className={clsx(s.typeLabel, { active: transactionType === "income" })}
      >
        Income
      </label>

      <div className={s.typeToggle}>
        <div className={s.radioButton}>
          <input
            type="radio"
            name="transactionType"
            value="income"
            checked={transactionType === "income"}
            onChange={handleTypeChange}
            className={s.input}
          />
        </div>
        <div className={s.radioButton}>
          <input
            type="radio"
            name="transactionType"
            value="expense"
            checked={transactionType === "expense"}
            onChange={handleTypeChange}
            className={s.input}
          />
        </div>
      </div>

      <div
        className={clsx(s.slider, {
          income: transactionType === "income",
          expense: transactionType === "expense",
        })}
      >
        {transactionType === "income" ? (
          <img src={IconIncome} alt="Income" className={s.sliderIcon} />
        ) : (
          <img src={IconExpense} alt="Expense" className={s.sliderIcon} />
        )}
      </div>
      <label
        className={clsx(s.typeLabel, { active: transactionType === "income" })}
      >
        Expense
      </label>
    </div>
  );
};

export default TransactionType;
