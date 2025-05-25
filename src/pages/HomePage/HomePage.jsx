import TransactionsList from "../../components/TransactionsList/TransactionsList";
import transactions from "../../components/TransactionsList/transactions.json"
import ButtonAddTransaction from "../../components/ButtonAddTransaction/ButtonAddTransaction.jsx"; 

const HomePage = () => {

  const handleEdit = (id) => {
    console.log("Edit transaction", id);
  };

  const handleDelete = (id) => {
    console.log("Delete transaction", id);
  };
  return (
    <div>
      <TransactionsList
       transactions={transactions}
       onEdit={handleEdit}
       onDelete={handleDelete}/>
      <ButtonAddTransaction />
    </div>
  );
};

export default HomePage;