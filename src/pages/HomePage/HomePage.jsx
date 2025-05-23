import Header from "../../components/Header/Header";
import TransactionsList from "../../components/TransactionsList/TransactionsList";
import transactions from "../../components/TransactionsList/transactions.json"

const HomePage = () => {

  const handleEdit = (id) => {
    console.log("Edit transaction", id);
  };

  const handleDelete = (id) => {
    console.log("Delete transaction", id);
  };
  return (
    <div>
      <Header />
      <TransactionsList
       transactions={transactions}
       onEdit={handleEdit}
       onDelete={handleDelete}/>
    </div>
  );
};
export default HomePage;
