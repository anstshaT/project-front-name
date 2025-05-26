import { useSelector } from "react-redux";
import s from "./Balance.module.css";
import { selectUser } from "../../redux/user/userSelector";

const Balance = () => {
  const user = useSelector(selectUser);
  const balance = user?.balance;

  console.log("Balance", balance);

  return (
    <div className={s.container}>
      <h1 className={s.title}>Your balance</h1>
      <p className={s.balance}>{balance ? balance : 0} UAH</p>
    </div>
  );
};

export default Balance;
