// src/pages/Expenses.jsx
import { useState } from 'react';
import { Card, CardContent, CardHeader, PageHeader, ProgressBar, Icon, SectionHeader, StatCard } from '../components/ui/index.jsx';
import { Button } from '../components/ui/Button.jsx';
import { expenses, expenseSummary } from '../data/mockData.js';

const CAT_STYLE = {
  Entertainment: 'bg-secondary-container text-secondary',
  Food:          'bg-[#ffdcc1] text-[#6b3b06]',
  Utilities:     'bg-[#cae8eb] text-[#011f22]',
  Healthcare:    'bg-[#86d2e5] text-[#004e5c]',
};

const DIST = [
  { label: 'Housing & Utilities', amount: '₹ 45,000', pct: 31 },
  { label: 'Food & Dining',       amount: '₹ 32,400', pct: 23 },
  { label: 'Healthcare',          amount: '₹ 12,000', pct: 8  },
  { label: 'Entertainment',       amount: '₹ 18,500', pct: 13 },
];

const BARS = [
  { m: 'APR', h: 32 }, { m: 'MAY', h: 40 }, { m: 'JUN', h: 36 },
  { m: 'JUL', h: 56, active: true }, { m: 'AUG', h: 24 }, { m: 'SEP', h: 28 },
];

function InsightsPanel() {
  return (
    <div className="bg-gradient-to-br from-primary to-primary-mid rounded-2xl p-6 text-white relative overflow-hidden">
      <div className="absolute bottom-0 right-0 opacity-5 pointer-events-none">
        <Icon name="auto_awesome" size={80} />
      </div>
      <div className="flex items-center gap-2 mb-5">
        <Icon name="lightbulb" size={20} />
        <span className="font-headline text-lg font-bold">Insights</span>
      </div>
      {[
        { tag: 'Subscription Creep', body: 'Detected 3 new billing cycles in July. Non-essential recurring costs up 15% this quarter.' },
        { tag: 'Dining Out', body: 'Dining costs 20% higher than FY 23-24 average. Visited Oberoi Dining 4 times this month.' },
        { tag: 'Tax Opportunity', body: '₹ 45,000 remaining in Section 80C. Healthcare expenses qualify for Section 80D.' },
      ].map(({ tag, body }) => (
        <div key={tag} className="border-b border-white/15 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0">
          <p className="text-2xs font-bold uppercase tracking-widest text-[#a9edff] mb-1.5">{tag}</p>
          <p className="text-xs leading-relaxed opacity-90">{body}</p>
        </div>
      ))}
      <Button variant="outline" fullWidth className="mt-4 border-white/20 text-white hover:bg-white/10">Optimize My Budget</Button>
    </div>
  );
}

export default function Expenses() {
  const [period, setPeriod] = useState('Month');

  return (
    <div className="page-shell">
      <PageHeader
        title="Expense Analysis"
        subtitle="Deep dive into your spending patterns for the current fiscal year."
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex max-w-full overflow-x-auto bg-surface-low p-1 rounded-full gap-1">
              {['Month', 'Quarter', 'FY 24-25'].map(v => (
                <button key={v} onClick={() => setPeriod(v)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${period === v ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant'}`}>
                  {v}
                </button>
              ))}
            </div>
            <Button icon="download" size="sm" variant="secondary">Download Report</Button>
          </div>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full -translate-y-8 translate-x-8 pointer-events-none" />
          <CardContent>
            <p className="text-2xs font-bold uppercase tracking-widest text-on-surface-variant mb-3">TOTAL EXPENSES</p>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-headline text-3xl font-extrabold text-primary">₹ 1,42,850</span>
              <span className="text-xs font-bold text-error flex items-center gap-0.5">
                <Icon name="arrow_upward" size={12} /> {expenseSummary.growthPct}%
              </span>
            </div>
            <p className="text-xs text-on-surface-variant">vs. previous month (₹ 1,27,544)</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-2xs font-bold uppercase tracking-widest text-on-surface-variant mb-3">BURN RATE</p>
            <p className="font-headline text-2xl font-extrabold text-on-surface mb-1">₹ {expenseSummary.burnRateDaily.toLocaleString('en-IN')}</p>
            <p className="text-xs text-on-surface-variant">per day average</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-[#6a3a06]">
          <CardContent>
            <p className="text-2xs font-bold uppercase tracking-widest text-on-surface-variant mb-3">VARIANCE</p>
            <p className="font-headline text-2xl font-extrabold text-[#6a3a06] mb-1">+ ₹ {expenseSummary.variance.toLocaleString('en-IN')}</p>
            <p className="text-xs text-on-surface-variant">Over monthly budget</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 space-y-5">
          {/* Fixed vs Variable + Distribution */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <CardContent>
                <h3 className="font-headline text-base font-bold text-on-surface mb-4">Fixed vs Variable</h3>
                <div className="h-4 rounded-full flex overflow-hidden mb-4">
                  <div className="bg-primary" style={{ width: '65%' }} />
                  <div className="bg-[#cae8eb]" style={{ width: '35%' }} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[{ dot: 'bg-primary', label: 'Fixed', pct: '65%', val: '₹ 92,852' }, { dot: 'bg-[#cae8eb]', label: 'Variable', pct: '35%', val: '₹ 49,998' }].map(s => (
                    <div key={s.label} className="bg-surface-low p-3 rounded-xl">
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className={`w-2 h-2 rounded-full ${s.dot}`} />
                        <span className="text-2xs font-bold uppercase">{s.label}</span>
                      </div>
                      <p className="font-headline text-lg font-bold">{s.pct}</p>
                      <p className="text-xs text-on-surface-variant">{s.val}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <h3 className="font-headline text-base font-bold text-on-surface mb-4">Category Distribution</h3>
                <div className="space-y-3.5">
                  {DIST.map(d => (
                    <div key={d.label}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-on-surface">{d.label}</span>
                        <span className="font-bold">{d.amount}</span>
                      </div>
                      <ProgressBar value={d.pct} height="h-1.5" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Trend Chart */}
          <Card>
            <CardContent>
              <h3 className="font-headline text-base font-bold text-on-surface mb-5">Monthly Spending Trend</h3>
              <div className="relative h-44 border-b border-surface-container">
                <div className="absolute left-0 right-0 border-t-2 border-dashed border-error/40" style={{ bottom: '40%' }} />
                <div className="flex items-end gap-3 h-full px-2 pb-2">
                  {BARS.map(({ m, h, active }) => (
                    <div key={m} className="flex-1 flex flex-col items-center gap-1.5">
                      <div className={`w-full rounded-t-sm transition-colors ${active ? 'bg-primary' : 'bg-surface-container hover:bg-surface-high'}`} style={{ height: `${h}%` }} />
                      <span className={`text-2xs font-bold uppercase ${active ? 'text-primary' : 'text-on-surface-variant'}`}>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-5 mt-3">
                <div className="flex items-center gap-2 text-xs text-on-surface-variant"><div className="w-3 h-3 rounded-sm bg-primary" />Actual</div>
                <div className="flex items-center gap-2 text-xs text-on-surface-variant"><div className="w-3 h-1 border-t-2 border-dashed border-error" style={{ width: 12 }} />Budget Limit</div>
              </div>
            </CardContent>
          </Card>

          {/* Expense Ledger */}
          <Card>
            <div className="px-6 py-4 border-b border-surface-container">
              <h3 className="font-headline text-base font-bold text-on-surface">Expense Ledger</h3>
            </div>
            <div className="responsive-table">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-low">
                  {['Date', 'Description', 'Category', 'Amount'].map((h, i) => (
                    <th key={i} className={`px-5 py-3 text-2xs font-bold uppercase tracking-widest text-on-surface-variant ${i === 3 ? 'text-right' : ''}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {expenses.map(e => (
                  <tr key={e.id} className="hover:bg-surface-low transition-colors">
                    <td className="px-5 py-3.5 text-xs text-on-surface-variant">{e.date}</td>
                    <td className={`px-5 py-3.5 text-sm font-semibold ${e.flagged ? 'text-error' : 'text-on-surface'}`}>{e.description}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-2xs font-bold px-2 py-1 rounded-full ${CAT_STYLE[e.category] || 'bg-surface-high text-on-surface-variant'}`}>{e.category}</span>
                    </td>
                    <td className={`px-5 py-3.5 text-sm font-bold text-right ${e.flagged ? 'text-error' : 'text-on-surface'}`}>₹ {e.amount.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            <div className="px-6 py-3 bg-surface-low flex justify-center">
              <Button variant="ghost" size="sm">View All 124 Transactions</Button>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <InsightsPanel />
          <Card className="border-t-4 border-primary">
            <CardContent>
              <h4 className="text-sm font-bold text-on-surface mb-3">FY Progress</h4>
              <div className="flex justify-between text-xs text-on-surface-variant mb-2">
                <span>April 2024</span><span>March 2025</span>
              </div>
              <ProgressBar value={33} />
              <p className="text-xs text-on-surface-variant mt-3 leading-relaxed">4 months into the fiscal year. 67% remaining to optimize tax savings.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
