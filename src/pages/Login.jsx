// src/pages/Login.jsx
import { useState } from 'react';
import { Icon } from '../components/ui/index.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Input } from '../components/ui/Input.jsx';

function FeaturePoint({ icon, text }) {
  return (
    <div className="flex items-center gap-3 text-white/80">
      <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
        <Icon name={icon} size={15} className="text-white" />
      </div>
      <span className="text-sm">{text}</span>
    </div>
  );
}

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('arjun.m@arthyatra.in');
  const [password, setPassword] = useState('••••••••');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 900);
  };

  return (
    <div className="min-h-screen bg-surface flex font-body">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary-mid to-[#003d49] flex-col justify-between p-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full pointer-events-none" />
        <div className="absolute -bottom-32 -left-16 w-72 h-72 bg-white/4 rounded-full pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
              <Icon name="account_balance" size={20} className="text-white" filled />
            </div>
            <span className="font-headline font-extrabold text-xl text-white tracking-widest">ARTH YATRA</span>
          </div>

          <h1 className="font-headline text-5xl font-extrabold text-white leading-tight mb-4 tracking-tight">
            The Architecture<br />of your Capital.
          </h1>
          <p className="text-lg text-white/70 leading-relaxed max-w-md">
            Experience portfolio management as a bespoke editorial layout. High-clarity, vault-grade, and strictly confidential.
          </p>
        </div>

        <div className="relative z-10 space-y-4">
          <p className="text-2xs font-bold uppercase tracking-widest text-white/50 mb-4">Platform Features</p>
          <FeaturePoint icon="encrypted"    text="Vault-Grade Security & Biometric Authentication" />
          <FeaturePoint icon="trending_up"  text="Real-time NSE/BSE Portfolio Synchronization" />
          <FeaturePoint icon="auto_awesome" text="AI-Powered Fiscal Intelligence & Insights" />
          <FeaturePoint icon="history_edu"  text="Editorial Financial Reporting & Tax Planning" />
        </div>

        <div className="relative z-10 flex items-center gap-2">
          <div className="flex -space-x-2">
            {['AM', 'PK', 'RS', 'NK'].map(i => (
              <div key={i} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-2xs font-bold border-2 border-primary-mid">{i}</div>
            ))}
          </div>
          <p className="text-sm text-white/60 ml-2">Trusted by <strong className="text-white">2,400+</strong> HNW clients</p>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12">
        {/* Mobile logo */}
        <div className="flex items-center gap-2 mb-8 lg:hidden">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Icon name="account_balance" size={16} className="text-white" filled />
          </div>
          <span className="font-headline font-extrabold text-lg text-primary tracking-widest">ARTH YATRA</span>
        </div>

        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="font-headline text-3xl font-extrabold text-on-surface tracking-tight mb-2">Welcome back</h2>
            <p className="text-md text-on-surface-variant">Authorize access to your wealth platform.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email ID"
              icon="mail"
              type="email"
              placeholder="client@arthyatra.in"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <div>
              <Input
                label="Password"
                icon="lock"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <div className="flex justify-end mt-1.5">
                <button type="button" className="text-xs font-semibold text-primary hover:underline">
                  Forgot Password?
                </button>
              </div>
            </div>

            <Button type="submit" fullWidth size="lg" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z" />
                  </svg>
                  Authorizing…
                </span>
              ) : (
                <><span>Authorize Access</span><Icon name="arrow_forward" size={18} /></>
              )}
            </Button>
          </form>

          <div className="mt-5 text-center">
            <p className="text-xs text-on-surface-variant">
              Don't have an account?{' '}
              <button className="text-primary font-semibold hover:underline">Request Early Invitation</button>
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 pt-6 border-t border-surface-container">
            <p className="text-2xs text-center text-on-surface-variant mb-4 font-medium">Secured by</p>
            <div className="flex items-center justify-center gap-6">
              {[
                { icon: 'security', label: '256-bit SSL' },
                { icon: 'verified_user', label: 'RBI Compliant' },
                { icon: 'gpp_good', label: 'ISO 27001' },
              ].map(t => (
                <div key={t.label} className="flex items-center gap-1.5 text-on-surface-variant">
                  <Icon name={t.icon} size={14} />
                  <span className="text-2xs font-semibold">{t.label}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-2xs text-center text-on-surface-variant mt-6 leading-relaxed px-4">
            By signing in, you agree to our{' '}
            <span className="text-primary font-semibold cursor-pointer">Terms of Service</span> and{' '}
            <span className="text-primary font-semibold cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
