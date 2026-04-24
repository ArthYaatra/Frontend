// src/pages/Reports.jsx
import { Card, CardContent, PageHeader, ProgressBar, Icon, Badge, StatCard } from '../components/ui/index.jsx';
import { Button } from '../components/ui/Button.jsx';

const REPORT_CARDS = [
  { icon: 'receipt_long',          title: 'Monthly Statement',      desc: 'Oct 2024 complete income & expense summary', tag: 'Ready', tagV: 'success' },
  { icon: 'account_balance_wallet',title: 'Portfolio Report',       desc: 'Q2 FY24-25 investment performance deep dive',  tag: 'Ready', tagV: 'success' },
  { icon: 'calculate',             title: 'Tax Computation Sheet',  desc: 'Pre-computed ITR data for AY 2025-26',         tag: 'Draft', tagV: 'warning' },
  { icon: 'monitoring',            title: 'Net Worth Report',       desc: 'Comprehensive balance sheet — Oct 2024',       tag: 'Ready', tagV: 'success' },
  { icon: 'bar_chart',             title: 'Cash Flow Analysis',     desc: 'FY 24-25 month-by-month cash flow trends',     tag: 'Ready', tagV: 'success' },
  { icon: 'trending_up',           title: 'Capital Gains Report',   desc: 'STCG & LTCG summary for tax filing',           tag: 'Pending', tagV: 'default' },
];

const MONTHLY_NUMS = [
  { m: 'APR', inc: 420000, exp: 98000  },
  { m: 'MAY', inc: 435000, exp: 112000 },
  { m: 'JUN', inc: 428000, exp: 105000 },
  { m: 'JUL', inc: 460000, exp: 142850 },
  { m: 'AUG', inc: 425000, exp: 98500  },
  { m: 'SEP', inc: 450000, exp: 108000 },
];

export default function Reports() {
  return (
    <div className="page-shell">
      <PageHeader
        title="Reports"
        subtitle="Auto-generated fiscal reports, statements, and analytics documents."
        actions={
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" icon="filter_list" size="sm">Filter</Button>
            <Button icon="download" size="sm">Download All</Button>
          </div>
        }
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Reports Generated" value="24" icon="description" iconBg="bg-surface-low" badge="This FY" />
        <StatCard label="Tax Saved (Est.)" value="₹ 1.2L" icon="savings" iconBg="bg-[#e8f5f7]" iconColor="text-primary" trend="+8% vs LY" trendUp />
        <StatCard label="Net Surplus" value="₹ 18.4L" icon="trending_up" iconBg="bg-[#d1fae5]" iconColor="text-[#059669]" sub="FY 24-25 YTD" />
        <StatCard label="ITR Filing" value="Jul 31" icon="event" iconBg="bg-[#fef3c7]" iconColor="text-[#92400e]" badge="Due" badgeVariant="warning" />
      </div>

      {/* Report Cards Grid */}
      <div>
        <h2 className="font-headline text-xl font-bold text-on-surface mb-4">Available Reports</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {REPORT_CARDS.map(r => (
            <Card key={r.title} className="hover:shadow-card-lg transition-shadow group cursor-pointer">
              <CardContent>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-surface-low flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                    <Icon name={r.icon} size={24} />
                  </div>
                  <Badge variant={r.tagV}>{r.tag}</Badge>
                </div>
                <p className="font-headline text-base font-bold text-on-surface mb-1">{r.title}</p>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-4">{r.desc}</p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="secondary" size="sm" icon="visibility" className="flex-1 justify-center">Preview</Button>
                  <Button size="sm" icon="download" className="flex-1 justify-center">Download</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Monthly Summary Table */}
      <Card>
        <div className="px-4 sm:px-6 py-4 border-b border-surface-container flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
          <h3 className="font-headline text-base font-bold text-on-surface">Monthly P&L Summary — FY 24-25</h3>
          <Button variant="ghost" size="sm" icon="download">Export CSV</Button>
        </div>
        <div className="sm:hidden p-4 space-y-3">
          {MONTHLY_NUMS.map(row => {
            const surplus = row.inc - row.exp;
            const savPct = Math.round((surplus / row.inc) * 100);
            const warning = row.m === 'JUL';
            return (
              <div key={row.m} className="rounded-2xl border border-outline-variant/20 bg-surface-low p-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="font-headline text-lg font-bold text-on-surface">{row.m} 2024</p>
                    <p className="text-2xs font-bold uppercase tracking-widest text-on-surface-variant">Monthly summary</p>
                  </div>
                  <Badge variant={warning ? 'warning' : 'success'}>
                    {warning ? 'Over Budget' : 'On Track'}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-white p-3">
                    <p className="text-2xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">Gross Income</p>
                    <p className="font-bold text-[#059669]">â‚¹ {row.inc.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="rounded-xl bg-white p-3">
                    <p className="text-2xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">Expenses</p>
                    <p className="font-bold text-error">â‚¹ {row.exp.toLocaleString('en-IN')}</p>
                  </div>
                </div>
                <div className="rounded-xl bg-white p-3 mt-3">
                  <div className="flex justify-between gap-3 mb-2">
                    <span className="text-2xs font-bold uppercase tracking-widest text-on-surface-variant">Net Surplus</span>
                    <span className="font-bold text-primary">â‚¹ {surplus.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <ProgressBar value={savPct} height="h-1.5" color={savPct > 70 ? 'bg-[#059669]' : savPct > 50 ? 'bg-primary' : 'bg-[#6a3a06]'} />
                    </div>
                    <span className="text-xs font-bold text-on-surface-variant">{savPct}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="hidden sm:block responsive-table">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-low">
                {['Month', 'Gross Income', 'Total Expenses', 'Net Surplus', 'Savings Rate', 'Status'].map((h, i) => (
                  <th key={h} className={`px-6 py-3 text-2xs font-bold uppercase tracking-widest text-on-surface-variant ${i >= 2 ? 'text-right' : ''}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {MONTHLY_NUMS.map(row => {
                const surplus = row.inc - row.exp;
                const savPct = Math.round((surplus / row.inc) * 100);
                return (
                  <tr key={row.m} className="hover:bg-surface-low transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold">{row.m} 2024</td>
                    <td className="px-6 py-4 text-sm text-[#059669] font-semibold text-right">₹ {row.inc.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 text-sm text-error font-semibold text-right">₹ {row.exp.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 text-sm font-bold text-primary text-right">₹ {surplus.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16">
                          <ProgressBar value={savPct} height="h-1.5" color={savPct > 70 ? 'bg-[#059669]' : savPct > 50 ? 'bg-primary' : 'bg-[#6a3a06]'} />
                        </div>
                        <span className="text-xs font-bold text-on-surface-variant w-8 text-right">{savPct}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Badge variant={row.m === 'JUL' ? 'warning' : 'success'}>
                        {row.m === 'JUL' ? 'Over Budget' : 'On Track'}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Advisory Banner */}
      <div className="bg-gradient-to-r from-primary to-primary-mid rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 text-white">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center flex-shrink-0">
            <Icon name="support_agent" size={26} />
          </div>
          <div>
            <p className="font-headline text-lg font-bold">Schedule a Report Review</p>
            <p className="text-sm opacity-80">Your relationship manager can walk you through any report in detail.</p>
          </div>
        </div>
        <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 whitespace-nowrap">Book a Session</Button>
      </div>
    </div>
  );
}
