import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { urlApi } from '../api/urlApi';
import { ROUTES } from '../constants/routes';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import {
  Link2,
  Zap,
  BarChart3,
  ShieldCheck,
  QrCode,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Copy,
  Check,
  Globe,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';

export const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleQuickShorten = async (e) => {
    e.preventDefault();
    setError('');
    setShortUrl('');

    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN);
      return;
    }

    setLoading(true);
    try {
      const { data } = await urlApi.createUrl({ original_url: longUrl });
      setShortUrl(data.data.short_url);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to shorten URL');
    } finally {
      setLoading(false);
    }
  };

  const copyResult = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-24 py-6">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto space-y-8 pt-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>Next-Generation URL Shortener & Analytics</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
          Shorten Links. Track Traffic. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">
            Understand Your Audience.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          TinyRoute is an enterprise URL shortening platform powered by Base62 encoding, custom aliases, password protection, and real-time geographic & device analytics.
        </p>

        {/* Hero Interactive Shortener Box */}
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-3xl shadow-xl border border-slate-200/80 dark:border-slate-800/80 max-w-2xl mx-auto">
          <form onSubmit={handleQuickShorten} className="flex flex-col sm:flex-row gap-3">
            <input
              type="url"
              required
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="Paste your long destination URL here..."
              className="flex-1 px-4 py-3 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
            />
            <Button type="submit" isLoading={loading} size="lg" icon={Zap} className="shadow-md shadow-indigo-500/20">
              Shorten URL
            </Button>
          </form>

          {error && <p className="text-rose-500 text-xs mt-3 text-left font-medium">{error}</p>}

          {shortUrl && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3.5 bg-indigo-50 dark:bg-indigo-950/60 rounded-2xl flex items-center justify-between border border-indigo-200 dark:border-indigo-900"
            >
              <span className="font-mono font-bold text-xs sm:text-sm text-indigo-600 dark:text-indigo-300 truncate">
                {shortUrl}
              </span>
              <button
                onClick={copyResult}
                className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3 py-1.5 rounded-xl transition shadow-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </motion.div>
          )}
        </div>

        <div className="flex justify-center items-center space-x-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <span className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-1.5" /> No credit card required</span>
          <span className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-1.5" /> Unlimited clicks</span>
        </div>
      </section>

      {/* Features Grid */}
      <section className="space-y-8 max-w-6xl mx-auto">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Built for Modern Growth Teams
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Everything you need to control and analyze link traffic</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card hover className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Base62 Encoding</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              56B+ shortcode capacity with automated collision detection and resolution retry loop.
            </p>
          </Card>

          <Card hover className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Real-Time Analytics</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Track click trends, browser share, device types, top countries, and HTTP referrers.
            </p>
          </Card>

          <Card hover className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Password & Expiry</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Secure links with custom passwords, set expiration dates, or cap max click limits.
            </p>
          </Card>

          <Card hover className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <QrCode className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Vector QR Export</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Instantly generate and download high-resolution PNG & SVG vector QR codes.
            </p>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">How TinyRoute Works</h2>
          <p className="text-xs sm:text-sm text-slate-400">Three simple steps to publish and track links</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-sm">1</div>
            <h4 className="text-base font-bold text-white">Paste Destination URL</h4>
            <p className="text-xs text-slate-400">Enter any long URL from your product, blog, or campaign.</p>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-sm">2</div>
            <h4 className="text-base font-bold text-white">Customize Parameters</h4>
            <p className="text-xs text-slate-400">Set custom aliases, password protection, or expiration dates.</p>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-sm">3</div>
            <h4 className="text-base font-bold text-white">Track Analytics</h4>
            <p className="text-xs text-slate-400">Monitor clicks, devices, referrers, and locations in real time.</p>
          </div>
        </div>
      </section>

      {/* Pricing Tiers Placeholder */}
      <section className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Pricing Plans</h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Simple, transparent pricing for teams of all sizes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Free Starter</h3>
            <p className="text-2xl font-black text-slate-900 dark:text-white">$0 <span className="text-xs text-slate-400 font-normal">/ month</span></p>
            <ul className="text-xs space-y-2 text-slate-600 dark:text-slate-400">
              <li>✓ 1,000 Short Links</li>
              <li>✓ Base62 Code Generation</li>
              <li>✓ Standard Analytics</li>
            </ul>
            <Link to={ROUTES.REGISTER}>
              <Button variant="outline" className="w-full mt-4">Get Started</Button>
            </Link>
          </Card>

          <Card className="space-y-4 border-2 border-indigo-600 relative">
            <div className="absolute -top-3 right-4 bg-indigo-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">POPULAR</div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Pro Plan</h3>
            <p className="text-2xl font-black text-slate-900 dark:text-white">$19 <span className="text-xs text-slate-400 font-normal">/ month</span></p>
            <ul className="text-xs space-y-2 text-slate-600 dark:text-slate-400">
              <li>✓ Unlimited Short Links</li>
              <li>✓ Custom Aliases & Passwords</li>
              <li>✓ Advanced Geo Analytics</li>
              <li>✓ QR Code Downloads</li>
            </ul>
            <Link to={ROUTES.REGISTER}>
              <Button variant="primary" className="w-full mt-4">Start Free Trial</Button>
            </Link>
          </Card>

          <Card className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Enterprise</h3>
            <p className="text-2xl font-black text-slate-900 dark:text-white">$99 <span className="text-xs text-slate-400 font-normal">/ month</span></p>
            <ul className="text-xs space-y-2 text-slate-600 dark:text-slate-400">
              <li>✓ Dedicated Custom Domain</li>
              <li>✓ Team Roles & Admin Control</li>
              <li>✓ 99.99% SLA Guarantee</li>
              <li>✓ Priority Support</li>
            </ul>
            <Link to={ROUTES.REGISTER}>
              <Button variant="outline" className="w-full mt-4">Contact Sales</Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-indigo-600 to-sky-600 rounded-3xl p-8 sm:p-12 text-center text-white space-y-6 shadow-xl max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Ready to supercharge your links?</h2>
        <p className="text-sm text-indigo-100 max-w-xl mx-auto">
          Join thousands of developers and growth teams shortening links with TinyRoute.
        </p>
        <Link to={ROUTES.REGISTER}>
          <Button variant="secondary" size="lg" className="bg-white text-slate-900 hover:bg-slate-100 shadow-md">
            Create Free Account
          </Button>
        </Link>
      </section>
    </div>
  );
};
