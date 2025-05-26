import { useEffect, useState } from "react";
import TransactionsItem from "../TransactionsItem/TransactionsItem";
import css from "./TransactionsList.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectError,
  selectLoading,
  selectTransactions,
} from "../../redux/transactions/transactionsSlice";
import { fetchTransactions } from "../../redux/transactions/transactionsOps";
import ClipLoader from "react-spinners/ClipLoader";
import toast from "react-hot-toast";

const TransactionsList = () => {
  const transactions = useSelector(selectTransactions);
  const dispatch = useDispatch();
  const [hasScroll, setHasScroll] = useState(false);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(transactions)) {
      setHasScroll(transactions.length > 5);
    }
  }, [transactions]);

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          height: "200px",
        }}
      >
        <ClipLoader size={50} color="#36d7b7" />
      </div>
    );
  }
  console.log(
    "Transactions IDs:",
    transactions.map((item) => item._id)
  );

  return (
    <div className={css.listContainer}>
      <div className={`${css.list} ${hasScroll ? css.withScroll : ""}`}>
        <div className={css.listHeader}>
          <div className={css.headerItem}>Date</div>
          <div className={css.headerItem}>Type</div>
          <div className={css.headerItem}>Category</div>
          <div className={css.headerItem}>Comment</div>
          <div className={css.headerItem}>Sum</div>
        </div>

        <div className={css.scrollContainer}>
          {Array.isArray(transactions) && transactions.length > 0 ? (
            <ul className={css.listBody}>
              {transactions.map((item) => (
                <TransactionsItem key={item._id} transaction={item} />
              ))}
            </ul>
          ) : (
            <div className={css.emptyMessage}>No transactions yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionsList;
