// src/pages/Investments.jsx
import { useState } from 'react';
import { Card, CardContent, CardHeader, PageHeader, ProgressBar, Badge, Icon, SectionHeader } from '../components/ui/index.jsx';
import { Button } from '../components/ui/Button.jsx';
import { investments } from '../data/mockData.js';

const CHART_H = [40, 45, 55, 52, 60, 65, 75, 70, 80, 85, 90, 100];

export default function Investments() {
  const [period, setPeriod] = useState('1Y');

  return (
    <div className="page-shell">
      {/* Hero Header */}
      <div className="bg-surface-low rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-end justify-between gap-5">
        <div>
          <p className="text-2xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Total Portfolio Value</p>
          <h1 className="font-headline text-4xl sm:text-5xl font-extrabold text-primary tracking-tight">
            ₹ {(investments.totalPortfolio / 100000).toFixed(2)}L
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <Badge variant="success" icon="trending_up">+₹ {investments.dayChange.toLocaleString('en-IN')} ({investments.dayChangePct}%)</Badge>
            <span className="text-sm text-on-surface-variant">Today's Gain</span>
          </div>
        </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[{ label: 'Total Returns', value: `+${investments.totalReturn}%` }, { label: 'FY 24-25 Goal', value: `${investments.goalPct}%` }].map(m => (
            <div key={m.label} className="bg-white rounded-xl p-4 text-right min-w-[130px] shadow-card">
              <p className="text-2xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">{m.label}</p>
              <p className="font-headline text-2xl font-extrabold text-[#164e5f]">{m.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* Portfolio Growth Chart */}
        <Card className="xl:col-span-8">
          <CardContent>
            <CardHeader
              title="Portfolio Growth"
              subtitle="Asset valuation over the last 12 months"
              action={
                <div className="flex max-w-full overflow-x-auto bg-surface-low rounded-lg p-1 gap-0.5">
                  {['1Y', '3Y', '5Y', 'MAX'].map(p => (
                    <button key={p} onClick={() => setPeriod(p)}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition-all whitespace-nowrap ${period === p ? 'bg-white shadow-sm text-on-surface' : 'text-on-surface-variant'}`}>
                      {p}
                    </button>
                  ))}
                </div>
              }
            />
            <div className="flex items-end gap-1 h-52">
              {CHART_H.map((h, i) => (
                <div key={i}
                  className={`flex-1 rounded-t-sm cursor-pointer transition-colors ${i >= 9 ? 'bg-primary/30 hover:bg-primary/50' : 'bg-primary/12 hover:bg-primary/25'}`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-3">
              {['Apr 23', 'Jun 23', 'Sep 23', 'Dec 23', 'Mar 24'].map(m => (
                <span key={m} className="text-2xs font-bold text-on-surface-variant uppercase tracking-wide">{m}</span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Asset Allocation */}
        <Card className="xl:col-span-4 flex flex-col">
          <CardContent className="flex-1 flex flex-col">
            <h3 className="font-headline text-base font-bold text-[#164e5f] mb-5">Asset Allocation</h3>
            <div className="flex-1 space-y-5">
              {investments.allocation.map(({ label, pct, color }) => (
                <div key={label}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-on-surface-variant">{label}</span>
                    <span className="font-bold">{pct}%</span>
                  </div>
                  <ProgressBar value={pct} color={color} />
                </div>
              ))}
            </div>
            <Button variant="ghost" fullWidth iconRight="arrow_forward" className="mt-6 justify-center">
              Detailed Rebalancing Report
            </Button>
          </CardContent>
        </Card>

        {/* Watchlist */}
        <Card className="xl:col-span-7">
          <CardContent className="p-0">
            <div className="px-6 py-4 border-b border-surface-container flex justify-between items-center">
              <h3 className="font-headline text-base font-bold text-[#164e5f]">Watchlist</h3>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>
            <div className="responsive-table">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-low">
                  {['Asset', 'Price (INR)', 'Change', ''].map((h, i) => (
                    <th key={i} className={`px-5 py-3 text-2xs font-bold uppercase tracking-widest text-on-surface-variant ${i >= 2 ? 'text-right' : ''}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {investments.watchlist.map(s => (
                  <tr key={s.symbol} className="hover:bg-surface-low transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                          <Icon name={s.icon} size={17} />
                        </div>
                        <div>
                          <p className="text-sm font-bold">{s.symbol}</p>
                          <p className="text-xs text-on-surface-variant">{s.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right text-sm font-medium">{s.price}</td>
                    <td className={`px-5 py-4 text-right text-sm font-bold ${s.positive ? 'text-[#059669]' : 'text-error'}`}>{s.change}</td>
                    <td className="px-5 py-4 text-right"><Icon name="more_vert" size={18} className="text-on-surface-variant" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </CardContent>
        </Card>

        {/* Market Insights */}
        <div className="xl:col-span-5 bg-surface-low rounded-xl p-4 sm:p-6">
          <h3 className="font-headline text-base font-bold text-[#164e5f] mb-5">Market Insights</h3>
          <div className="space-y-5">
            {[
              { tag: 'Tax Advisory', tagColor: 'text-[#6a3a06]', title: 'Changes in LTCG for FY 24-25', desc: 'How the latest budget updates affect your real estate and equity investments...' },
              { tag: 'Macro Trends', tagColor: 'text-primary', title: "RBI's Stance on Repo Rate", desc: 'Exploring the stability of fixed-income assets in a volatile global economy...' },
            ].map(({ tag, tagColor, title, desc }) => (
              <div key={title} className="flex gap-3 cursor-pointer group">
                <div className="w-16 h-16 rounded-xl bg-surface-container flex-shrink-0" />
                <div>
                  <p className={`text-2xs font-bold uppercase tracking-widest ${tagColor} mb-1`}>{tag}</p>
                  <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors mb-1">{title}</p>
                  <p className="text-xs text-on-surface-variant line-clamp-2">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <hr className="my-4 border-outline-variant/20" />
          <div className="bg-white rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Icon name="auto_awesome" size={22} filled className="text-primary" />
              <div>
                <p className="text-xs font-bold text-[#164e5f]">Portfolio Score</p>
                <p className="text-2xs text-on-surface-variant">Optimized for moderate risk</p>
              </div>
            </div>
            <span className="font-headline text-2xl font-extrabold text-primary">84</span>
          </div>
        </div>
      </div>
    </div>
  );
}
