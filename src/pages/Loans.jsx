// src/pages/Loans.jsx
import { Card, CardContent, PageHeader, ProgressBar, Icon, StatusChip } from '../components/ui/index.jsx';
import { Button } from '../components/ui/Button.jsx';
import { loans, loansSummary, emiSchedule } from '../data/mockData.js';

export default function Loans() {
  return (
    <div className="page-shell">
      <PageHeader title="Liability Portfolio" subtitle="Manage your debt structure and track repayment efficiency." />

      {/* Hero + Savings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-2 bg-gradient-to-br from-primary to-primary-mid rounded-2xl p-5 sm:p-7 text-white relative overflow-hidden shadow-primary">
          <div className="absolute top-0 right-0 opacity-8 pointer-events-none text-[10rem] leading-none">
            <Icon name="account_balance" size={160} />
          </div>
          <p className="text-2xs font-bold uppercase tracking-widest text-white/70 mb-2">Total Outstanding Debt</p>
          <p className="font-headline text-5xl font-extrabold tracking-tight mb-6">₹ {(loansSummary.totalDebt / 100000).toFixed(2)}L</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/20 pt-5">
            {[
              { l: 'Avg. Interest Rate', v: `${loansSummary.avgRate}%` },
              { l: 'Monthly EMIs', v: `₹ ${loansSummary.monthlyEmi.toLocaleString('en-IN')}` },
              { l: 'Debt-to-Equity', v: loansSummary.debtEquityRatio },
            ].map(x => (
              <div key={x.l}>
                <p className="text-2xs font-bold uppercase tracking-widest text-white/70 mb-1">{x.l}</p>
                <p className="font-headline text-xl font-bold">{x.v}</p>
              </div>
            ))}
          </div>
        </div>

        <Card className="flex flex-col">
          <CardContent className="flex-1 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#ffdcc1] flex items-center justify-center text-[#6b3b06]">
                <Icon name="savings" size={20} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Interest Saved</p>
                <p className="font-headline text-xl font-extrabold text-[#164e5f]">
                  ₹ {loansSummary.interestSaved.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed flex-1">
              By making prepayments of ₹ 15,000/month, you're on track to close your Home Loan{' '}
              <span className="text-primary-mid font-bold">3.5 years early</span>.
            </p>
            <Button variant="secondary" fullWidth className="mt-4">Manage Prepayments</Button>
          </CardContent>
        </Card>
      </div>

      {/* Active Facilities */}
      <div>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center mb-4">
          <h2 className="font-headline text-xl font-bold text-[#164e5f]">Active Facilities</h2>
          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">3 active accounts</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {loans.map(loan => (
            <Card key={loan.id} className="hover:shadow-card-lg transition-shadow">
              <CardContent>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-secondary-container rounded-xl text-secondary">
                    <Icon name={loan.icon} size={22} filled />
                  </div>
                  <StatusChip status={loan.status} />
                </div>
                <p className="font-headline text-base font-bold text-[#0e3d4a] mb-0.5">{loan.name}</p>
                <p className="text-xs text-on-surface-variant mb-5">{loan.account}</p>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-on-surface-variant">Principal Paid</span>
                      <span className="text-[#164e5f]">{loan.paidPct}%</span>
                    </div>
                    <ProgressBar value={loan.paidPct} color={loan.barColor} />
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-2xs font-bold uppercase tracking-widest text-on-surface-variant mb-0.5">Outstanding</p>
                      <p className="font-headline text-lg font-extrabold text-[#164e5f]">
                        ₹ {(loan.outstanding / 100000).toFixed(2)}L
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xs font-bold uppercase tracking-widest text-on-surface-variant mb-0.5">EMI</p>
                      <p className="text-sm font-bold">₹ {loan.emi.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Schedule + Strategy */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
        <Card className="xl:col-span-3">
          <div className="px-6 py-4 border-b border-surface-container flex justify-between items-center">
            <h3 className="font-headline text-base font-bold text-[#164e5f]">Repayment Schedule</h3>
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-surface-container rounded-lg"><Icon name="chevron_left" size={18} /></button>
              <span className="text-xs font-bold">MARCH 2024</span>
              <button className="p-1 hover:bg-surface-container rounded-lg"><Icon name="chevron_right" size={18} /></button>
            </div>
          </div>
          <div className="responsive-table">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-low">
                {['Date', 'Loan Facility', 'Amount', 'Status'].map((h, i) => (
                  <th key={h} className={`px-5 py-3 text-2xs font-bold uppercase tracking-widest text-on-surface-variant ${i === 3 ? 'text-right' : ''}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {emiSchedule.map(e => (
                <tr key={e.date} className="hover:bg-surface-low transition-colors">
                  <td className="px-5 py-3.5 text-sm font-medium">{e.date}</td>
                  <td className="px-5 py-3.5 text-sm">{e.facility}</td>
                  <td className="px-5 py-3.5 text-sm font-bold">₹ {e.amount.toLocaleString('en-IN')}</td>
                  <td className="px-5 py-3.5 text-right"><StatusChip status={e.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </Card>

        <div className="xl:col-span-2 space-y-4">
          <Card>
            <CardContent>
              <h4 className="font-headline text-base font-bold text-[#164e5f] mb-4">Optimization Strategy</h4>
              {[
                { icon: 'priority_high', color: 'text-[#6a3a06]', title: 'Snowball Opportunity', desc: 'Pay off Business Expansion loan first. Closing this ₹ 7L debt frees ₹ 11,100/month.' },
                { icon: 'trending_down', color: 'text-primary-mid', title: 'Refinance Check', desc: 'Car Loan market rate 7.8% vs your 9.2%. Potential annual saving: ₹ 45,500.' },
              ].map(({ icon, color, title, desc }) => (
                <div key={title} className="bg-surface-low p-4 rounded-xl mb-3 last:mb-0">
                  <div className="flex items-center gap-2.5 mb-2">
                    <Icon name={icon} size={18} className={color} />
                    <p className="text-sm font-bold text-[#164e5f]">{title}</p>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{desc}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
