import imageConstants from '../constants/imageConstants';
import {carouselDataType} from '../types/type';

export const carouselData: carouselDataType[] = [
  {
    image: imageConstants.variantGain,
    title: 'Gain total control of your money',
    desc: 'Become your own money manager and make every cent count',
  },
  {
    image: imageConstants.variantMoney,
    title: 'Know where your money goes',
    desc: 'Track your transaction easily, with categories and financial report ',
  },
  {
    image: imageConstants.variantPlanning,
    title: 'Planning ahead',
    desc: 'Setup your budget for each category so you in control',
  },
];

// Sample expense data - replace with your actual data
export const Expense = [
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
];
interface notifyType {
  id: number;
  title: string;
  desc: string;
  time: string;
}
export const notify: notifyType[] = [
  {
    id: 1,
    title: 'Shopping budget has exceeded...',
    desc: 'Your shopping budget has exceeded the limit.',
    time: '19:30',
  },
  {
    id: 2,
    title: 'New payment request received',
    desc: 'You have a new payment request from John.',
    time: '18:15',
  },
  {
    id: 3,
    title: 'Goal reminder: Save for vacation',
    desc: 'Don’t forget to add funds to your vacation goal.',
    time: '17:42',
  },
  {
    id: 4,
    title: 'Your bill is due tomorrow',
    desc: 'Electricity bill is due tomorrow. Avoid late fees.',
    time: '14:10',
  },
  {
    id: 5,
    title: 'Spending report available',
    desc: 'Your weekly spending report is ready to view.',
    time: '10:25',
  },
];

export const frequencyOptions = [
  {label: 'Yearly', value: 'yearly'},
  {label: 'Monthly', value: 'monthly'},
  {label: 'Weekly', value: 'weekly'},
  {label: 'Daily', value: 'daily'},
];

export const endOptions = [
  {label: 'Date', value: 'date'},
  {label: 'Indefinitely', value: 'indefinitely'},
];

export const monthOptions = [
  {label: 'Jan', value: 'Jan'},
  {label: 'Feb', value: 'Feb'},
  {label: 'Mar', value: 'Mar'},
  {label: 'Apr', value: 'Apr'},
  {label: 'May', value: 'May'},
  {label: 'Jun', value: 'Jun'},
  {label: 'Jul', value: 'Jul'},
  {label: 'Aug', value: 'Aug'},
  {label: 'Sep', value: 'Sep'},
  {label: 'Oct', value: 'Oct'},
  {label: 'Nov', value: 'Nov'},
  {label: 'Dec', value: 'Dec'},
];

export const dayOptions = Array.from({length: 31}, (_, i) => ({
  label: `${i + 1}`,
  value: `${i + 1}`,
}));
