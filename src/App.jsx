// src/App.jsx — Main router (no external router needed for self-contained demo)
import { useState } from 'react';
import { AppLayout } from './components/layout/AppLayout.jsx';

// Pages
import Login         from './pages/Login.jsx';
import Dashboard     from './pages/Dashboard.jsx';
import Income        from './pages/Income.jsx';
import Expenses      from './pages/Expenses.jsx';
import Investments   from './pages/Investments.jsx';
import Loans         from './pages/Loans.jsx';
import Budget        from './pages/Budget.jsx';
import Calculators   from './pages/Calculators.jsx';
import Calendar      from './pages/Calendar.jsx';
import Goals         from './pages/Goals.jsx';
import ScenarioPlanning from './pages/ScenarioPlanning.jsx';
import Reports       from './pages/Reports.jsx';
import Settings      from './pages/Settings.jsx';

const PAGE_MAP = {
  dashboard:  Dashboard,
  income:     Income,
  expenses:   Expenses,
  investments:Investments,
  loans:      Loans,
  budget:     Budget,
  calculators:Calculators,
  calendar:   Calendar,
  goals:      Goals,
  scenario:   ScenarioPlanning,
  reports:    Reports,
  settings:   Settings,
};

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  const PageComponent = PAGE_MAP[activePage] || Dashboard;

  return (
    <AppLayout activePage={activePage} onNavigate={setActivePage}>
      <PageComponent />
    </AppLayout>
  );
}
