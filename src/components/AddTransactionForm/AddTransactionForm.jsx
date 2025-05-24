import TransactionType from "../TransactionType/TransactionType";
import DatePicker from "react-datepicker";
import s from "./AddTransactionForm.module.css";
import AddIncomeForm from "../AddIncomeForm/AddIncomeForm";
import AddExpenseForm from "../AddExpenseForm/AddExpenseForm";
import { useState } from "react";

const AddTransactionForm = ({ onCancel }) => {
  const [transactionType, setTransactionType] = useState("expense");

  return (
    <div className={s.div}>
      <h1 className={s.title}>Add transaction</h1>
      <div className={s.toggle}>
        <p className={s.toggleText}>Income</p>
        <TransactionType
          className={s.toggle}
          transactionType={transactionType}
          setTransactionType={setTransactionType}
        />
        <p className={s.toggleText}>Expense</p>
      </div>

      {transactionType === "expense" ? (
        <AddExpenseForm onCancel={onCancel} />
      ) : (
        <AddIncomeForm onCancel={onCancel} />
      )}
    </div>
  );
};

export default AddTransactionForm;
