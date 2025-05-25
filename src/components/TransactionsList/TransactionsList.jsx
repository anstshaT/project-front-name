import { useEffect, useState } from "react";
import TransactionsItem from "../TransactionsItem/TransactionsItem";
import css from "./TransactionsList.module.css";
import transactions from "./transactions.json";

const TransactionsList = ({ onEdit, onDelete }) => {
  const [hasScroll, setHasScroll] = useState(false);

  useEffect(() => {
    if (transactions.length > 5) {
      setHasScroll(true);
    } else {
      setHasScroll(false);
    }
  }, []); 

  return (
    <div className={css.listContainer}>
      <div className={`${css.list} ${hasScroll ? css.withScroll : ''}`}>
        <div className={css.listHeader}>
          <div className={css.headerItem}>Date</div>
          <div className={css.headerItem}>Type</div>
          <div className={css.headerItem}>Category</div>
          <div className={css.headerItem}>Comment</div>
          <div className={css.headerItem}>Sum</div>
        </div>

        <div className={css.scrollContainer}>
          <ul className={css.listBody}>
            {transactions.map((item) => (
              <TransactionsItem
                key={item.id}
                transaction={item}
                onEdit={onEdit}
                onDelete={onDelete}
                
              />
            ))}
          </ul>
        </div>
      </div>
      </div>
  );
};

export default TransactionsList;
