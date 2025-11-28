import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#020410] border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
      
      {/* Background large text watermark */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-[0.03]">
        <h1 className="text-[20vw] font-bold text-white leading-none tracking-tighter text-center whitespace-nowrap">
          PRISM LAKE
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          
          {/* Column 1: Identity */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-4 h-4 bg-[#1b17ff] rounded-sm" />
              <span className="font-bold text-xl tracking-tight text-white">PRISM LAKE</span>
            </div>
            <p className="text-gray-500 max-w-sm font-light leading-relaxed mb-8">
              Malaysia&apos;s first student-founded Quantitative Research Firm. 
              Bridging the gap between academic theory and market reality through 
              proprietary capital and radical transparency.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Linkedin size={20} />} href="https://www.linkedin.com/company/prism-lake" />
              <SocialIcon icon={<Github size={20} />} href="#" />
              <SocialIcon icon={<Twitter size={20} />} href="#" />
              <SocialIcon icon={<Mail size={20} />} href="mailto:contact@prismlake.com" />
            </div>
          </div>

          {/* Column 2: Sitemap */}
          <div>
            <h4 className="text-white font-bold mb-6 font-mono text-sm uppercase">Firm</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-mono">
              <li><Link href="/" className="hover:text-[#1b17ff] transition-colors">Mission</Link></li>
              <li><Link href="/research" className="hover:text-[#1b17ff] transition-colors">Intelligence</Link></li>
              <li><Link href="/careers" className="hover:text-[#1b17ff] transition-colors">Careers</Link></li>
              <li><Link href="https://forms.gle/hLKy96cNe7e5atUDA" target="_blank" className="hover:text-[#1b17ff] transition-colors">Apply</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h4 className="text-white font-bold mb-6 font-mono text-sm uppercase">Legal</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-mono">
              <li className="hover:text-white cursor-not-allowed">Terms of Service</li>
              <li className="hover:text-white cursor-not-allowed">Privacy Policy</li>
              <li className="hover:text-white cursor-not-allowed">Risk Disclosure</li>
            </ul>
          </div>
        </div>
 
        {/* Disclaimer / Compliance */}
        <div className="border-t border-white/5 pt-10 text-xs text-gray-600 font-mono leading-relaxed text-justify">
          <p className="mb-4">
            <strong>DISCLAIMER:</strong> Prism Lake is a proprietary trading and education initiative. We are NOT a licensed fund manager, investment advisor, or broker-dealer. 
            We do not manage external client capital. All content provided is for educational and research purposes only and does not constitute financial advice.
          </p>
          <p>
            &copy; {new Date().getFullYear()} Prism Lake Research. All Rights Reserved. Built in Kuala Lumpur.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode, href: string }) {
  return (
    <Link 
      href={href} 
      target="_blank"               // Forces new tab
      rel="noopener noreferrer"     // Critical security for target="_blank"
      className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-gray-400 hover:text-white hover:border-[#1b17ff] hover:bg-[#1b17ff]/10 transition-all duration-300"
    >
      {icon}
    </Link>
  );
}