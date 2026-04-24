// src/pages/Dashboard.jsx
import { useState } from 'react';
import { Card, CardContent, CardHeader, StatCard, PageHeader, ProgressBar, Badge, Icon, SectionHeader } from '../components/ui/index.jsx';
import { Button } from '../components/ui/Button.jsx';
import { netWorth, recentTransactions, upcomingBills, fyProgress } from '../data/mockData.js';

const CASHFLOW = [
  { m: 'Apr', i: 85, e: 60 }, { m: 'May', i: 80, e: 55 },
  { m: 'Jun', i: 90, e: 40 }, { m: 'Jul', i: 82, e: 65 },
  { m: 'Aug', i: 88, e: 45 }, { m: 'Sep', i: 95, e: 50 },
];

function CashFlowChart() {
  const [view, setView] = useState('Monthly');
  return (
    <Card>
      <CardContent>
        <CardHeader
          title="Cash Flow Analysis"
          subtitle="Income vs Expenses · FY 24-25"
          action={
            <div className="flex bg-surface-low rounded-lg p-1 gap-0.5">
              {['Monthly', 'Quarterly'].map(v => (
                <button key={v} onClick={() => setView(v)}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${view === v ? 'bg-white shadow-sm text-on-surface' : 'text-on-surface-variant'}`}>
                  {v}
                </button>
              ))}
            </div>
          }
        />
        <div className="flex items-end gap-3 h-44">
          {CASHFLOW.map(m => (
            <div key={m.m} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex gap-0.5 items-end h-36">
                <div className="flex-1 rounded-t-sm bg-primary/70 transition-all" style={{ height: `${m.i}%` }} />
                <div className="flex-1 rounded-t-sm bg-tertiary/50 transition-all" style={{ height: `${m.e}%` }} />
              </div>
              <span className="text-2xs font-bold text-on-surface-variant uppercase tracking-wide">{m.m}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-5 mt-4">
          {[{c:'bg-primary/70', l:'Income'},{c:'bg-tertiary/50', l:'Expenses'}].map(l => (
            <div key={l.l} className="flex items-center gap-2 text-xs text-on-surface-variant">
              <div className={`w-3 h-3 rounded-sm ${l.c}`} />{l.l}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function RecentTransactions() {
  return (
    <Card>
      <CardContent>
        <SectionHeader title="Recent Transactions" action={<Button variant="ghost" size="sm" iconRight="arrow_forward">View All</Button>} />
        <div className="space-y-1">
          {recentTransactions.map(tx => (
            <div key={tx.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-low transition-colors group">
              <div className="w-9 h-9 rounded-xl bg-surface-low flex items-center justify-center flex-shrink-0 text-primary">
                <Icon name={tx.icon} size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-on-surface truncate">{tx.name}</p>
                <p className="text-xs text-on-surface-variant">{tx.category} · {tx.date}</p>
              </div>
              <span className={`text-sm font-bold ${tx.positive === true ? 'text-[#059669]' : tx.positive === false ? 'text-error' : 'text-on-surface-variant'}`}>
                {tx.amount}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function HealthScore() {
  const r = 52, c = 2 * Math.PI * r;
  return (
    <Card>
      <CardContent className="text-center">
        <p className="text-sm font-bold text-on-surface mb-4">Financial Health Score</p>
        <div className="relative w-28 h-28 mx-auto mb-3">
          <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
            <circle cx="60" cy="60" r={r} fill="none" stroke="#e6e8ea" strokeWidth="10" />
            <circle cx="60" cy="60" r={r} fill="none" stroke="#004d5b" strokeWidth="10"
              strokeDasharray={c} strokeDashoffset={c * 0.16} strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-headline text-3xl font-extrabold text-on-surface">84</span>
            <span className="text-2xs font-bold text-on-surface-variant uppercase tracking-widest">Excellent</span>
          </div>
        </div>
        <p className="text-xs text-on-surface-variant leading-relaxed mb-3">Top 12% of savers in your income bracket.</p>
        <Button variant="secondary" size="sm" fullWidth>Details Report</Button>
      </CardContent>
    </Card>
  );
}

function UpcomingBills() {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-bold text-on-surface">Upcoming Bills</p>
          <Badge variant="tertiary">3 Pending</Badge>
        </div>
        <div className="space-y-3">
          {upcomingBills.map((b, i) => (
            <div key={i} className={`flex items-center gap-3 ${b.dim ? 'opacity-50' : ''}`}>
              <div className="w-10 h-10 bg-surface-low rounded-lg border border-surface-container flex flex-col items-center justify-center flex-shrink-0">
                <span className="text-2xs font-bold text-on-surface-variant uppercase">{b.month}</span>
                <span className="font-headline text-base font-extrabold text-on-surface leading-none">{b.day}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-on-surface truncate">{b.name}</p>
                <p className="text-xs text-on-surface-variant">{b.detail}</p>
              </div>
              <Icon name="chevron_right" size={16} className="text-on-surface-variant" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function FYProgress() {
  return (
    <Card variant="surface">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-2xs font-bold uppercase tracking-widest text-on-surface-variant">FY Progress</span>
          <span className="text-xs font-bold text-primary">Month {fyProgress.month} of {fyProgress.total}</span>
        </div>
        <ProgressBar value={fyProgress.pct} />
        <div className="flex justify-between mt-1.5">
          <span className="text-2xs text-on-surface-variant">APR 2024</span>
          <span className="text-2xs text-on-surface-variant">MAR 2025</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  return (
    <div className="page-shell">
      <PageHeader
        title="Dashboard"
        subtitle="Your financial overview for FY 24-25 · Last updated just now"
        actions={<Button icon="download" size="sm" variant="secondary">Export Report</Button>}
      />

      {/* Hero Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-primary to-primary-mid rounded-xl p-4 sm:p-5 text-white shadow-primary relative overflow-hidden">
          <div className="absolute bottom-0 right-0 opacity-10">
            <svg viewBox="0 0 100 40" className="w-40 h-16"><path d="M0 35 Q20 10 40 25 T80 5 T100 20" fill="none" stroke="white" strokeWidth="2" /></svg>
          </div>
          <p className="text-2xs font-bold uppercase tracking-widest text-white/70 mb-2">Total Net Worth</p>
          <p className="font-headline text-2xl font-extrabold mb-3">{netWorth.total}</p>
          <div className="inline-flex items-center gap-1.5 bg-white/15 px-2.5 py-1 rounded-full text-xs font-semibold">
            <Icon name="trending_up" size={13} />{netWorth.todayGain} ({netWorth.todayPct})
          </div>
        </div>
        <StatCard label="Monthly Income" value="₹ 4,25,000" icon="payments" iconBg="bg-[#e8f5f7]" iconColor="text-primary" badge="FY 24-25" trend="+14.2% vs LY" trendUp progress={75} />
        <StatCard label="Monthly Expenses" value="₹ 1,12,000" icon="account_balance_wallet" iconBg="bg-[#ffdcc1]" iconColor="text-[#6a3a06]" badge="72% of Budget" trend="+12% vs last" trendUp={false} progress={42} progressColor="bg-[#6a3a06]" />
        <StatCard label="Total Investments" value="₹ 62,40,000" icon="trending_up" iconBg="bg-secondary-container" iconColor="text-secondary" badge="+₹45k today" trend="+18.4% returns" trendUp progress={88} progressColor="bg-secondary" />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 space-y-5">
          <CashFlowChart />
          <RecentTransactions />
        </div>
        <div className="space-y-4">
          <HealthScore />
          <UpcomingBills />
          <FYProgress />
        </div>
      </div>
    </div>
  );
}
