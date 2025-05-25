import clsx from "clsx";
import s from "./TransactionType.module.css";

import IconIncome from "../../images/income.svg";
import IconExpense from "../../images/expense.svg";

const TransactionType = ({ transactionType, setTransactionType }) => {
  const handleTypeChange = (evt) => {
    setTransactionType(evt.target.value);
    console.log(evt.target.value);
  };

  return (
    <div className={s.transactionTypeWrapper}>

      <div className={s.typeToggle}>
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
    </div>
  );
};

export default TransactionType;
