// src/pages/Goals.jsx
// ─────────────────────────────────────────────────────────────────────────────
import { Card as C, CardContent as CC, PageHeader as PH, ProgressBar as PB, Icon as Ic } from '../components/ui/index.jsx';
import { Button as Btn } from '../components/ui/Button.jsx';
import { goals as goalsData } from '../data/mockData.js';

export function Goals() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <PH title="Goals" subtitle="Wealth accumulation strategy and milestone tracking."
        actions={<Btn icon="add" size="sm">New Goal</Btn>}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {goalsData.map(goal => {
          const pct = Math.round((goal.current / goal.target) * 100);
          return (
            <C key={goal.id} className="overflow-hidden">
              <div className={`h-28 bg-gradient-to-br ${goal.color} flex items-end p-5`}>
                <div>
                  <span className="text-2xs font-bold uppercase tracking-widest text-white/70 block mb-1">Priority {String(goal.priority).padStart(2,'0')}</span>
                  <h3 className="font-headline text-xl font-extrabold text-white">{goal.title}</h3>
                </div>
              </div>
              <CC>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-on-surface-variant">Accumulated</span>
                  <span className="font-bold text-[#164e5f]">₹ {(goal.current / 100000).toFixed(1)}L</span>
                </div>
                <div className="flex justify-between text-sm mb-4">
                  <span className="text-on-surface-variant">Target</span>
                  <span className="font-semibold">₹ {(goal.target / 100000).toFixed(0)}L by {goal.date}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-on-surface-variant">Progress</span>
                  <span className="font-headline text-lg font-bold text-primary">{pct}%</span>
                </div>
                <PB value={pct} height="h-2.5" />
                <Btn variant="ghost" fullWidth iconRight="arrow_forward" className="mt-4 justify-center text-xs">Manage Goal</Btn>
              </CC>
            </C>
          );
        })}
      </div>

      {/* FIRE Calculator teaser */}
      <div className="bg-gradient-to-br from-primary to-primary-mid rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-5">
        <div>
          <p className="text-2xs font-bold uppercase tracking-widest text-white/70 mb-2">FIRE Calculator</p>
          <h3 className="font-headline text-2xl font-bold mb-2">When can you retire?</h3>
          <p className="text-sm opacity-80 max-w-lg">Based on your current savings rate and investment returns, calculate your Financial Independence Retire Early timeline.</p>
        </div>
        <Btn variant="outline" className="border-white/30 text-white hover:bg-white/10 whitespace-nowrap">Calculate FIRE Date</Btn>
      </div>
    </div>
  );
}
export default Goals;
