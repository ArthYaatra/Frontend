// src/pages/Income.jsx
import { useState } from 'react';
import { Card, CardContent, CardHeader, PageHeader, ProgressBar, Badge, Icon, SectionHeader, StatCard } from '../components/ui/index.jsx';
import { Button } from '../components/ui/Button.jsx';
import { incomeStreams, incomeSummary } from '../data/mockData.js';

const CAT_COLORS = { Salary: 'bg-secondary-container text-secondary', Dividend: 'bg-[#ffdcc1] text-[#6b3b06]', Freelance: 'bg-primary/10 text-primary', Rental: 'bg-surface-high text-on-surface-variant' };
const CHART_H = [40, 45, 42, 60, 55, 75, 70, 85, 30, 30, 30, 30];
const MONTHS = ['APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR'];

const SOURCES = [
  { label: 'Salary', pct: 65, color: 'bg-primary', amount: '₹ 28L' },
  { label: 'Dividends', pct: 20, color: 'bg-[#aecccf]', amount: '₹ 8.5L' },
  { label: 'Freelance', pct: 10, color: 'bg-[#6a3a06]', amount: '₹ 4L' },
  { label: 'Rentals', pct: 5, color: 'bg-surface-highest', amount: '₹ 2L' },
];

function InsightsPanel() {
  return (
    <div className="bg-gradient-to-br from-primary to-primary-mid rounded-2xl p-6 text-white relative overflow-hidden">
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/8 rounded-full blur-2xl pointer-events-none" />
      <div className="flex items-center gap-2 mb-5">
        <Icon name="auto_awesome" size={20} />
        <span className="font-headline text-lg font-bold">Insights</span>
      </div>
      <div className="space-y-4">
        {[
          { tag: 'Passive Growth', body: 'Dividend yield up 12% vs last quarter. Re-investing could shorten FIRE timeline by 8 months.' },
          { tag: 'Freelance Stability', body: 'Your freelance income has maintained ±5% consistency for 6 months. Ideal for a full-time venture.' },
          { tag: 'Tax Efficiency', body: 'Recent LTCG credits may increase liability by ₹42k. Consider Section 54F exemptions.' },
        ].map(({ tag, body }) => (
          <div key={tag} className="border-b border-white/15 pb-4 last:border-0 last:pb-0">
            <p className="text-2xs font-bold uppercase tracking-widest text-[#a9edff] mb-1.5">{tag}</p>
            <p className="text-xs leading-relaxed opacity-90">{body}</p>
          </div>
        ))}
      </div>
      <Button variant="outline" fullWidth className="mt-5 border-white/20 text-white hover:bg-white/10">View Intelligence Report</Button>
    </div>
  );
}

export default function Income() {
  const [period, setPeriod] = useState('Financial Year');

  return (
    <div className="page-shell">
      <PageHeader
        title="Income Analysis"
        subtitle="Detailed breakdown of your fiscal performance for FY 24-25"
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex max-w-full overflow-x-auto bg-surface-high p-1 rounded-xl gap-1">
              {['Month', 'Quarter', 'Financial Year'].map(v => (
                <button key={v} onClick={() => setPeriod(v)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${period === v ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant'}`}>
                  {v}
                </button>
              ))}
            </div>
            <Button icon="download" size="sm" variant="secondary">Export</Button>
          </div>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Total Income" value="₹ 42,50,000" icon="payments" iconBg="bg-[#e8f5f7]" iconColor="text-primary" trend="+14.2% vs LY" trendUp />
        <StatCard label="Growth Rate" value="8.4%" icon="trending_up" iconBg="bg-surface-low" iconColor="text-primary" sub="Consistent monthly avg" />
        <StatCard label="Active / Passive" value="65/35" icon="pie_chart" iconBg="bg-secondary-container" iconColor="text-secondary" sub="% split" progress={65} />
        <StatCard label="Projected Annual" value="₹ 1,24L" icon="schedule" iconBg="bg-primary/8" iconColor="text-primary" badge="Estimated" badgeVariant="primary" />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 space-y-5">
          {/* Stability Chart */}
          <Card>
            <CardContent>
              <CardHeader title="Income Stability" subtitle="Monthly variance analysis for FY 24-25" />
              <div className="flex items-end gap-1.5 h-40 pb-2 border-b border-surface-container mb-3">
                {CHART_H.map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-sm transition-all" style={{
                    height: `${h}%`,
                    background: i === 7 ? '#004d5b' : i >= 8 ? 'rgba(0,77,91,0.08)' : 'rgba(0,77,91,0.18)',
                    border: i >= 8 ? '1px dashed rgba(0,77,91,0.2)' : 'none',
                  }} />
                ))}
              </div>
              <div className="flex justify-between px-1">
                {['APR','JUL','OCT','JAN','MAR'].map(m => (
                  <span key={m} className="text-2xs font-bold text-on-surface-variant">{m}</span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Transactions Table */}
          <Card>
            <CardContent className="p-0">
              <div className="px-6 py-4 border-b border-surface-container flex justify-between items-center">
                <h3 className="font-headline text-base font-bold text-on-surface">Recent Income Credits</h3>
                <Button variant="ghost" size="sm" iconRight="open_in_new">View Statement</Button>
              </div>
              <div className="responsive-table">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-low">
                    {['Date', 'Source', 'Category', 'Amount', ''].map((h, i) => (
                      <th key={i} className="px-5 py-3 text-2xs font-bold uppercase tracking-widest text-on-surface-variant">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  {incomeStreams.map(tx => (
                    <tr key={tx.id} className="hover:bg-surface-low transition-colors">
                      <td className="px-5 py-3.5 text-xs text-on-surface-variant">{tx.date}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-surface-high flex items-center justify-center text-primary">
                            <Icon name={tx.icon} size={15} />
                          </div>
                          <span className="text-sm font-semibold text-on-surface">{tx.source}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`text-2xs font-bold px-2 py-1 rounded-full ${CAT_COLORS[tx.category] || 'bg-surface-high text-on-surface-variant'}`}>{tx.category}</span>
                      </td>
                      <td className="px-5 py-3.5 font-extrabold font-headline text-primary text-sm">
                        ₹ {tx.amount.toLocaleString('en-IN')}
                      </td>
                      <td className="px-5 py-3.5">
                        <Icon name="check_circle" size={18} filled className="text-[#059669]" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <InsightsPanel />

          {/* Source Breakdown */}
          <Card>
            <CardContent>
              <h3 className="font-headline text-base font-bold text-on-surface mb-4">Source Breakdown</h3>
              <div className="space-y-3">
                {SOURCES.map(s => (
                  <div key={s.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-2.5 h-2.5 rounded-full ${s.color}`} />
                      <span className="text-sm text-on-surface">{s.label}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-on-surface">{s.amount}</span>
                      <span className="text-xs text-on-surface-variant ml-2">{s.pct}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* FY Progress */}
          <Card variant="surface">
            <CardContent className="p-4">
              <div className="flex justify-between mb-2">
                <span className="text-xs font-bold text-on-surface">FY 24-25 Progress</span>
                <span className="text-xs font-bold text-primary">Month 7 of 12</span>
              </div>
              <ProgressBar value={58} />
              <div className="flex justify-between mt-1.5">
                <span className="text-2xs text-on-surface-variant">APR '24</span>
                <span className="text-2xs text-on-surface-variant">MAR '25</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
