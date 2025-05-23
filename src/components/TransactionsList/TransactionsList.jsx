import TransactionsItem from "../TransactionsItem/TransactionsItem";
import css from "./TransactionsList.module.css";
import transactions from "./transactions.json";

const TransactionsList = ({ onEdit, onDelete }) => {
  return (
    <div className={css.listContainer}>
      <div className={`${css.list} ${css.scrollContainer}`}>
       <div className={css.listHeader}>
          <div className={css.headerItem}>Date</div>
          <div className={css.headerItem}>Type</div>
          <div className={css.headerItem}>Category</div>
          <div className={css.headerItem}>Comment</div>
          <div className={css.headerItem}>Sum</div>
          
        </div>

          
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
  );
};

export default TransactionsList;
