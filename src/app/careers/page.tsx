"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, 
  Code, 
  LineChart, 
  Cpu, 
  Mic, 
  Briefcase, 
  Users, 
  ChevronDown, 
  Terminal,
  Globe
} from "lucide-react";
import { FadeIn } from "@/components/FadeIn";

// --- DATA: THE ROLES ---
const roles = [
  // ALPHA DIVISION
  {
    id: "quant-researcher",
    title: "Quantitative Researcher",
    division: "Alpha Division",
    icon: <LineChart />,
    shortDesc: "Hunt for signal. Read academic papers, hypothesize strategies, and backtest using Python.",
    details: {
      focus: "Market Microstructure, Volatility Arbitrage, Stat-Arb.",
      responsibilities: [
        "Systematically review academic literature (SSRN) to generate novel trading signals.",
        "Clean and normalize messy datasets (Options chains, tick data) for research.",
        "Develop and stress-test strategies in Python, ensuring robustness against overfitting.",
        "Collaborate with Developers to translate research code into production execution logic."
      ],
      requirements: [
        "Obsession with probability and statistics.",
        "Strong Python skills (Pandas, NumPy, Scikit-learn).",
        "Understanding of Options Greeks (Delta, Gamma, Vega) is a massive plus.",
        "Ability to accept failure (90% of your ideas will fail backtesting)."
      ]
    }
  },
  {
    id: "quant-dev",
    title: "Quant Developer",
    division: "Alpha Division",
    icon: <Code />,
    shortDesc: "Build the engine. Architect the backtesting framework and data pipelines that power the firm.",
    details: {
      focus: "System Architecture, Data Engineering, Latency Optimization.",
      responsibilities: [
        "Maintain and optimize the firm's core backtesting engine (Python).",
        "Build automated data pipelines to ingest real-time market data from IBKR/Polygon.",
        "Develop internal dashboards (Streamlit/Next.js) for traders to monitor risk.",
        "Ensure system reliability: If the code breaks, we lose money."
      ],
      requirements: [
        "CS / SWE background with strong clean code principles.",
        "Proficiency in Python and async programming.",
        "Experience with SQL, Git, and Docker.",
        "Interest in financial APIs (CCXT, IBKR, Alpaca)."
      ]
    }
  },
  {
    id: "investment-analyst",
    title: "Investment Analyst (US Equities)",
    division: "Alpha Division",
    icon: <Cpu />,
    shortDesc: "The Market Oracle. Analyze US macro trends and tickers to find catalysts and events for the team.",
    details: {
      focus: "US Tech Sector, Macro-Quant, Earnings Catalysts.",
      responsibilities: [
        "Conduct deep-dive fundamental research on US Large Caps (NVDA, TSLA, AAPL).",
        "Identify 'Story Catalysts' (e.g., product delays, regulatory bans) that pure math models miss.",
        "Build financial models (DCF/Comps) to estimate intrinsic value vs. market price.",
        "Write the 'Prism Intelligence' memos for the firm's partners."
      ],
      requirements: [
        "Finance/Econ background.",
        "Ability to read 10-K reports and understand financial statements instantly.",
        "Active personal portfolio (US Markets preferred).",
        "Skeptical mindset: You don't believe the news; you verify it."
      ]
    }
  },
  
  // OPERATIONS DIVISION
  {
    id: "strat-ops",
    title: "Strategy & Operations Lead",
    division: "Operations",
    icon: <Briefcase />,
    shortDesc: "The Chief of Staff. You drive strategy and ensure the firm runs like a machine.",
    details: {
      focus: "Process Optimization, Talent Pipeline, Internal Systems.",
      responsibilities: [
        "Work directly with the Founder to define the vision and drive the roadmap.",
        "Manage the end-to-end recruitment pipeline for Cohort 1 and beyond.",
        "Implement internal tools (Notion, Slack, Linear) to organize team workflows.",
        "Solve high-level ambiguous problems (e.g., 'How do we legally structure equity?')."
      ],
      requirements: [
        "Hyper-organized. You love spreadsheets and systems.",
        "High EQ. You can manage people and navigate conflicts.",
        "Entrepreneurial mindset. You want to found your own company one day.",
        "Consulting or PM background is a plus."
      ]
    }
  },
  {
    id: "media-brand",
    title: "Media & Marketing Lead",
    division: "Operations",
    icon: <Mic />,
    shortDesc: "The Voice. Push Prism Lake's mission on the ground, and into viral outreach content.",
    details: {
      focus: "Brand Identity, Content Marketing, Community Growth.",
      responsibilities: [
        "Translate complex quant concepts into accessible, high-viral content.",
        "Manage the 'Prism Lake' brand aura across our channels.",
        "Design visual assets (charts, infographics) for our research reports.",
        "Launch and manage our marketing logistics."
      ],
      requirements: [
        "Strong portfolio in marketing or graphic design.",
        "Deep understanding of 'FinTok' and financial social media culture.",
        "Ability to write clean, punchy copy.",
        "You understand what our target market wants, and you want to drive it."
      ]
    }
  },
  {
    id: "campus-ambassador",
    title: "Campus Ambassador",
    division: "Operations",
    icon: <Globe />,
    shortDesc: "The Scout. Establish Prism Lake's presence at Malaysian universities.",
    details: {
      focus: "Networking, Partnerships, Talent Sourcing.",
      responsibilities: [
        "Act as the face of Prism Lake on your campus.",
        "Host Prism Lake initiatives at your University campus with the team.",
        "Identify the top 1% of talent at your university and funnel them to us.",
        "Secure partnerships with your university's existing investment clubs."
      ],
      requirements: [
        "High social capital. You know everyone on campus.",
        "Excellent public speaking and persuasion skills.",
        "Currently enrolled at a target Malaysian university (non-Sunway).",
        "Passion for building communities."
      ]
    }
  }
];

export default function CareersPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen pt-40 pb-20 px-4 max-w-5xl mx-auto">
      
      {/* HEADER */}
      <FadeIn className="mb-20 text-center md:text-left">
        <div className="inline-block glass-panel px-4 py-1.5 rounded-full text-xs font-mono text-[#1b17ff] mb-6 border-[#1b17ff]/30">
          WE ARE BUILDING THE CORE TEAM
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tighter">
          Join the <span className="text-[#1b17ff]">Build.</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl font-light leading-relaxed">
          We aren't looking for employees. We are recruiting <strong>Founding Partners</strong>. <br/>
          No salary (tentative, for now). Infinite upside in equity, experience, and status.
        </p>
      </FadeIn>

      {/* ROLES LIST */}
      <div className="space-y-6">
        {roles.map((role, idx) => (
          <FadeIn key={role.id} delay={idx * 0.1}>
            <div 
              onClick={() => toggleExpand(role.id)}
              className={`
                group glass-panel rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden
                ${expandedId === role.id ? 'border-[#1b17ff] bg-[#0a1128]' : 'border-white/5 hover:border-[#1b17ff]/50'}
              `}
            >
              {/* Card Summary (Always Visible) */}
              <div className="p-8 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                <div className="flex gap-6 items-center">
                  {/* Icon Box */}
                  <div className={`
                    w-14 h-14 rounded-xl flex items-center justify-center transition-colors
                    ${expandedId === role.id ? 'bg-[#1b17ff] text-white' : 'bg-[#1b17ff]/10 text-[#1b17ff]'}
                  `}>
                    {React.cloneElement(role.icon as React.ReactElement, { size: 28 })}
                  </div>
                  
                  {/* Title & Short Desc */}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-white">{role.title}</h3>
                      <span className="text-[10px] font-mono uppercase tracking-widest border border-white/10 px-2 py-0.5 rounded text-gray-400">
                        {role.division}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm font-light hidden md:block">{role.shortDesc}</p>
                  </div>
                </div>

                {/* Arrow Indicator */}
                <div className={`transform transition-transform duration-300 ${expandedId === role.id ? 'rotate-180' : ''}`}>
                  <ChevronDown className="text-gray-500 group-hover:text-[#1b17ff]" />
                </div>
              </div>

              {/* Mobile Short Desc (Visible only on small screens) */}
              <div className="px-8 pb-6 md:hidden text-sm text-gray-400 font-light border-b border-white/5">
                {role.shortDesc}
              </div>

              {/* Expanded Details (Animate Height) */}
              <AnimatePresence>
                {expandedId === role.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-8 pb-8 pt-4 border-t border-white/5 grid md:grid-cols-2 gap-12">
                      
                      {/* Left Column: Responsibilities */}
                      <div>
                        <h4 className="text-[#1b17ff] font-mono text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Terminal size={14} /> The Mission
                        </h4>
                        <ul className="space-y-3">
                          {role.details.responsibilities.map((item, i) => (
                            <li key={i} className="text-gray-300 text-sm leading-relaxed flex items-start gap-3">
                              <span className="text-[#1b17ff] mt-1.5">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right Column: Requirements & Apply */}
                      <div>
                        <h4 className="text-[#1b17ff] font-mono text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Users size={14} /> The Profile
                        </h4>
                        <ul className="space-y-3 mb-8">
                          {role.details.requirements.map((item, i) => (
                            <li key={i} className="text-gray-300 text-sm leading-relaxed flex items-start gap-3">
                              <span className="text-[#1b17ff] mt-1.5">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>

                        <Link 
                          href="https://forms.gle/hLKy96cNe7e5atUDA" 
                          target="_blank"
                          className="w-full py-4 bg-[#1b17ff] text-white font-bold rounded-lg hover:bg-[#1b17ff]/90 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(27,23,255,0.3)]"
                        >
                          APPLY FOR THIS ROLE <ArrowUpRight size={16} />
                        </Link>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* GENERAL POOL CTA */}
      <FadeIn delay={0.6} className="mt-20">
        <div className="glass-panel p-12 rounded-3xl text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#1b17ff] to-transparent" />
          <h2 className="text-3xl font-bold mb-4">Don't fit a label?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            We value hunger over resumes. If you are obsessed with markets but don't fit the boxes above, 
            apply to the General Pool. We carve roles for the right people.
          </p>
          <Link 
            href="https://forms.gle/hLKy96cNe7e5atUDA" 
            target="_blank"
            className="inline-flex px-8 py-4 border border-[#1b17ff] text-[#1b17ff] hover:bg-[#1b17ff] hover:text-white transition-all rounded-lg font-bold"
          >
            Apply to General Pool
          </Link>
        </div>
      </FadeIn>

    </div>
  );
}