"use client"; // Must be client-side for charts

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Dummy Data - REPLACE WITH YOUR BACKTEST EXPORT
const data = [
  { month: 'Jan', prism: 0, spx: 0 },
  { month: 'Feb', prism: 5.2, spx: 2.1 },
  { month: 'Mar', prism: 8.4, spx: 3.5 },
  { month: 'Apr', prism: 12.1, spx: 4.2 },
  { month: 'May', prism: 11.8, spx: 3.8 },
  { month: 'Jun', prism: 18.5, spx: 5.1 },
  { month: 'Jul', prism: 24.2, spx: 6.5 },
  { month: 'Aug', prism: 29.8, spx: 7.2 },
  { month: 'Sep', prism: 28.5, spx: 6.8 }, // Drawdown example
  { month: 'Oct', prism: 34.2, spx: 8.1 },
  { month: 'Nov', prism: 41.5, spx: 9.4 },
  { month: 'Dec', prism: 52.3, spx: 10.2 }, // Alpha gap
];

export function TrackRecordSection() {
  return (
    <section className="py-24 bg-[#050a1f] border-y border-[#1b17ff]/10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-12 items-center">
        
        {/* Left: The Narrative */}
        <div className="md:w-1/3">
          <div className="mb-2 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
            </span>
            LIVE SYSTEM PERFORMANCE
          </div>
          <h2 className="text-3xl font-bold font-sans mb-4">
            We Don&apos;t Guess.<br/>We <span className="text-[#1b17ff]">Backtest.</span>
          </h2>
          <p className="text-gray-400 mb-6 leading-relaxed">
            Our strategies are stress-tested against 10 years of historical data. 
            We focus on <strong>Risk-Adjusted Returns (Sharpe)</strong>, not just total profit.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-panel p-4 rounded-lg">
              <div className="text-gray-500 text-xs font-mono mb-1">TARGET CAGR</div>
              <div className="text-2xl font-bold text-white">20-30%</div>
            </div>
            <div className="glass-panel p-4 rounded-lg">
              <div className="text-gray-500 text-xs font-mono mb-1">SHARPE RATIO</div>
              <div className="text-2xl font-bold text-[#1b17ff]">2.45</div>
            </div>
          </div>
        </div>

        {/* Right: The Chart */}
        <div className="md:w-2/3 w-full h-[400px] glass-panel p-6 rounded-2xl relative">
          <h3 className="text-xs font-mono text-gray-500 mb-4 ml-2">CUMULATIVE RETURN (YTD) VS BENCHMARK</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorPrism" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1b17ff" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#1b17ff" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e3a8a" opacity={0.1} />
              <XAxis dataKey="month" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0a1128', borderColor: '#1b17ff', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area 
                type="monotone" 
                dataKey="spx" 
                stroke="#64748b" 
                fill="transparent" 
                strokeWidth={2}
                strokeDasharray="5 5" 
                name="S&P 500"
              />
              <Area 
                type="monotone" 
                dataKey="prism" 
                stroke="#1b17ff" 
                fillOpacity={1} 
                fill="url(#colorPrism)" 
                strokeWidth={3}
                name="Prism Lake"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

      </div>
    </section>
  );
}