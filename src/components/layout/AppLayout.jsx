import { useState } from 'react';
import { Icon } from '../ui/index.jsx';

const NAV_ITEMS = [
  { id: 'dashboard', icon: 'dashboard', label: 'Dashboard', group: 'main' },
  { id: 'income', icon: 'payments', label: 'Income', group: 'main' },
  { id: 'expenses', icon: 'account_balance_wallet', label: 'Expenses', group: 'main' },
  { id: 'investments', icon: 'trending_up', label: 'Investments', group: 'main' },
  { id: 'loans', icon: 'home_iot_device', label: 'Loans & Mortgage', group: 'main' },
  { id: 'budget', icon: 'monitoring', label: 'Budget', group: 'main' },
  { id: 'calculators', icon: 'calculate', label: 'Calculators', group: 'tools' },
  { id: 'calendar', icon: 'calendar_month', label: 'Calendar', group: 'tools' },
  { id: 'goals', icon: 'ads_click', label: 'Goals', group: 'tools' },
  { id: 'scenario', icon: 'query_stats', label: 'Scenario Planning', group: 'tools' },
  { id: 'reports', icon: 'bar_chart', label: 'Reports', group: 'tools' },
];

const MOBILE_DOCK_ITEMS = [
  { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
  { id: 'income', icon: 'payments', label: 'Income' },
  { id: 'expenses', icon: 'account_balance_wallet', label: 'Expense' },
  { id: 'calculators', icon: 'calculate', label: 'Calculators' },
];

function NavItem({ item, active, onClick }) {
  return (
    <button
      onClick={() => onClick(item.id)}
      className={[
        'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 text-left group',
        active
          ? 'bg-white text-primary font-bold shadow-sm translate-x-0.5'
          : 'text-on-surface-variant hover:bg-white/60 hover:text-on-surface hover:translate-x-0.5',
      ].join(' ')}
    >
      <Icon
        name={item.icon}
        size={18}
        filled={active}
        className={active ? 'text-primary' : 'text-on-surface-variant group-hover:text-on-surface'}
      />
      <span className="font-body">{item.label}</span>
    </button>
  );
}

function Brand({ collapsed = false }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-5 border-b border-surface-container ${collapsed ? 'justify-center' : ''}`}>
      <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
        <Icon name="account_balance" size={16} filled className="text-white" />
      </div>
      {!collapsed && (
        <div>
          <p className="font-headline text-sm font-extrabold text-primary leading-none tracking-wide">ARTH YATRA</p>
          <p className="text-2xs text-outline uppercase tracking-widest mt-0.5">Wealth Platform</p>
        </div>
      )}
    </div>
  );
}

function SidebarContent({ collapsed, activePage, onNavigate, onNewTransaction, user }) {
  const mainItems = NAV_ITEMS.filter(item => item.group === 'main');
  const toolItems = NAV_ITEMS.filter(item => item.group === 'tools');

  return (
    <>
      <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
        {!collapsed && <p className="text-2xs font-bold uppercase tracking-widest text-outline px-3 py-2">Main</p>}
        {mainItems.map(item => (
          <NavItem key={item.id} item={item} active={activePage === item.id} onClick={onNavigate} />
        ))}

        {!collapsed && <p className="text-2xs font-bold uppercase tracking-widest text-outline px-3 py-2 mt-3">Tools</p>}
        <div className="mt-1 space-y-0.5">
          {toolItems.map(item => (
            <NavItem key={item.id} item={item} active={activePage === item.id} onClick={onNavigate} />
          ))}
        </div>
      </nav>

      {!collapsed && (
        <div className="p-3 border-t border-surface-container">
          <button
            onClick={onNewTransaction}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-br from-primary to-primary-mid text-white py-2.5 rounded-xl text-sm font-bold font-headline shadow-primary transition-opacity hover:opacity-90 active:scale-[0.98]"
          >
            <Icon name="add" size={16} />
            New Transaction
          </button>
        </div>
      )}

      <div className={`p-3 border-t border-surface-container ${collapsed ? 'flex flex-col items-center gap-2' : ''}`}>
        {!collapsed ? (
          <>
            <div className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/60 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-primary-mid flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {user.name.split(' ').map(name => name[0]).join('')}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-on-surface truncate">{user.name}</p>
                <p className="text-2xs text-outline">{user.tier}</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('settings')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-on-surface-variant hover:bg-white/60 transition-colors mt-1"
            >
              <Icon name="settings" size={16} />
              Settings
            </button>
          </>
        ) : (
          <button
            onClick={() => onNavigate('settings')}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-on-surface-variant hover:bg-white/60"
          >
            <Icon name="settings" size={18} />
          </button>
        )}
      </div>
    </>
  );
}

export function AppLayout({
  children,
  activePage,
  onNavigate,
  user = { name: 'Arjun Malhotra', tier: 'Premium HNW' },
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const handleNewTransaction = () => {
    handleNavigate('income');
  };

  return (
    <div className="min-h-screen min-h-svh bg-surface flex font-body">
      <aside
        className={[
          'fixed left-0 top-0 bottom-0 z-40 hidden lg:flex bg-[#f0f2f4] flex-col transition-all duration-300',
          collapsed ? 'w-16' : 'w-60',
        ].join(' ')}
      >
        <Brand collapsed={collapsed} />
        <SidebarContent
          collapsed={collapsed}
          activePage={activePage}
          onNavigate={handleNavigate}
          onNewTransaction={handleNewTransaction}
          user={user}
        />
      </aside>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close navigation"
            className="absolute inset-0 bg-[#0a1719]/35 backdrop-blur-[2px]"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative h-full w-[min(20rem,88vw)] bg-[#f0f2f4] flex flex-col shadow-card-lg mobile-safe-pad">
            <div className="flex items-center justify-between border-b border-surface-container">
              <Brand />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="mr-4 w-10 h-10 rounded-xl flex items-center justify-center text-on-surface-variant hover:bg-white/70"
              >
                <Icon name="close" size={20} />
              </button>
            </div>
            <SidebarContent
              collapsed={false}
              activePage={activePage}
              onNavigate={handleNavigate}
              onNewTransaction={handleNewTransaction}
              user={user}
            />
          </div>
        </div>
      )}

      <div className={`flex-1 flex flex-col min-h-screen min-h-svh transition-all duration-300 ${collapsed ? 'lg:ml-16' : 'lg:ml-60'}`}>
        <header className="sticky top-0 z-30 min-h-16 bg-surface/90 backdrop-blur-md border-b border-surface-container shadow-nav flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="w-10 h-10 flex items-center justify-center rounded-xl text-on-surface-variant hover:bg-surface-high transition-colors lg:hidden"
            >
              <Icon name="menu" size={20} />
            </button>
            <button
              onClick={() => setCollapsed(value => !value)}
              className="hidden lg:flex w-8 h-8 items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-high transition-colors"
            >
              <Icon name={collapsed ? 'menu_open' : 'menu'} size={20} />
            </button>
            <div className="flex items-center gap-2 bg-surface-high rounded-full px-3 py-1.5 min-w-0">
              <span className="text-xs font-bold text-primary">FY 24-25</span>
              <span className="text-outline text-xs">•</span>
              <span className="text-xs font-semibold text-on-surface-variant whitespace-nowrap">INR</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative hidden xl:block">
              <Icon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-4 py-2 bg-surface-high rounded-lg border-none text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 w-48 transition-all"
              />
            </div>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-high transition-colors relative">
              <Icon name="notifications" size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-tertiary rounded-full" />
            </button>
            <button className="w-9 h-9 rounded-full bg-primary-mid text-white text-xs font-bold flex items-center justify-center">
              AM
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-5 pb-28 sm:px-6 sm:py-6 sm:pb-32 lg:px-8 lg:py-8 lg:pb-8">
          {children}
        </main>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 lg:hidden pointer-events-none">
        <div className="relative mx-auto max-w-md">
          <div className="pointer-events-auto rounded-[1.75rem] border border-outline-variant/30 bg-white/96 backdrop-blur-md shadow-card-lg px-3 pt-3 pb-2">
            <div className="grid grid-cols-5 items-end">
              {MOBILE_DOCK_ITEMS.slice(0, 2).map(item => {
                const active = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className="flex flex-col items-center justify-center gap-1 pb-1 text-center"
                  >
                    <Icon name={item.icon} size={20} filled={active} className={active ? 'text-primary' : 'text-outline'} />
                    <span className={`text-[11px] font-semibold ${active ? 'text-primary' : 'text-outline'}`}>{item.label}</span>
                  </button>
                );
              })}

              <div className="flex justify-center">
                <button
                  aria-label="Add transaction"
                  onClick={handleNewTransaction}
                  className="w-14 h-14 -mt-8 rounded-2xl bg-gradient-to-br from-primary to-primary-mid text-white shadow-primary flex items-center justify-center border-4 border-surface"
                >
                  <Icon name="add" size={28} filled className="text-white" />
                </button>
              </div>

              {MOBILE_DOCK_ITEMS.slice(2).map(item => {
                const active = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className="flex flex-col items-center justify-center gap-1 pb-1 text-center"
                  >
                    <Icon name={item.icon} size={20} filled={active} className={active ? 'text-primary' : 'text-outline'} />
                    <span className={`text-[11px] font-semibold ${active ? 'text-primary' : 'text-outline'}`}>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
