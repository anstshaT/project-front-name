import s from "./StatisticsTable.module.css";

const incomeColors = ["#24CCA7", "#DFAD3F", "#FFD8D0"];
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

const formatSum = (sum) =>
  sum.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const StatisticsTable = ({ isIncome, data = [] }) => {
  // Використовуємо data з пропсів, а не з редаксу
  const colors = isIncome ? incomeColors : expenseColors;

  if (!data.length) {
    return <p className={s.noData}>No statistics available</p>;
  }

  // Підрахунок загальної суми по цій категорії
  const total = data.reduce((acc, item) => acc + item.total, 0);

  return (
    <div className={s.container}>
      <ul className={s.titleList}>
        <li>Category</li>
        <li>Sum</li>
      </ul>

      <ul className={s.list}>
        {data.map((item, i) => (
          <li className={s.item} key={item.categoryId}>
            <div
              className={s.colorBox}
              style={{ backgroundColor: colors[i % colors.length] }}
            />
            <div className={s.textWrapper}>
              <p className={s.name}>{item.title}</p>
              <p className={s.sum}>{formatSum(item.total).replace(",", " ")}</p>
            </div>
          </li>
        ))}
      </ul>

      <p className={s.total}>
        {isIncome ? "Incomes:" : "Expenses:"}{" "}
        <span className={isIncome ? s.income : s.expense}>
          {formatSum(total).replace(",", " ")}
        </span>
      </p>
    </div>
  );
};

export default StatisticsTable;
