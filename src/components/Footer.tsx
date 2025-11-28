"use client";

import { Linkedin, Github, Twitter, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-2">Prism Lake</h3>
            <p className="text-sm text-gray-400">
              Malaysia&apos;s first student-founded prop trading firm.
            </p>
            <div className="flex gap-4 mt-4">
              <SocialIcon icon={<Linkedin size={20} />} href="https://www.linkedin.com/company/prism-lake" target="_blank" rel="noopener noreferrer" />
              <SocialIcon icon={<Github size={20} />} href="#" target="_blank" rel="noopener noreferrer" />
              <SocialIcon icon={<Twitter size={20} />} href="#" target="_blank" rel="noopener noreferrer" />
              <SocialIcon icon={<Mail size={20} />} href="mailto:contact@prismlake.com" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/#track-record" className="hover:text-[#1b17ff] transition-colors">Track Record</Link></li>
              <li><Link href="/research" className="hover:text-[#1b17ff] transition-colors">Research</Link></li>
              <li><Link href="/careers" className="hover:text-[#1b17ff] transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-[#1b17ff] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#1b17ff] transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Prism Lake. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ 
  icon, 
  href, 
  target, 
  rel 
}: { 
  icon: React.ReactNode; 
  href: string;
  target?: string;
  rel?: string;
}) {
  return (
    <a 
      href={href} 
      target={target}
      rel={rel}
      className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[#1b17ff]/20 flex items-center justify-center transition-all hover:scale-110"
    >
      {icon}
    </a>
  );
}