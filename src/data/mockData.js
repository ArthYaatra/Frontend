// src/data/mockData.js — Central mock data for all modules

export const user = {
  name: 'Arjun Malhotra',
  email: 'arjun.m@arthyatra.in',
  phone: '+91 98765 43210',
  location: 'Mumbai, Maharashtra',
  tier: 'Premium HNW',
  fy: 'FY 24-25',
  avatar: null,
};

export const netWorth = {
  total: '₹ 1,42,85,200',
  todayGain: '+₹ 45,200',
  todayPct: '+0.32%',
  totalReturn: '+18.4%',
  goalPct: 78,
};

export const incomeStreams = [
  { id: 1, source: 'TechCorp Solutions', category: 'Salary', date: 'Oct 28, 2024', amount: 245000, icon: 'corporate_fare' },
  { id: 2, source: 'Vanguard Global ETF', category: 'Dividend', date: 'Oct 24, 2024', amount: 14200, icon: 'show_chart' },
  { id: 3, source: 'Studio UX Consultancy', category: 'Freelance', date: 'Oct 19, 2024', amount: 85000, icon: 'design_services' },
  { id: 4, source: 'Skyline Apartments', category: 'Rental', date: 'Oct 01, 2024', amount: 32000, icon: 'apartment' },
];

export const incomeSummary = {
  total: 4250000,
  growth: 14.2,
  activePct: 65,
  passivePct: 35,
  projectedAnnual: 12400000,
};

export const expenses = [
  { id: 1, description: 'Amazon Prime Annual', category: 'Entertainment', date: '24 Jul 2024', amount: 1499, type: 'debit' },
  { id: 2, description: 'Oberoi Dining & Bar', category: 'Food', date: '22 Jul 2024', amount: 8420, type: 'debit', flagged: true },
  { id: 3, description: 'TATA Power – Mumbai', category: 'Utilities', date: '20 Jul 2024', amount: 4250, type: 'debit' },
  { id: 4, description: 'Apollo Pharmacy', category: 'Healthcare', date: '18 Jul 2024', amount: 2100, type: 'debit' },
];

export const expenseSummary = {
  total: 142850,
  growthPct: 12,
  burnRateDaily: 4761,
  variance: 12850,
  fixedPct: 65,
  variablePct: 35,
};

export const investments = {
  totalPortfolio: 14285200,
  dayChange: 45200,
  dayChangePct: 0.32,
  totalReturn: 18.4,
  goalPct: 78,
  allocation: [
    { label: 'Stocks & Equity', pct: 42, color: 'bg-primary' },
    { label: 'Mutual Funds',    pct: 28, color: 'bg-primary-mid' },
    { label: 'Real Estate',     pct: 20, color: 'bg-secondary' },
    { label: 'Gold & Commod.',  pct: 10, color: 'bg-[#ffdcc1]' },
  ],
  watchlist: [
    { symbol: 'RELIANCE', name: 'Reliance Industries', price: '₹ 2,982.40', change: '+1.2%', positive: true, icon: 'business' },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd.',      price: '₹ 1,514.90', change: '-0.4%', positive: false, icon: 'account_balance' },
    { symbol: 'INFY',     name: 'Infosys Limited',     price: '₹ 1,489.15', change: '+0.8%', positive: true, icon: 'laptop_mac' },
  ],
};

export const loans = [
  { id: 1, name: 'HDFC Home Loan',    type: 'Home',     account: '...4521', status: 'ON TRACK', paidPct: 18, outstanding: 8500000, emi: 78400, icon: 'home',         barColor: 'bg-primary' },
  { id: 2, name: 'ICICI Auto Loan',   type: 'Auto',     account: 'BMW X5',  status: 'ON TRACK', paidPct: 62, outstanding: 3250000, emi: 22500, icon: 'directions_car',barColor: 'bg-primary' },
  { id: 3, name: 'Business Expansion',type: 'Personal', account: 'Unsecured',status: 'HIGH INT.', paidPct: 8, outstanding: 700000,  emi: 11100, icon: 'credit_score', barColor: 'bg-[#6a3a06]' },
];

export const loansSummary = {
  totalDebt: 12450000,
  avgRate: 8.4,
  monthlyEmi: 112000,
  debtEquityRatio: 0.42,
  interestSaved: 842000,
};

export const emiSchedule = [
  { date: 'Mar 02', facility: 'HDFC Home Loan',    amount: 78400, status: 'PAID' },
  { date: 'Mar 05', facility: 'ICICI Auto Loan',   amount: 22500, status: 'PAID' },
  { date: 'Mar 15', facility: 'Business Expansion',amount: 11100, status: 'PENDING' },
  { date: 'Apr 02', facility: 'HDFC Home Loan',    amount: 78400, status: 'UPCOMING' },
];

export const budgetCategories = [
  { id: 'food',   icon: 'restaurant',    label: 'Food & Dining',    spent: 24500, limit: 35000, type: 'MONTHLY',  barColor: 'bg-secondary' },
  { id: 'util',   icon: 'bolt',          label: 'Utilities',        spent: 12800, limit: 15000, type: 'FIXED',    barColor: 'bg-[#6a3a06]' },
  { id: 'travel', icon: 'flight_takeoff',label: 'Travel & Transit', spent: 4200,  limit: 12000, type: 'FLEXIBLE', barColor: 'bg-primary' },
];

export const goals = [
  { id: 1, title: 'Retirement Fund', target: 50000000, current: 12000000, date: 'Apr 2045', icon: 'beach_access', color: 'from-primary to-primary-mid', priority: 1 },
  { id: 2, title: 'Dream Residence', target: 7500000,  current: 4200000,  date: 'Dec 2026', icon: 'home',         color: 'from-[#6a3a06] to-[#86511d]',  priority: 2 },
  { id: 3, title: 'Child Education', target: 5000000,  current: 1500000,  date: 'Jun 2034', icon: 'school',       color: 'from-secondary to-secondary/70', priority: 3 },
];

export const calendarEvents = {
  10: [
    { name: 'Salary Credit',      time: '09:30 AM', amount: '+₹1,25,000', icon: 'payments',    type: 'income' },
    { name: 'Electricity Bill Due',time: 'Urgent',   amount: '₹4,250',    icon: 'bolt',        type: 'bill' },
    { name: 'SIP Auto-debit',     time: '11:00 AM', amount: '−₹15,000',  icon: 'trending_up', type: 'expense' },
  ],
  4:  [{ name: 'Netflix Auto-Renew', time: '12:00 AM', amount: '−₹649', icon: 'movie', type: 'expense' }],
  7:  [{ name: 'HDFC Card Due',      time: 'Due today', amount: '₹28,400', icon: 'credit_card', type: 'bill' }],
  15: [{ name: 'PPF Contribution',   time: '10:00 AM', amount: '−₹12,500', icon: 'savings', type: 'expense' }],
  21: [{ name: 'Rent Collection',    time: '09:00 AM', amount: '+₹32,000', icon: 'apartment', type: 'income' }],
  28: [{ name: 'HDFC EMI',           time: 'Auto-pay', amount: '−₹78,400', icon: 'home', type: 'bill' }],
};

export const recentTransactions = [
  { id: 1, name: 'TechCorp Salary',   category: 'Income',    amount: '+₹2,45,000', positive: true,  icon: 'corporate_fare', date: 'Today' },
  { id: 2, name: 'The Leela Palace',  category: 'Dining',    amount: '−₹8,420',    positive: false, icon: 'restaurant',     date: 'Yesterday' },
  { id: 3, name: 'SIP – Quant Fund',  category: 'Investment',amount: '−₹25,000',   positive: null,  icon: 'trending_up',    date: 'Oct 10' },
  { id: 4, name: 'Dividend Credit',   category: 'Income',    amount: '+₹14,200',   positive: true,  icon: 'show_chart',     date: 'Oct 08' },
];

export const upcomingBills = [
  { month: 'OCT', day: '28', name: 'HDFC Home Loan EMI', detail: '₹ 42,000 · Automated' },
  { month: 'OCT', day: '30', name: 'Tata Power Bill',    detail: '₹ 2,450 · Due in 3 days' },
  { month: 'NOV', day: '02', name: 'Netflix Premium',    detail: '₹ 649 · Subscription', dim: true },
];

export const fyProgress = { month: 5, total: 12, pct: 41.6 };
