// src/pages/Calculators.jsx
import { useState } from 'react';
import { Card, CardContent, PageHeader, ProgressBar, Icon } from '../components/ui/index.jsx';
import { Button } from '../components/ui/Button.jsx';
import { RangeInput } from '../components/ui/Input.jsx';

const AMORT = [
  { y: 'Year 1', p: '₹ 1,51,048', i: '₹ 6,44,420', b: '₹ 73,48,952' },
  { y: 'Year 2', p: '₹ 1,64,792', i: '₹ 6,30,676', b: '₹ 71,84,160' },
  { y: 'Year 3', p: '₹ 1,79,788', i: '₹ 6,15,680', b: '₹ 70,04,372' },
  { y: 'Year 4', p: '₹ 1,96,149', i: '₹ 5,99,319', b: '₹ 68,08,223' },
  { y: '...',    p: '...',        i: '...',        b: '...' },
  { y: 'Year 20',p: '₹ 7,34,512', i: '₹ 60,956',   b: '₹ 0' },
];

export default function Calculators() {
  const [loanAmt, setLoanAmt] = useState(75);
  const [rate, setRate] = useState(875);
  const [tenure, setTenure] = useState(20);
  const emi = Math.round((loanAmt * 100000 * (rate / 10000 / 12) * Math.pow(1 + rate / 10000 / 12, tenure * 12)) / (Math.pow(1 + rate / 10000 / 12, tenure * 12) - 1));

  return (
    <div className="page-shell">
      <PageHeader title="Calculators" subtitle="Precision tools for high-fidelity fiscal planning." />

      {/* Income Tax Optimizer */}
      <Card>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-7">
            <div>
              <h2 className="font-headline text-2xl font-bold text-primary mb-1">Income Tax Optimizer</h2>
              <p className="text-sm text-on-surface-variant">Fiscal Year 2024-2025 · Old vs New Regime Analysis</p>
            </div>
            <div className="flex items-center gap-2 bg-surface-low px-4 py-2 rounded-full">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Live Comparison</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
            <div className="space-y-5">
              {[{ l: 'Annual Gross Income', v: '24,50,000' }, { l: 'Investments (80C)', v: '1,50,000' }, { l: 'House Rent (HRA)', v: '3,60,000' }].map(f => (
                <div key={f.l}>
                  <p className="text-2xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">{f.l}</p>
                  <div className="flex items-center bg-surface-highest rounded-xl px-4 py-3">
                    <span className="text-on-surface-variant font-semibold mr-2">₹</span>
                    <span className="text-md font-bold text-on-surface">{f.v}</span>
                  </div>
                </div>
              ))}
              <Button fullWidth icon="calculate">RECALCULATE TAX</Button>
            </div>
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-surface-low rounded-2xl p-6">
                <p className="text-2xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">Old Regime</p>
                <p className="font-headline text-3xl font-extrabold text-on-surface mb-1">₹ 4,32,400</p>
                <p className="text-xs text-on-surface-variant mb-5">Estimated Tax Liability</p>
                {[{ l: 'Taxable Income', v: '₹ 18,90,000' }, { l: 'Total Exemptions', v: '₹ 5,60,000' }].map(x => (
                  <div key={x.l} className="flex justify-between text-xs mb-2">
                    <span className="text-on-surface-variant">{x.l}</span>
                    <span className="font-bold">{x.v}</span>
                  </div>
                ))}
              </div>
              <div className="bg-primary/6 rounded-2xl p-6 border-2 border-primary/20 relative">
                <div className="absolute top-3 right-3">
                  <span className="text-2xs font-bold bg-[#6a3a06] text-white px-2.5 py-1 rounded-full">Recommended</span>
                </div>
                <p className="text-2xs font-bold uppercase tracking-widest text-primary mb-4">New Regime</p>
                <p className="font-headline text-3xl font-extrabold text-primary mb-1">₹ 3,92,600</p>
                <p className="text-xs text-on-surface-variant mb-5">Estimated Tax Liability</p>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-on-surface-variant">Taxable Income</span>
                  <span className="font-bold text-primary">₹ 24,00,000</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#6a3a06] font-semibold">Annual Savings</span>
                  <span className="font-bold text-[#6a3a06]">₹ 39,800</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* EMI Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="space-y-4">
          <Card>
            <CardContent>
              <h3 className="font-headline text-lg font-bold text-on-surface mb-6">EMI Calculator</h3>
              <div className="space-y-6">
                <RangeInput label="Loan Amount" value={loanAmt} displayValue={`₹ ${loanAmt}L`} min={5} max={200} step={1} onChange={e => setLoanAmt(+e.target.value)} />
                <RangeInput label="Interest Rate (%)" value={rate} displayValue={`${(rate / 100).toFixed(2)}%`} min={400} max={2000} step={25} onChange={e => setRate(+e.target.value)} />
                <RangeInput label="Tenure (Years)" value={tenure} displayValue={`${tenure} Yrs`} min={1} max={30} step={1} onChange={e => setTenure(+e.target.value)} />
              </div>
              <div className="mt-8 bg-surface-low rounded-2xl p-5 text-center">
                <p className="text-2xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Monthly EMI</p>
                <p className="font-headline text-3xl sm:text-4xl font-extrabold text-primary tracking-tight break-words">
                  ₹ {emi.toLocaleString('en-IN')}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h4 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">Cost Breakdown</h4>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-on-surface-variant">Principal</span>
                <span className="font-bold">₹ {(loanAmt * 100000).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex h-2 rounded-full overflow-hidden mb-2">
                <div className="bg-primary" style={{ flex: '48.5 0 0' }} />
                <div className="bg-[#ffdcc1]" style={{ flex: '51.5 0 0' }} />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant">Total Interest</span>
                <span className="font-bold text-[#6a3a06]">₹ 84,09,360</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="lg:col-span-2 flex flex-col">
          <div className="px-4 sm:px-6 py-4 border-b border-surface-container flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
            <div>
              <h3 className="font-headline text-lg font-bold text-on-surface">Amortization Schedule</h3>
              <p className="text-xs text-on-surface-variant">Yearly principal vs interest trajectory</p>
            </div>
            <Button variant="ghost" size="sm">Export CSV</Button>
          </div>
          <div className="responsive-table">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-low">
                {['Year', 'Principal Paid', 'Interest Paid', 'Balance'].map(h => (
                  <th key={h} className="px-6 py-3 text-2xs font-bold uppercase tracking-widest text-on-surface-variant">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {AMORT.map((row, i) => (
                <tr key={i} className={`hover:bg-surface-low transition-colors ${row.y === '...' ? 'text-primary' : ''}`}>
                  <td className="px-6 py-4 text-sm font-semibold">{row.y}</td>
                  <td className="px-6 py-4 text-sm">{row.p}</td>
                  <td className="px-6 py-4 text-sm">{row.i}</td>
                  <td className="px-6 py-4 text-sm font-bold">{row.b}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </Card>
      </div>

      <div className="flex items-start gap-4 bg-[#ffdcc1]/30 p-5 rounded-2xl border-l-4 border-[#6a3a06]">
        <Icon name="info" size={20} className="text-[#6a3a06] mt-0.5 flex-shrink-0" />
        <p className="text-sm text-[#6b3b06] leading-relaxed">Calculations are based on the latest Finance Act 2024 updates. For the New Regime, standard deduction of ₹75,000 is included. For personalized planning, consult your advisor.</p>
      </div>
    </div>
  );
}
