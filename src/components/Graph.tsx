import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';
import {Title3} from '../constants/Typography';
import {n} from '../constants/normalize';
import {FilterTabs} from './CustomTabs';

const {width: screenWidth} = Dimensions.get('window');

// Types
interface Expense {
  id?: string;
  date: string; // Format: 'YYYY-MM-DD'
  amount: number;
  category: string;
  description?: string;
}

interface GraphData {
  label: string;
  value: number;
}

interface FilterTabsProps {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
}

interface ExpenseGraphProps {
  expenses: Expense[];
  selectedPeriod: 'Today' | 'Week' | 'Month' | 'Year';
  style?: ViewStyle;
}

const ExpenseGraph: React.FC<ExpenseGraphProps> = ({
  expenses,
  selectedPeriod,
  style,
}) => {
  const graphWidth = screenWidth;
  const graphHeight = 120;

  // Process expenses based on selected period
  const processedData: GraphData[] = useMemo(() => {
    const today = new Date();

    const getDateString = (date: Date): string => {
      return date.toISOString().split('T')[0];
    };

    const filterExpensesByDate = (
      startDate: Date,
      endDate: Date,
    ): Expense[] => {
      return expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= startDate && expenseDate <= endDate;
      });
    };

    switch (selectedPeriod) {
      case 'Today': {
        // Group by hours for today (last 8 hours)
        const todayStr = getDateString(today);
        const todayExpenses = expenses.filter(
          expense => expense.date === todayStr,
        );

        // Create hourly data for last 8 hours
        const hourlyData: GraphData[] = [];
        for (let i = 7; i >= 0; i--) {
          const hour = today.getHours() - i;
          const displayHour = hour < 0 ? 24 + hour : hour;
          const hourStr = `${displayHour.toString().padStart(2, '0')}:00`;

          // For demo purposes, distribute today's expenses across hours
          // In real implementation, you'd have timestamp data
          const hourlyAmount =
            todayExpenses.length > 0
              ? (todayExpenses.reduce((sum, exp) => sum + exp.amount, 0) / 8) *
                (Math.random() * 0.5 + 0.5)
              : 0;

          hourlyData.push({
            label: hourStr,
            value: hourlyAmount,
          });
        }
        return hourlyData;
      }

      case 'Week': {
        // Group by days for last 7 days
        const weekData: GraphData[] = [];
        for (let i = 6; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(today.getDate() - i);
          const dateStr = getDateString(date);

          const dayExpenses = expenses.filter(
            expense => expense.date === dateStr,
          );
          const totalAmount = dayExpenses.reduce(
            (sum, expense) => sum + expense.amount,
            0,
          );

          weekData.push({
            label: date.toLocaleDateString('en', {weekday: 'short'}),
            value: totalAmount,
          });
        }
        return weekData;
      }

      case 'Month': {
        // Group by weeks for last 4 weeks
        const monthData: GraphData[] = [];
        for (let i = 3; i >= 0; i--) {
          const endDate = new Date(today);
          endDate.setDate(today.getDate() - i * 7);
          const startDate = new Date(endDate);
          startDate.setDate(endDate.getDate() - 6);

          const weekExpenses = filterExpensesByDate(startDate, endDate);
          const totalAmount = weekExpenses.reduce(
            (sum, expense) => sum + expense.amount,
            0,
          );

          monthData.push({
            label: `W${4 - i}`,
            value: totalAmount,
          });
        }
        return monthData;
      }

      case 'Year': {
        // Group by months for last 6 months
        const yearData: GraphData[] = [];
        for (let i = 5; i >= 0; i--) {
          const date = new Date(today);
          date.setMonth(today.getMonth() - i);

          const monthExpenses = expenses.filter(expense => {
            const expenseDate = new Date(expense.date);
            return (
              expenseDate.getMonth() === date.getMonth() &&
              expenseDate.getFullYear() === date.getFullYear()
            );
          });

          const totalAmount = monthExpenses.reduce(
            (sum, expense) => sum + expense.amount,
            0,
          );

          yearData.push({
            label: date.toLocaleDateString('en', {month: 'short'}),
            value: totalAmount,
          });
        }
        return yearData;
      }

      default:
        return [];
    }
  }, [expenses, selectedPeriod]);

  // Create smooth curve path
  const createSmoothPath = (points: {x: number; y: number}[]): string => {
    if (points.length < 2) return '';

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];

      // Calculate control points for smooth curve
      const cp1x = prev.x + (curr.x - prev.x) * 0.4;
      const cp1y = prev.y;
      const cp2x = curr.x - (curr.x - prev.x) * 0.4;
      const cp2y = curr.y;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
    }

    return path;
  };

  // Check if there's data to display
  const hasData = processedData.some(item => item.value > 0);
  const maxValue = Math.max(...processedData.map(d => d.value), 1);

  // Convert data to SVG points
  const points = processedData.map((item, index) => ({
    x:
      processedData.length > 1
        ? (index / (processedData.length - 1)) * graphWidth
        : graphWidth / 2,
    y: hasData
      ? graphHeight - (item.value / maxValue) * (graphHeight - 20)
      : graphHeight / 2,
  }));

  const curvePath = createSmoothPath(points);
  const areaPath =
    processedData.length > 1
      ? `${curvePath} L ${graphWidth} ${graphHeight} L 0 ${graphHeight} Z`
      : '';

  return (
    <View style={[styles.graphContainer, style]}>
      <Title3 style={styles.title}>Spend Frequency</Title3>
      {hasData ? (
        <>
          <View style={styles.svgContainer}>
            <Svg width={graphWidth} height={graphHeight} style={styles.svg}>
              <Defs>
                <LinearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <Stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
                  <Stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.05" />
                </LinearGradient>
              </Defs>

              {/* Area fill */}
              {areaPath && <Path d={areaPath} fill="url(#gradient)" />}

              {/* Curve line */}
              <Path
                d={curvePath}
                stroke="#8B5CF6"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>

          <View style={styles.labelsContainer}>
            {processedData.map((item, index) => (
              <Text key={`${item.label}-${index}`} style={styles.label}>
                {item.label}
              </Text>
            ))}
          </View>
        </>
      ) : (
        <View style={[styles.svgContainer, {justifyContent: 'center'}]}>
          <Text style={styles.noDataText}>
            No expenses for {selectedPeriod.toLowerCase()}
          </Text>
        </View>
      )}
    </View>
  );
};

// Main Graph Component
const Graph: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<
    'Today' | 'Week' | 'Month' | 'Year'
  >('Today');

  // Sample expense data - replace with your actual data
  const [expenses] = useState<Expense[]>([
    {
      id: '1',
      date: '2025-07-07',
      amount: 50,
      category: 'Food',
      description: 'Lunch',
    },
    {
      id: '2',
      date: '2025-07-07',
      amount: 30,
      category: 'Transport',
      description: 'Bus fare',
    },
    {
      id: '3',
      date: '2025-07-06',
      amount: 80,
      category: 'Shopping',
      description: 'Groceries',
    },
    {
      id: '4',
      date: '2025-07-05',
      amount: 25,
      category: 'Food',
      description: 'Coffee',
    },
    {
      id: '5',
      date: '2025-07-04',
      amount: 120,
      category: 'Entertainment',
      description: 'Movie',
    },
    {
      id: '6',
      date: '2025-07-03',
      amount: 45,
      category: 'Food',
      description: 'Dinner',
    },
    {
      id: '7',
      date: '2025-07-02',
      amount: 60,
      category: 'Transport',
      description: 'Taxi',
    },
    {
      id: '8',
      date: '2025-07-01',
      amount: 90,
      category: 'Shopping',
      description: 'Clothes',
    },
    {
      id: '9',
      date: '2025-06-30',
      amount: 70,
      category: 'Food',
      description: 'Restaurant',
    },
    {
      id: '10',
      date: '2025-06-29',
      amount: 40,
      category: 'Transport',
      description: 'Gas',
    },
    {
      id: '11',
      date: '2025-06-28',
      amount: 65,
      category: 'Shopping',
      description: 'Books',
    },
    {
      id: '12',
      date: '2025-06-27',
      amount: 35,
      category: 'Food',
      description: 'Breakfast',
    },
  ]);

  // Calculate total for selected period
  const getTotalExpense = (): number => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    switch (selectedTab) {
      case 'Today':
        return expenses
          .filter(expense => expense.date === todayStr)
          .reduce((sum, expense) => sum + expense.amount, 0);

      case 'Week':
        const weekAgo = new Date(today);
        weekAgo.setDate(today.getDate() - 7);
        return expenses
          .filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate >= weekAgo && expenseDate <= today;
          })
          .reduce((sum, expense) => sum + expense.amount, 0);

      case 'Month':
        const monthAgo = new Date(today);
        monthAgo.setMonth(today.getMonth() - 1);
        return expenses
          .filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate >= monthAgo && expenseDate <= today;
          })
          .reduce((sum, expense) => sum + expense.amount, 0);

      case 'Year':
        const yearAgo = new Date(today);
        yearAgo.setFullYear(today.getFullYear() - 1);
        return expenses
          .filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate >= yearAgo && expenseDate <= today;
          })
          .reduce((sum, expense) => sum + expense.amount, 0);

      default:
        return 0;
    }
  };

  return (
    <View>
      <ExpenseGraph expenses={expenses} selectedPeriod={selectedTab} />
      <FilterTabs
        options={['Today', 'Week', 'Month', 'Year']}
        selected={selectedTab}
        onSelect={option =>
          setSelectedTab(option as 'Today' | 'Week' | 'Month' | 'Year')
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  periodLabel: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 5,
  },

  graphContainer: {padding: n(20)},
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  svgContainer: {
    alignItems: 'center',
    marginBottom: 16,
    height: 120,
  },
  svg: {
    overflow: 'visible',
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  label: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    textAlign: 'center',
  },
  noDataText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default Graph;
