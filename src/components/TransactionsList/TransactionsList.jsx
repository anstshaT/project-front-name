import { useEffect, useState } from "react";
import TransactionsItem from "../TransactionsItem/TransactionsItem";
import css from "./TransactionsList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectTransactions } from "../../redux/transactions/transactionsSlice";
import {  fetchTransactions } from "../../redux/transactions/transactionsOps";

const TransactionsList = () => {
  const transactions = useSelector(selectTransactions);
  const dispatch = useDispatch();
  const [hasScroll, setHasScroll] = useState(false);

  useEffect(() => {
    dispatch(fetchTransactions())
   }, [dispatch]); 

   useEffect(() => {
    setHasScroll(transactions.length > 5);
  }, [transactions]);

  

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
                
              />
            ))}
          </ul>
        </div>
      </div>
      </div>
  );
};

export default TransactionsList;
