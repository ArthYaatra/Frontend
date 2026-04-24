// src/pages/Budget.jsx
import { Card, CardContent, ProgressBar, Icon, Badge } from '../components/ui/index.jsx';
import { Button } from '../components/ui/Button.jsx';
import { budgetCategories, goals, fyProgress } from '../data/mockData.js';

const TYPE_STYLE = {
  MONTHLY:  'bg-[#cae8eb] text-[#011f22]',
  FIXED:    'bg-[#ffdcc1] text-[#6b3b06]',
  FLEXIBLE: 'bg-[#a9edff] text-[#004e5c]',
};

const ANOMALIES = [
  { dot: 'bg-secondary', cat: 'Dining', tx: 'Fine Dining – The Leela Palace', impact: '+ ₹ 8,400', err: true, status: 'LIMIT REACHED' },
  { dot: 'bg-primary', cat: 'Travel', tx: 'Monthly Fuel Top-up', impact: '₹ 4,000', err: false, status: 'PLANNED' },
];

function GoalCard({ goal }) {
  const pct = Math.round((goal.current / goal.target) * 100);
  return (
    <Card>
      <CardContent>
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${goal.color} flex items-center justify-center mb-4`}>
          <Icon name={goal.icon} size={20} className="text-white" />
        </div>
        <p className="font-headline text-base font-bold text-[#164e5f] mb-1">{goal.title}</p>
        <p className="text-xs text-on-surface-variant mb-4">Target: {goal.date}</p>
        <div className="flex justify-between items-end mb-2">
          <div>
            <p className="text-2xs text-on-surface-variant uppercase tracking-widest">Progress</p>
            <p className="font-headline text-lg font-extrabold text-on-surface">₹ {(goal.current / 100000).toFixed(1)}L</p>
          </div>
          <span className="font-headline text-xl font-bold text-primary">{pct}%</span>
        </div>
        <ProgressBar value={pct} height="h-2" />
        <p className="text-xs text-on-surface-variant mt-2 italic">
          ₹ {((goal.target - goal.current) / 100000).toFixed(1)}L remaining
        </p>
      </CardContent>
    </Card>
  );
}

export default function Budget() {
  return (
    <div className="page-shell">
      {/* FY Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-2">
        <div>
          <h1 className="font-headline text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">Budget & Strategic Goals</h1>
          <p className="text-sm sm:text-base text-on-surface-variant mt-1">Editorial view of your monthly allocation and capital objectives for FY 24-25.</p>
        </div>
        <div className="bg-surface-low p-4 sm:p-5 rounded-2xl w-full md:w-auto md:min-w-[240px]">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-1 text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
            <span>FY 24-25 Cycle</span>
            <span>Month {fyProgress.month} of {fyProgress.total}</span>
          </div>
          <ProgressBar value={fyProgress.pct} />
          <p className="text-2xs text-on-surface-variant text-right mt-1">{fyProgress.pct}% Completed</p>
        </div>
      </div>

      {/* Budget Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {budgetCategories.map(cat => {
          const pct = Math.round((cat.spent / cat.limit) * 100);
          return (
            <Card key={cat.id}>
              <CardContent>
                <div className="flex justify-between items-start mb-5">
                  <div className={`p-3 rounded-xl ${cat.id === 'food' ? 'bg-secondary-container text-secondary' : cat.id === 'util' ? 'bg-[#ffdcc1] text-[#6b3b06]' : 'bg-[#a9edff] text-[#004e5c]'}`}>
                    <Icon name={cat.icon} size={22} />
                  </div>
                  <span className={`text-2xs font-bold px-2 py-1 rounded ${TYPE_STYLE[cat.type]}`}>{cat.type}</span>
                </div>
                <p className="font-headline text-lg font-bold text-[#164e5f] mb-1">{cat.label}</p>
                <div className="flex flex-col items-start gap-1 mb-4">
                  <span className="font-headline text-2xl font-extrabold text-on-surface">
                    ₹ {cat.spent.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-on-surface-variant">of ₹ {cat.limit.toLocaleString('en-IN')}</span>
                </div>
                <ProgressBar value={pct} color={cat.barColor} height="h-2" />
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 mt-2 text-xs font-medium text-on-surface-variant">
                  <span>{pct}% Utilized</span>
                  <span className="text-primary font-bold">₹ {(cat.limit - cat.spent).toLocaleString('en-IN')} Left</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Goals */}
      <div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-4">
          <div>
            <h2 className="font-headline text-2xl font-extrabold text-[#164e5f]">Long-term Capital Goals</h2>
            <p className="text-sm text-on-surface-variant mt-0.5">Wealth accumulation strategy and milestone tracking.</p>
          </div>
          <Button variant="ghost" size="sm">Manage All Goals</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {goals.map(goal => <GoalCard key={goal.id} goal={goal} />)}
        </div>
      </div>

      {/* Anomalous Activity */}
      <Card>
        <div className="px-4 sm:px-6 py-4 border-b border-surface-container flex justify-between items-center">
          <h3 className="font-headline text-base font-bold text-[#164e5f]">Anomalous Activity</h3>
          <Icon name="filter_list" size={20} className="text-on-surface-variant" />
        </div>
        <div className="sm:hidden p-4 space-y-3">
          {ANOMALIES.map(item => (
            <div key={item.cat} className="rounded-2xl border border-outline-variant/20 bg-surface-low p-4">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className={`w-2.5 h-2.5 rounded-full ${item.dot}`} />
                  <div>
                    <p className="font-bold text-on-surface">{item.cat}</p>
                    <p className="text-xs text-on-surface-variant">{item.tx}</p>
                  </div>
                </div>
                <Badge variant={item.err ? 'error' : 'default'}>{item.status}</Badge>
              </div>
              <div className="rounded-xl bg-white p-3">
                <p className="text-2xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">Impact on Budget</p>
                <p className={`font-bold ${item.err ? 'text-error' : 'text-primary'}`}>{item.impact}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden sm:block responsive-table">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-surface-low">
              {['Category', 'Transaction', 'Impact on Budget', 'Status'].map((h, i) => (
                <th key={h} className={`px-6 py-3 text-2xs font-bold uppercase tracking-widest text-on-surface-variant ${i >= 2 ? 'text-right' : ''}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            {ANOMALIES.map(a => (
              <tr key={a.cat} className="hover:bg-surface-low transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-2 h-2 rounded-full ${a.dot}`} />
                    <span className="text-sm font-semibold">{a.cat}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">{a.tx}</td>
                <td className={`px-6 py-4 text-sm font-medium text-right ${a.err ? 'text-error' : ''}`}>{a.impact}</td>
                <td className="px-6 py-4 text-right">
                  <span className={`text-2xs font-bold px-2 py-1 rounded ${a.err ? 'bg-error-container text-error' : 'bg-surface-highest text-on-surface-variant'}`}>
                    {a.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </Card>
    </div>
  );
}
