import { PieChart, Pie, Cell, ResponsiveContainer} from 'recharts';
import s from './Chart.module.css';

const incomeData = [
  { name: 'Other', value: 400 },
  { name: 'Salary', value: 300 },
  { name: 'Freelance', value: 300 },
];

const expenseData = [
  { name: 'Main expenses', value: 400 },
  { name: 'Products', value: 300 },
  { name: 'Car', value: 300 },
  { name: 'Self care', value: 300 },
  { name: 'Child care', value: 300 },
  { name: 'Household products', value: 300 },
  { name: 'Education', value: 300 },
  { name: 'Leisure', value: 300 },
  { name: 'Other expenses', value: 300 },
];
const incomeColors = ['#24CCA7', '#DFAD3F', '#FFD8D0'];
const expenseColors = ['#DFAD3F', '#FFD8D0', '#FD9498', '#C5BAFF', '#6E78E8', '#4A56E2', '#81E1FF', '#24CCA7', '#00AD84']

const Chart = ({ transactionType }) => {
    const data = transactionType === 'income' ? incomeData : expenseData;
    const COLORS = transactionType === 'income' ? incomeColors : expenseColors;

      return (
        <div className={s.pieContainer}>
        <ResponsiveContainer width="100%" aspect={1}>
          <PieChart>
            <Pie
              data={data}
              innerRadius="70%"
              outerRadius="103%"
              fill="#8884d8"
              paddingAngle={0}
              dataKey="value"
              stroke="none"
              >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
        ))}
      </Pie>
    </PieChart>
    </ResponsiveContainer>
      </div>
  );
}
export default Chart;