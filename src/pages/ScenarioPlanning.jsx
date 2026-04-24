import { useState } from 'react';
import { Card, CardContent, PageHeader, ProgressBar, Icon } from '../components/ui/index.jsx';
import { Button } from '../components/ui/Button.jsx';
import { RangeInput } from '../components/ui/Input.jsx';

const SCENARIOS = [
  { icon: 'electric_bike', label: 'Early Freedom' },
  { icon: 'house', label: 'Villa Purchase' },
  { icon: 'school', label: 'Child Education' },
  { icon: 'beach_access', label: 'Retirement Plan' },
];

const CURVE_TOTAL = 'M0 224 L100 210 L200 190 L300 170 L400 148 L500 125 L600 95 L700 60 L800 18';
const CURVE_CONTRIB = 'M0 224 L100 215 L200 202 L300 188 L400 172 L500 158 L600 142 L700 124 L800 105';

export default function ScenarioPlanning() {
  const [contrib, setContrib] = useState(150000);
  const [roi, setRoi] = useState(12.5);
  const [horizon, setHorizon] = useState(15);
  const [activeScenario, setActiveScenario] = useState(0);

  return (
    <div className="page-shell">
      <div className="space-y-4">
        <PageHeader title="Scenario Planning" subtitle="Model your financial future with surgical precision." />
        <div className="flex gap-2">
          <div className="flex max-w-full overflow-x-auto bg-surface-high rounded-full p-1 gap-1">
            {['Base Case', 'Strategy A'].map((label, index) => (
              <button
                key={label}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${index === 0 ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-4 space-y-5">
          <Card>
            <CardContent>
              <p className="text-2xs font-bold uppercase tracking-widest text-on-surface-variant mb-6">Simulation Controls</p>
              <div className="space-y-8">
                <RangeInput
                  label="Monthly Contribution"
                  value={contrib}
                  displayValue={`INR ${(contrib / 1000).toFixed(0)}k`}
                  min={10000}
                  max={500000}
                  step={5000}
                  onChange={event => setContrib(+event.target.value)}
                />
                <RangeInput
                  label="Expected Annual ROI"
                  value={roi}
                  displayValue={`${roi}%`}
                  min={4}
                  max={20}
                  step={0.5}
                  onChange={event => setRoi(+event.target.value)}
                />
                <RangeInput
                  label="Time Horizon (Years)"
                  value={horizon}
                  displayValue={`${horizon} Years`}
                  min={1}
                  max={40}
                  step={1}
                  onChange={event => setHorizon(+event.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SCENARIOS.map(({ icon, label }, index) => (
              <button
                key={label}
                onClick={() => setActiveScenario(index)}
                className={`p-4 rounded-2xl text-left transition-all ${activeScenario === index ? 'bg-primary/8 border-2 border-primary' : 'bg-surface-low border-2 border-transparent hover:bg-surface-high'}`}
              >
                <Icon name={icon} size={24} className={`${activeScenario === index ? 'text-primary' : 'text-on-surface-variant'} mb-2 block`} />
                <span className={`text-xs font-bold ${activeScenario === index ? 'text-primary' : 'text-on-surface-variant'}`}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="xl:col-span-8 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-gradient-to-br from-primary to-primary-mid rounded-2xl p-6 sm:p-7 text-white relative overflow-hidden shadow-primary">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
              <p className="text-2xs font-bold uppercase tracking-widest text-white/70 mb-2">Total Wealth at 60</p>
              <p className="font-headline text-3xl sm:text-4xl font-extrabold mb-4 break-words">INR 8,42,15,000</p>
              <div className="flex gap-2 items-center flex-wrap">
                <span className="text-2xs font-bold bg-white/20 px-2.5 py-1 rounded">LIFESTYLE MAINTAINED</span>
                <span className="text-xs opacity-70">+12% vs Base Case</span>
              </div>
            </div>

            <Card>
              <CardContent>
                <p className="text-2xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Inflation-Adjusted Monthly Income</p>
                <p className="font-headline text-3xl sm:text-4xl font-extrabold text-[#0e3d4a] mb-4 break-words">INR 4,25,000</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <ProgressBar value={85} />
                  </div>
                  <span className="text-xs font-bold text-on-surface-variant whitespace-nowrap">85% Goal</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center mb-7">
                <p className="text-2xs font-bold uppercase tracking-widest text-on-surface-variant">Wealth Accumulation Curve</p>
                <div className="flex flex-wrap gap-4">
                  {[{ color: 'bg-primary', label: 'TOTAL CORPUS' }, { color: 'bg-primary/25', label: 'CONTRIBUTIONS' }].map(item => (
                    <div key={item.label} className="flex items-center gap-2 text-2xs font-bold text-on-surface-variant">
                      <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative h-56 sm:h-64">
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  {[0, 1, 2, 3].map(index => (
                    <div key={index} className="border-b border-surface-container" />
                  ))}
                </div>

                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 224" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="g1" x1="0%" x2="0%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#004d5b" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#004d5b" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={`${CURVE_TOTAL} V224 H0 Z`} fill="url(#g1)" />
                  <path d={CURVE_TOTAL} fill="none" stroke="#004d5b" strokeWidth="3" />
                  <path d={`${CURVE_CONTRIB} V224 H0 Z`} fill="rgba(0,77,91,0.07)" />
                  <path d={CURVE_CONTRIB} fill="none" stroke="rgba(0,77,91,0.35)" strokeDasharray="5" strokeWidth="2" />
                  <circle cx="500" cy="125" r="5" fill="#004d5b" stroke="white" strokeWidth="2" />
                </svg>

                <div className="absolute top-3 right-3 sm:top-8 sm:right-auto sm:left-[57%] bg-[#0e3d4a] text-white px-3 py-2 rounded-xl text-xs shadow-lg z-10 max-w-[10rem]">
                  <p className="opacity-70 mb-1">Year 10 (2034)</p>
                  <p className="font-bold text-sm">INR 3.24 Crores</p>
                </div>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-4">
                {['Current', '5 Years', '10 Years', '15 Years', '20 Years', '25 Years'].map(label => (
                  <span key={label} className="text-2xs font-bold text-on-surface-variant uppercase tracking-wide text-center sm:text-left">
                    {label}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="bg-surface-low rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#ffdcc1] rounded-xl flex items-center justify-center text-[#6b3b06] flex-shrink-0">
                <Icon name="tips_and_updates" size={22} />
              </div>
              <div>
                <p className="text-sm font-bold text-[#0e3d4a]">Arth Yatra Analysis</p>
                <p className="text-xs text-on-surface-variant mt-0.5">Increasing contribution by 15% annually offsets a 2% ROI drop.</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" iconRight="arrow_forward" className="whitespace-nowrap">Run Auto-Optimizer</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
