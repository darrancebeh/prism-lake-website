import { ApplicationForm } from "@/components/ApplicationForm";
import { FadeIn } from "@/components/FadeIn";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function ApplyPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 max-w-4xl mx-auto">
      
      {/* Back Link */}
      <FadeIn delay={0}>
        <div className="mb-8">
          <Link href="/careers" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#1b17ff] transition-colors font-mono">
            <ChevronLeft size={16} /> ABORT / RETURN TO ROLES
          </Link>
        </div>
      </FadeIn>

      {/* Header */}
      <FadeIn delay={0.1} className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tighter">
          Cohort <span className="text-[#1b17ff]">Zero</span>.
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-lg">
          You are applying to be a Founding Partner. <br/>
          We don&apos;t care about your GPA. We care about your potential and fit.
        </p>
      </FadeIn>

      {/* The Form Component */}
      <FadeIn delay={0.2}>
        <ApplicationForm />
      </FadeIn>

    </div>
  );
}