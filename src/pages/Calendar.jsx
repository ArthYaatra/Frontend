// src/pages/Calendar.jsx
import { useState } from 'react';
import { Card, CardContent, PageHeader, Icon } from '../components/ui/index.jsx';
import { calendarEvents } from '../data/mockData.js';

const DOT_COLORS = { income: 'bg-primary', expense: 'bg-error', bill: 'bg-[#6a3a06]' };
const EVT_COLORS = { income: { bg: 'bg-primary/10', ic: 'text-primary' }, expense: { bg: 'bg-error/10', ic: 'text-error' }, bill: { bg: 'bg-[#ffdcc1]', ic: 'text-[#6b3b06]' } };

const DAY_EVENTS = {};
Object.entries(calendarEvents).forEach(([day, evts]) => {
  DAY_EVENTS[+day] = evts.map(e => e.type);
});

export default function Calendar() {
  const [selected, setSelected] = useState(10);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const events = calendarEvents[selected] || [];

  return (
    <div className="page-shell">
      <PageHeader title="Calendar" subtitle="Financial event timeline for October 2024" />
      <div className="flex flex-wrap gap-4">
        {[{ dot: 'bg-primary', l: 'Income' }, { dot: 'bg-error', l: 'Expenses' }, { dot: 'bg-[#6a3a06]', l: 'Bills Due' }].map(l => (
          <div key={l.l} className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${l.dot}`} />
            <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">{l.l}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <Card className="xl:col-span-2">
          <CardContent>
            <div className="flex justify-between items-center mb-5">
              <div>
                <h2 className="font-headline text-xl font-bold text-primary">October 2024</h2>
                <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mt-0.5">Fiscal Overview</p>
              </div>
              <div className="flex gap-2">
                {['chevron_left', 'chevron_right'].map(ic => (
                  <button key={ic} className="p-2 bg-surface-low rounded-xl text-primary hover:bg-surface-high transition-colors">
                    <Icon name={ic} size={20} />
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 sm:gap-y-3 text-center">
              {['S','M','T','W','T','F','S'].map((d, i) => (
                <div key={i} className="text-2xs font-bold uppercase tracking-widest text-on-surface-variant/60 py-2">{d}</div>
              ))}
              {[29, 30].map(d => <div key={`pre-${d}`} className="text-on-surface-variant/20 text-sm py-2">{d}</div>)}
              {days.map(d => {
                const isToday = d === selected;
                const dots = DAY_EVENTS[d];
                return (
                  <button key={d} onClick={() => setSelected(d)}
                    className={`min-h-12 sm:min-h-14 flex flex-col items-center justify-center gap-1.5 py-2 rounded-xl transition-all cursor-pointer ${isToday ? 'bg-primary/8' : 'hover:bg-surface-low'}`}>
                    <span className={`text-sm font-semibold text-primary ${isToday ? 'underline decoration-2 underline-offset-2' : ''}`}>{d}</span>
                    {dots && (
                      <div className="flex gap-0.5">
                        {dots.map((t, i) => <div key={i} className={`w-1.5 h-1.5 rounded-full ${DOT_COLORS[t]}`} />)}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="min-w-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-headline text-lg font-bold text-on-surface">Events — Oct {selected}</h3>
            <span className="text-xs font-semibold text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">Oct {selected}, 2024</span>
          </div>
          {events.length > 0 ? (
            <div className="space-y-3">
              {events.map((e, i) => {
                const s = EVT_COLORS[e.type] || EVT_COLORS.bill;
                return (
                  <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-card">
                    <div className={`w-10 h-10 rounded-full ${s.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon name={e.icon} size={20} filled className={s.ic} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-on-surface">{e.name}</p>
                      <p className="text-xs text-on-surface-variant">{e.time}</p>
                    </div>
                    <span className={`text-sm font-bold whitespace-nowrap ${e.type === 'income' ? 'text-primary' : e.type === 'expense' ? 'text-error' : 'text-[#6a3a06]'}`}>{e.amount}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-on-surface-variant">
              <Icon name="event_available" size={40} className="mx-auto mb-3" />
              <p className="text-sm">No events on this day</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
