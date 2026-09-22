import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  Globe2,
  Link2,
  MousePointerClick,
  QrCode,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import { useAuth } from "../hooks/useAuth";
import { urlApi } from "../api/urlApi";
import { ROUTES } from "../constants/routes";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

const FEATURES = [
  {
    icon: BarChart3,
    title: "Decision-grade analytics",
    text: "Understand every click with live performance, device, location and referrer data.",
  },
  {
    icon: ShieldCheck,
    title: "Links you can trust",
    text: "Protect sensitive destinations with passwords, expiration and reliable routing.",
  },
  {
    icon: QrCode,
    title: "Ready for every channel",
    text: "Generate QR codes and share a consistent short link across digital and physical touchpoints.",
  },
];

const STATS = [
  { value: "99.99%", label: "routing uptime" },
  { value: "< 40ms", label: "redirect latency" },
  { value: "24/7", label: "link monitoring" },
];

const PLANS = [
  {
    name: "Starter",
    price: "Free",
    description: "For getting your first links into the world.",
    features: [
      "Unlimited short links",
      "Essential click analytics",
      "QR code generation",
    ],
  },
  {
    name: "Scale",
    price: "$19",
    description: "For teams that need a clearer growth signal.",
    features: [
      "Everything in Starter",
      "Advanced analytics",
      "Password protection",
      "Priority support",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations with governance at scale.",
    features: [
      "Everything in Scale",
      "Dedicated support",
      "Custom retention",
      "Team controls",
    ],
  },
];

export const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState(0);

  const handleQuickShorten = async (event) => {
    event.preventDefault();
    setError("");
    setShortUrl("");
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN);
      return;
    }
    setLoading(true);
    try {
      const { data } = await urlApi.createUrl({ original_url: longUrl });
      setShortUrl(data.data.short_url);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  };

  const copyResult = async () => {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative overflow-hidden">
      <section className="app-grid relative border-b border-[var(--color-border)]">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-12 lg:pb-28 lg:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs font-semibold text-[var(--color-text-muted)]">
              <Sparkles size={13} className="text-[var(--color-brand)]" />
              Link intelligence for modern teams
            </div>
            <h1 className="max-w-3xl text-5xl font-bold leading-[1.02] tracking-[-0.055em] text-[var(--color-text)] sm:text-6xl lg:text-7xl">
              Short links.
              <br />
              <span className="text-[var(--color-brand)]">
                Clear direction.
              </span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-[var(--color-text-muted)] sm:text-lg">
              TinyRoute turns every URL into a measurable, protected
              destination. Ship links quickly, then see exactly what they do.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.REGISTER}>
                <Button size="lg" icon={ArrowUpRight} iconPosition="right">
                  {isAuthenticated ? "Open workspace" : "Start for free"}
                </Button>
              </Link>
              <a
                href="#workflow"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-5 py-3 text-sm font-semibold text-[var(--color-text-muted)] transition hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]"
              >
                See how it works
              </a>
            </div>
            <div className="mt-12 flex flex-wrap gap-8 border-t border-[var(--color-border)] pt-6">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="font-[var(--font-display)] text-2xl font-bold text-[var(--color-text)]">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-[var(--color-text-subtle)]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.12, duration: 0.55 }}
            className="relative"
          >
            <div className="absolute -inset-6 rounded-[2rem] bg-[var(--color-brand)]/10 blur-3xl" />
            <Card variant="glass" className="relative p-0">
              <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[var(--color-success)]" />
                  <span className="text-xs font-semibold text-[var(--color-text-muted)]">
                    Quick create
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[var(--color-text-subtle)]">
                  tinyroute / new-link
                </span>
              </div>
              <div className="p-5 sm:p-7">
                <p className="eyebrow">Create a short link</p>
                <h2 className="mt-2 text-2xl font-bold text-[var(--color-text)]">
                  Make every click count.
                </h2>
                <form onSubmit={handleQuickShorten} className="mt-6 space-y-3">
                  <label className="sr-only" htmlFor="home-url">
                    Long URL
                  </label>
                  <input
                    id="home-url"
                    type="url"
                    required
                    value={longUrl}
                    onChange={(event) => setLongUrl(event.target.value)}
                    placeholder="https://your-destination.com"
                    className="h-12 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-subtle)] focus:border-[var(--color-brand)] focus:shadow-[var(--focus-ring)]"
                  />
                  <Button
                    type="submit"
                    size="lg"
                    fullWidth
                    isLoading={loading}
                    icon={Zap}
                  >
                    Shorten URL
                  </Button>
                </form>
                {error && (
                  <p className="mt-3 text-xs font-medium text-[var(--color-danger)]">
                    {error}
                  </p>
                )}
                {shortUrl && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-5 flex items-center gap-3 rounded-lg border border-[color-mix(in_srgb,var(--color-success)_30%,var(--color-border))] bg-[color-mix(in_srgb,var(--color-success)_8%,var(--color-surface))] p-3"
                  >
                    <span className="min-w-0 flex-1 truncate font-mono text-xs text-[var(--color-success)]">
                      {shortUrl}
                    </span>
                    <button
                      onClick={copyResult}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-[var(--color-surface-raised)] px-2.5 py-1.5 text-xs font-semibold text-[var(--color-text)]"
                    >
                      {copied ? <Check size={13} /> : <Copy size={13} />}
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </motion.div>
                )}
              </div>
              <div className="grid grid-cols-3 border-t border-[var(--color-border)]">
                <div className="p-4">
                  <p className="text-lg font-bold text-[var(--color-text)]">
                    2.4k
                  </p>
                  <p className="text-[10px] text-[var(--color-text-subtle)]">
                    links this week
                  </p>
                </div>
                <div className="border-x border-[var(--color-border)] p-4">
                  <p className="text-lg font-bold text-[var(--color-text)]">
                    84%
                  </p>
                  <p className="text-[10px] text-[var(--color-text-subtle)]">
                    return visitors
                  </p>
                </div>
                <div className="p-4">
                  <p className="text-lg font-bold text-[var(--color-text)]">
                    12ms
                  </p>
                  <p className="text-[10px] text-[var(--color-text-subtle)]">
                    avg. response
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <section
        id="workflow"
        className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-12 lg:py-28"
      >
        <div className="max-w-2xl">
          <p className="eyebrow">One workspace, every signal</p>
          <h2 className="mt-3 text-3xl font-bold text-[var(--color-text)] sm:text-4xl">
            The link layer your team can rely on.
          </h2>
          <p className="mt-4 leading-7 text-[var(--color-text-muted)]">
            From the first share to the final conversion, TinyRoute gives your
            team a fast, consistent place to create and learn.
          </p>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, text }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.08 }}
            >
              <Card hover className="h-full">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-brand-soft)] text-[var(--color-brand)]">
                  <Icon size={19} />
                </span>
                <h3 className="mt-6 text-lg font-bold text-[var(--color-text)]">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                  {text}
                </p>
                <span className="mt-8 inline-flex items-center gap-1 text-xs font-bold text-[var(--color-brand)]">
                  Explore capability <ArrowUpRight size={13} />
                </span>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--color-border)] bg-[var(--color-surface-soft)]">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-12 lg:py-24">
          <div>
            <p className="eyebrow">Built for momentum</p>
            <h2 className="mt-3 text-3xl font-bold text-[var(--color-text)]">
              Small links. Serious infrastructure.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-[var(--color-text-muted)]">
              A clean, fast command center for growth teams, creators and
              developers who care about the details.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="p-5">
              <Activity className="text-[var(--color-cyan)]" size={20} />
              <p className="mt-5 text-sm font-bold text-[var(--color-text)]">
                Live performance
              </p>
              <p className="mt-2 text-xs leading-5 text-[var(--color-text-muted)]">
                Watch clicks land in real time, without waiting for a report.
              </p>
            </Card>
            <Card className="p-5">
              <Globe2 className="text-[var(--color-brand)]" size={20} />
              <p className="mt-5 text-sm font-bold text-[var(--color-text)]">
                Global by default
              </p>
              <p className="mt-2 text-xs leading-5 text-[var(--color-text-muted)]">
                Understand audience geography and devices at a glance.
              </p>
            </Card>
            <Card className="p-5">
              <MousePointerClick
                className="text-[var(--color-success)]"
                size={20}
              />
              <p className="mt-5 text-sm font-bold text-[var(--color-text)]">
                Actionable signals
              </p>
              <p className="mt-2 text-xs leading-5 text-[var(--color-text-muted)]">
                Turn traffic patterns into a clearer next move.
              </p>
            </Card>
            <Card className="p-5">
              <Link2 className="text-[var(--color-warning)]" size={20} />
              <p className="mt-5 text-sm font-bold text-[var(--color-text)]">
                Organized links
              </p>
              <p className="mt-2 text-xs leading-5 text-[var(--color-text-muted)]">
                Keep your growing link library easy to search and manage.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-12 lg:py-28">
        <div className="text-center">
          <p className="eyebrow">Simple pricing</p>
          <h2 className="mt-3 text-3xl font-bold text-[var(--color-text)] sm:text-4xl">
            Start small. Scale with confidence.
          </h2>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <Card
              key={plan.name}
              className={`relative ${plan.featured ? "border-[var(--color-brand)] shadow-[var(--shadow-md)]" : ""}`}
            >
              {plan.featured && (
                <span className="absolute right-5 top-5 rounded-full bg-[var(--color-brand-soft)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand)]">
                  Most popular
                </span>
              )}
              <p className="eyebrow">{plan.name}</p>
              <p className="mt-5 text-4xl font-bold text-[var(--color-text)]">
                {plan.price}
                <span className="text-sm font-normal text-[var(--color-text-subtle)]">
                  {plan.price.startsWith("$") && "/ month"}
                </span>
              </p>
              <p className="mt-3 min-h-10 text-sm text-[var(--color-text-muted)]">
                {plan.description}
              </p>
              <ul className="mt-7 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]"
                  >
                    <CheckCircle2
                      size={15}
                      className="text-[var(--color-success)]"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to={ROUTES.REGISTER} className="mt-8 block">
                <Button
                  variant={plan.featured ? "primary" : "outline"}
                  fullWidth
                >
                  {plan.name === "Enterprise" ? "Talk to us" : "Choose plan"}
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--color-border)] bg-[var(--color-surface-soft)]">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:py-24">
          <div className="text-center">
            <p className="eyebrow">Questions, answered</p>
            <h2 className="mt-3 text-3xl font-bold text-[var(--color-text)]">
              A clearer way to share.
            </h2>
          </div>
          <div className="mt-10 space-y-2">
            {[
              "Can I use TinyRoute without a team?",
              "What analytics are available?",
              "Can I protect or expire a link?",
              "How quickly can I get started?",
            ].map((question, index) => (
              <div
                key={question}
                className="border-b border-[var(--color-border)]"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left text-sm font-semibold text-[var(--color-text)]"
                >
                  <span>{question}</span>
                  <ChevronDown
                    size={17}
                    className={`transition-transform ${openFaq === index ? "rotate-180 text-[var(--color-brand)]" : "text-[var(--color-text-subtle)]"}`}
                  />
                </button>
                {openFaq === index && (
                  <p className="pb-5 text-sm leading-6 text-[var(--color-text-muted)]">
                    Yes. TinyRoute is designed to be useful from the first link,
                    with analytics and protection features available as your
                    workflow grows.
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-12 lg:py-28">
        <div className="relative overflow-hidden rounded-2xl border border-[var(--color-brand)]/30 bg-[var(--color-brand-soft)] p-8 sm:p-12">
          <div className="relative z-10 max-w-2xl">
            <p className="eyebrow text-[var(--color-brand)]">
              Your next link starts here
            </p>
            <h2 className="mt-3 text-3xl font-bold text-[var(--color-text)] sm:text-4xl">
              Make sharing feel intentional.
            </h2>
            <p className="mt-4 text-sm leading-6 text-[var(--color-text-muted)]">
              Create your workspace in a minute and bring clarity to every
              destination you publish.
            </p>
            <Link
              to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.REGISTER}
              className="mt-7 inline-block"
            >
              <Button icon={ArrowUpRight} iconPosition="right">
                {isAuthenticated ? "Open workspace" : "Create your account"}
              </Button>
            </Link>
          </div>
          <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border-[32px] border-[var(--color-brand)]/10" />
        </div>
      </section>
    </div>
  );
};
