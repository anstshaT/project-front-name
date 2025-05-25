// import { useSelector } from "react-redux"
// import { selectTransactions } from "../../redux/auth/selectors";
import s from "./Balance.module.css";

const Balance = () => {
    // const transactions = useSelector(selectTransactions);
    // const balance = transactions.reduce((acc, t) => {
        // return t.type === 'income' ? acc + t.amount : acc - t.amount;
    // }, 0);

    return (
        <div className={s.container}>
            <h1 className={s.title}>Your balance</h1>
            <p className={s.balance}>{/*balance.toFixed(2)*/} UAH</p>
        </div>
    );
};

export default Balance;
