// src/pages/Settings.jsx
import { useState } from 'react';
import { Card, CardContent, PageHeader, Icon } from '../components/ui/index.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Toggle } from '../components/ui/index.jsx';
import { Input } from '../components/ui/Input.jsx';

const SECTIONS = [
  { id: 'account',     icon: 'person',              label: 'Account Profile' },
  { id: 'security',    icon: 'security',            label: 'Security' },
  { id: 'modules',     icon: 'dashboard_customize', label: 'Modules' },
  { id: 'preferences', icon: 'tune',                label: 'Preferences' },
  { id: 'notifications',icon:'notifications',       label: 'Notifications' },
  { id: 'support',     icon: 'contact_support',     label: 'Support' },
];

const MODULES = [
  { id: 'income',    icon: 'payments',               label: 'Income Streams',   desc: 'Salary, dividends, and freelance tracking' },
  { id: 'expense',   icon: 'receipt_long',           label: 'Expense Engine',   desc: 'AI-categorized automated spending logs' },
  { id: 'portfolio', icon: 'trending_up',            label: 'Portfolio Tracker',desc: 'Real-time NSE/BSE and Mutual Fund syncing' },
  { id: 'liability', icon: 'home_iot_device',        label: 'Liability Center', desc: 'EMI schedules, loans, and credit cards' },
  { id: 'calc',      icon: 'calculate',             label: 'Fiscal Calculators',desc: 'Tax planning (Old vs New) & SIP tools' },
  { id: 'scenario',  icon: 'query_stats',           label: 'Scenario Modeler', desc: 'Simulate inflation and FIRE goals' },
];

function SideNav({ active, onSelect }) {
  return (
    <nav className="w-full lg:w-52 flex-shrink-0 space-y-1">
      <div className="flex items-center gap-3 p-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary-mid flex items-center justify-center text-white text-sm font-bold">
          AM
        </div>
        <div>
          <p className="text-sm font-bold text-on-surface">Arjun Malhotra</p>
          <p className="text-2xs text-outline">Premium HNW</p>
        </div>
      </div>
      {SECTIONS.map(s => (
        <button
          key={s.id}
          onClick={() => onSelect(s.id)}
          className={[
            'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body transition-all text-left',
            active === s.id
              ? 'bg-white text-primary font-semibold shadow-card'
              : 'text-on-surface-variant hover:bg-white/70 hover:text-on-surface',
          ].join(' ')}
        >
          <Icon name={s.icon} size={17} filled={active === s.id} />
          {s.label}
        </button>
      ))}
      <div className="pt-4 mt-4 border-t border-surface-container">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-error hover:bg-error/5 transition-colors">
          <Icon name="logout" size={17} />
          Log Out
        </button>
      </div>
    </nav>
  );
}

function AccountSection() {
  return (
    <section id="account" className="space-y-5 scroll-mt-24">
      <div className="flex items-center justify-between">
        <h2 className="font-headline text-xl font-bold text-primary">Account Profile</h2>
        <span className="text-2xs font-bold uppercase tracking-widest text-on-surface-variant">Identity</span>
      </div>
      <Card>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 rounded-2xl bg-primary-mid flex items-center justify-center text-white text-2xl font-bold font-headline">AM</div>
              <button className="absolute -bottom-2 -right-2 w-7 h-7 bg-white rounded-lg shadow-md flex items-center justify-center text-primary">
                <Icon name="edit" size={14} />
              </button>
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <Input label="Full Name"     defaultValue="Arjun Malhotra"           />
              <Input label="Email Address" defaultValue="arjun.m@arthyatra.in" type="email" />
              <Input label="Phone Number"  defaultValue="+91 98765 43210"           />
              <Input label="Location"      defaultValue="Mumbai, Maharashtra"       />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function SecuritySection() {
  const [tfa, setTfa] = useState(true);
  return (
    <section id="security" className="space-y-4 scroll-mt-24">
      <div className="flex items-center justify-between">
        <h2 className="font-headline text-xl font-bold text-primary">Security</h2>
        <span className="text-2xs font-bold uppercase tracking-widest text-on-surface-variant">Protection</span>
      </div>
      <Card>
        <div className="divide-y divide-surface-container">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5">
            <div className="flex items-center gap-4">
              <Icon name="lock" size={22} className="text-on-surface-variant" />
              <div>
                <p className="text-md font-semibold text-on-surface">Password Change</p>
                <p className="text-sm text-on-surface-variant">Last changed 4 months ago</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">Update</Button>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5">
            <div className="flex items-center gap-4">
              <Icon name="phonelink_setup" size={22} className="text-on-surface-variant" />
              <div>
                <p className="text-md font-semibold text-on-surface">Two-Factor Authentication</p>
                <p className="text-sm text-on-surface-variant">Secure your login with a mobile device</p>
              </div>
            </div>
            <Toggle on={tfa} onToggle={() => setTfa(p => !p)} label="Toggle 2FA" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5">
            <div className="flex items-center gap-4">
              <Icon name="devices" size={22} className="text-on-surface-variant" />
              <div>
                <p className="text-md font-semibold text-on-surface">Active Sessions</p>
                <p className="text-sm text-on-surface-variant">2 devices logged in</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">Manage</Button>
          </div>
        </div>
      </Card>
    </section>
  );
}

function ModulesSection() {
  const [mods, setMods] = useState(() =>
    Object.fromEntries(MODULES.map(m => [m.id, ['income','expense','portfolio'].includes(m.id)]))
  );
  return (
    <section id="modules" className="space-y-4 scroll-mt-24">
      <h2 className="font-headline text-xl font-bold text-primary">App Modules</h2>
      <Card>
        <div className="divide-y divide-surface-container">
          {MODULES.map(m => (
            <div key={m.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-surface-low flex items-center justify-center text-primary">
                  <Icon name={m.icon} size={20} />
                </div>
                <div>
                  <p className="text-md font-semibold text-on-surface">{m.label}</p>
                  <p className="text-sm text-on-surface-variant">{m.desc}</p>
                </div>
              </div>
              <Toggle on={mods[m.id]} onToggle={() => setMods(p => ({ ...p, [m.id]: !p[m.id] }))} label={`Toggle ${m.label}`} />
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}

function PreferencesSection() {
  return (
    <section id="preferences" className="space-y-4 scroll-mt-24">
      <div className="flex items-center justify-between">
        <h2 className="font-headline text-xl font-bold text-primary">Preferences</h2>
        <span className="text-2xs font-bold uppercase tracking-widest text-on-surface-variant">Localization</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: 'currency_rupee', label: 'Display Currency', options: ['INR (₹) – Indian Rupee', 'USD ($) – US Dollar', 'EUR (€) – Euro'] },
          { icon: 'translate',      label: 'Interface Language', options: ['English (UK)', 'Hindi (हिन्दी)', 'Marathi (मराठी)'] },
          { icon: 'date_range',     label: 'Fiscal Year Start', options: ['April (India Standard)', 'January (Calendar Year)'] },
          { icon: 'format_list_numbered', label: 'Number Format', options: ['Indian (Lakhs/Crores)', 'International (Millions/Billions)'] },
        ].map(p => (
          <Card key={p.label}>
            <CardContent>
              <div className="flex items-center gap-3 mb-3">
                <Icon name={p.icon} size={18} className="text-on-surface-variant" />
                <p className="text-md font-semibold text-on-surface">{p.label}</p>
              </div>
              <select className="w-full bg-surface-low border-none rounded-xl px-4 py-2.5 text-sm font-medium text-on-surface outline-none appearance-none cursor-pointer">
                {p.options.map(o => <option key={o}>{o}</option>)}
              </select>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function NotificationsSection() {
  const [push, setPush] = useState(true);
  const [email, setEmail] = useState(false);
  const [sms, setSms] = useState(true);
  const [weekly, setWeekly] = useState(true);

  const items = [
    { label: 'Push Notifications', desc: 'Real-time alerts for transactions', on: push, set: setPush, icon: 'notifications_active' },
    { label: 'Email Digest',       desc: 'Weekly financial summary emails',   on: email, set: setEmail, icon: 'mail_outline' },
    { label: 'SMS Alerts',         desc: 'Critical alerts via SMS',           on: sms, set: setSms,   icon: 'sms' },
    { label: 'Weekly Report',      desc: 'Auto-generated fiscal report',      on: weekly, set: setWeekly, icon: 'bar_chart' },
  ];

  return (
    <section id="notifications" className="space-y-4 scroll-mt-24">
      <h2 className="font-headline text-xl font-bold text-primary">Notifications</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(n => (
          <Card key={n.label}>
            <CardContent>
              <div className="flex justify-between items-start mb-3">
                <Icon name={n.icon} size={24} className="text-on-surface-variant" />
                <Toggle on={n.on} onToggle={() => n.set(p => !p)} label={`Toggle ${n.label}`} />
              </div>
              <p className="text-md font-semibold text-on-surface">{n.label}</p>
              <p className="text-xs text-on-surface-variant mt-1">{n.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function SupportSection() {
  const links = [
    { label: 'Frequently Asked Questions', icon: 'help_outline', desc: 'Browse common questions about Arth Yatra' },
    { label: 'Contact Relationship Manager', icon: 'support_agent', desc: 'Speak with your dedicated wealth advisor' },
    { label: 'Report a Bug', icon: 'bug_report', desc: 'Help us improve the platform' },
    { label: 'Keyboard Shortcuts', icon: 'keyboard', desc: 'Learn power user shortcuts' },
  ];
  return (
    <section id="support" className="space-y-4 scroll-mt-24">
      <h2 className="font-headline text-xl font-bold text-primary">Support</h2>
      <Card>
        <div className="divide-y divide-surface-container">
          {links.map(l => (
            <button key={l.label} className="w-full flex items-center gap-4 p-5 hover:bg-surface-low transition-colors text-left group">
              <div className="w-10 h-10 rounded-xl bg-surface-low flex items-center justify-center text-on-surface-variant group-hover:bg-surface-container transition-colors flex-shrink-0">
                <Icon name={l.icon} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-md font-semibold text-on-surface">{l.label}</p>
                <p className="text-xs text-on-surface-variant">{l.desc}</p>
              </div>
              <Icon name="chevron_right" size={18} className="text-on-surface-variant group-hover:text-on-surface transition-colors" />
            </button>
          ))}
        </div>
      </Card>

      {/* Version badge */}
      <div className="flex items-center justify-between text-xs text-on-surface-variant px-1">
        <span>Arth Yatra v2.4.0 (Build 892)</span>
        <span>© 2025 Artha Financial Systems</span>
      </div>
    </section>
  );
}

export default function Settings() {
  const [active, setActive] = useState('account');

  const scrollTo = (id) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <PageHeader
        title="Settings"
        subtitle="Configure your Arth Yatra experience and manage fiscal parameters."
        actions={
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" size="sm">Discard</Button>
            <Button icon="save" size="sm">Save Changes</Button>
          </div>
        }
      />

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Sticky Side Nav */}
        <div className="lg:sticky lg:top-6 h-fit bg-surface-low rounded-2xl p-3 flex-shrink-0">
          <SideNav active={active} onSelect={scrollTo} />
        </div>

        {/* Scrollable Sections */}
        <div className="flex-1 space-y-10 pb-20">
          <AccountSection />
          <SecuritySection />
          <ModulesSection />
          <PreferencesSection />
          <NotificationsSection />
          <SupportSection />

          {/* Save Footer */}
          <div className="sticky bottom-0 bg-surface/95 backdrop-blur-sm pt-4 pb-2 border-t border-surface-container flex flex-col sm:flex-row sm:justify-end gap-3">
            <Button variant="secondary">Discard Changes</Button>
            <Button icon="save">Save Arth Yatra Settings</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
