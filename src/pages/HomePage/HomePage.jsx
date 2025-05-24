import Header from "../../components/Header/Header.jsx";
import ButtonAddTransaction from "../../components/ButtonAddTransaction/ButtonAddTransaction.jsx";
import { Navigation } from "../../components/Navigation/Navigation.jsx";

const HomePage = () => {
  return (
    <div>
      <Header />
      <Navigation />
      <ButtonAddTransaction />
    </div>
  );
};
export default HomePage;