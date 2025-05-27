import clsx from "clsx";
import s from "./TransactionType.module.css";

import IconIncome from "../../images/income.svg";
import IconExpense from "../../images/expense.svg";

const TransactionType = ({ transactionType, setTransactionType, disabled }) => {
  const handleChange = (type) => {
    if (disabled || transactionType === type) return;
    setTransactionType(type);
  };

  const isIncome = transactionType === "income";
  const currentIcon = isIncome ? IconIncome : IconExpense;
  const nextType = isIncome ? "expense" : "income";

  return (
    <div className={s.transactionTypeWrapper}>
      <input
        type="radio"
        name="transactionType"
        value="income"
        checked={isIncome}
        onChange={() => handleChange("income")}
        className={s.radio}
        disabled={disabled}
      />
      <input
        type="radio"
        name="transactionType"
        value="expense"
        checked={!isIncome}
        onChange={() => handleChange("expense")}
        className={s.radio}
        disabled={disabled}
      />

      <div
        className={clsx(s.iconWrapper)}
        onClick={() => handleChange(nextType)}
      >
        <img
          src={currentIcon}
          alt={isIncome ? "Income" : "Expense"}
          className={s.sliderIcon}
        />
      </div>
    </div>
  );
};

export default TransactionType;