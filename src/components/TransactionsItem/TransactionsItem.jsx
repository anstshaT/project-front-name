import css from "./TransactionsItem.module.css"
import { MdOutlineEdit } from "react-icons/md";


const TransactionsItem = ({ transaction, onEdit, onDelete }) => {
    return (
        <li className={`${css.transactionItem} ${
            transaction.type === 'income' ? css.incomeLine : css.expenseLine
          }`}>
            <div className={css.field}>
                <span className={css.label}>Date</span>
                <span className={css.value}>{transaction.date}</span>
            </div>

           <div className={css.field}>
                <span className={css.label}>Type</span>
                <span className={css.amount}>
                {transaction.type === 'income' ? '+' : '-'}</span>
           </div>

           <div className={css.field}>
                <span className={css.label}>Category</span>
                <span className={css.value}>{transaction.category}</span>
           </div>

           <div className={css.field}>
                <span className={css.label}>Comment</span>
                <span className={css.value}>{transaction.comment}</span>
           </div>

           <div className={css.field}>
                <span className={css.label}>Sum</span>
                <span className={`${css.value} ${transaction.type === 'income' ? css.income : css.expense}`}>{transaction.amount.toFixed(2)}</span>
          </div>
          <div className={css.actions}>
        {onDelete && (
          <button className={css.deleteBtn} onClick={() => onDelete(transaction.id)}>Delete</button>
        )}
            {onEdit && (
          <button className={css.editBtn} onClick={() => onEdit(transaction.id)}><MdOutlineEdit style={{ marginRight: '4px' }}/><span className={css.editText}>Edit</span></button>
        )}
        
            
        </div>

          
         </li>
         

         
    )

    
    
}

export default TransactionsItem;