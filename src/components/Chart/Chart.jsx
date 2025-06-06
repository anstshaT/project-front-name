import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import s from "./Chart.module.css";
import { useSelector } from "react-redux";
import { selectTransactions } from "../../redux/transactions/transactionsSelector";
import {
  totalExpenseSelector,
  totalIncomeSelector,
} from "../../redux/statistics/statisticsSelectors";

const incomeColors = ["#DFAD3F"];
const expenseColors = [
  "#DFAD3F",
  "#FFD8D0",
  "#FD9498",
  "#C5BAFF",
  "#6E78E8",
  "#4A56E2",
  "#81E1FF",
  "#24CCA7",
  "#00AD84",
];

const Chart = ({ transactionType, data = [] }) => {
  const transactions = useSelector(selectTransactions);

  const totalIncome = useSelector(totalIncomeSelector) || 0;
  const totalExpense = useSelector(totalExpenseSelector) || 0;

  const groupedData = transactions
    .filter((tx) => tx.transactionType === transactionType)
    .reduce((acc, tx) => {
      const category = tx.categories;
      const amount = Number(tx.summ);
      if (!category || isNaN(amount)) return acc;

      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += amount;
      return acc;
    }, {});

  const chartData = Object.entries(groupedData).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = transactionType === "income" ? incomeColors : expenseColors;

  if (chartData.length === 0 || !data.length) {
    return <p className={s.text}>No data to display</p>;
  }

  return (
    <div className={s.pieContainer}>
      <ResponsiveContainer width="100%" aspect={1}>
        <PieChart>
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="20"
            fontWeight="bold"
            fill="#fcfcfc"
          >
            {"₴ " +
              (transactionType === "expense"
                ? totalExpense.toLocaleString()
                : totalIncome.toLocaleString())}
          </text>
          <Pie
            data={chartData}
            innerRadius="70%"
            outerRadius="103%"
            fill="#8884d8"
            paddingAngle={0}
            dataKey="value"
            stroke="none"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
