"use client";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { UploadCloud, ArrowRight, Check, AlertCircle, FileText, Loader2 } from "lucide-react";
import { useState } from "react";

// Define the form data structure
type FormData = {
  name: string;
  email: string;
  role: string;
  linkedin: string;
  portfolio: string;
  why: string;
  resume: FileList;
};

export function ApplicationForm() {
  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors, isSubmitting } 
  } = useForm<FormData>();
  
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Watch the resume field to show file name after selection
  const resumeFile = watch("resume");

  // --- SUBMISSION HANDLER ---
  const onSubmit = async (data: FormData) => {
    // 1. Create FormData object (needed for file upload)
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("role", data.role);
    formData.append("linkedin", data.linkedin);
    formData.append("portfolio", data.portfolio || "");
    formData.append("why", data.why);
    formData.append("resume", data.resume[0]); // The file itself

    try {
      // 2. Send to our Next.js API Route
      const response = await fetch("/api/apply", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Transmission failed");

      // 3. Success State
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      
    } catch (error) {
      console.error(error);
      alert("Error submitting application. Please try again.");
    }
  };

  // --- SUCCESS STATE (The "Hired" Screen) ---
  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="glass-panel p-12 rounded-2xl text-center max-w-2xl mx-auto border-[#1b17ff]/30"
      >
        <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
          <Check size={40} />
        </div>
        <h3 className="text-3xl font-bold text-white mb-4">Transmission Received.</h3>
        <p className="text-gray-400 text-lg leading-relaxed mb-8">
          Your profile has been encrypted and sent to the Founding Partners. <br/>
          Our team is reviewing your application. If you match the profile, expect a ping within 48 hours.
        </p>
        <button 
          onClick={() => window.location.href = '/'} 
          className="px-8 py-3 bg-[#0a1128] border border-white/10 rounded-lg text-white hover:border-[#1b17ff] transition-all font-mono text-sm"
        >
          RETURN TO BASE
        </button>
      </motion.div>
    );
  }

  // --- FORM STATE ---
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-2xl mx-auto glass-panel p-8 md:p-12 rounded-2xl relative overflow-hidden">
      
      {/* Decorative Top Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#1b17ff] to-transparent" />

      {/* 1. Identity Protocol */}
      <div className="space-y-6">
        <h3 className="flex items-center gap-2 text-[#1b17ff] font-mono text-xs uppercase tracking-widest mb-6 border-b border-white/5 pb-2">
          <span className="w-2 h-2 bg-[#1b17ff] rounded-sm"></span> 
          01 // Identity Protocol
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputGroup label="Full Name" error={errors.name}>
            <input 
              {...register("name", { required: "Name is required" })} 
              className="prism-input" 
              placeholder="e.g. Satoshi Nakamoto" 
            />
          </InputGroup>
          
          <InputGroup label="University Email" error={errors.email}>
            <input 
              {...register("email", { 
                required: "Email is required",
                pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email format" }
              })} 
              className="prism-input" 
              placeholder="e.g. satoshi@sunway.edu.my" 
            />
          </InputGroup>
        </div>
      </div>

      {/* 2. Role Selection */}
      <div className="space-y-6">
        <h3 className="flex items-center gap-2 text-[#1b17ff] font-mono text-xs uppercase tracking-widest mb-6 border-b border-white/5 pb-2">
          <span className="w-2 h-2 bg-[#1b17ff] rounded-sm"></span>
          02 // Target Vector
        </h3>

        <InputGroup label="Select Role" error={errors.role}>
          <div className="relative">
            <select 
              {...register("role", { required: "Please select a role" })} 
              className="prism-input appearance-none cursor-pointer"
            >
              <option value="">Select a channel...</option>
              <option value="quant">Quantitative Researcher (Alpha)</option>
              <option value="dev">Quant Developer (Alpha)</option>
              <option value="analyst">Investment Analyst (Alpha)</option>
              <option value="media">Media & Brand (Ops)</option>
              <option value="ops">Strategy & Ops (Ops)</option>
              <option value="general">General Pool / Ambiguous</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
              <ArrowRight size={14} className="rotate-90" />
            </div>
          </div>
        </InputGroup>
      </div>

      {/* 3. Proof of Work */}
      <div className="space-y-6">
        <h3 className="flex items-center gap-2 text-[#1b17ff] font-mono text-xs uppercase tracking-widest mb-6 border-b border-white/5 pb-2">
          <span className="w-2 h-2 bg-[#1b17ff] rounded-sm"></span>
          03 // Proof of Work
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputGroup label="LinkedIn URL" error={errors.linkedin}>
            <input 
              {...register("linkedin", { required: "LinkedIn is required" })} 
              className="prism-input" 
              placeholder="https://linkedin.com/in/..." 
            />
          </InputGroup>
          <InputGroup label="GitHub / Portfolio" error={errors.portfolio}>
            <input 
              {...register("portfolio")} 
              className="prism-input" 
              placeholder="https://github.com/..." 
            />
          </InputGroup>
        </div>

        <InputGroup label="The 'Alpha' Question" error={errors.why}>
          <div className="relative">
            <textarea 
              {...register("why", { 
                required: "This field is required", 
                minLength: { value: 50, message: "Response too short (min 50 chars)" } 
              })} 
              className="prism-input min-h-[120px] resize-none" 
              placeholder="Tell us about a time you held a contrarian view (in life or markets) and were right. What was your logic?" 
            />
            <span className="absolute bottom-3 right-3 text-[10px] text-gray-600 font-mono">NO CHATGPT</span>
          </div>
        </InputGroup>

        {/* File Upload UI */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-[#1b17ff] uppercase tracking-wider">Resume / CV (PDF)</label>
          <label className="prism-upload-zone relative">
            <input 
              type="file" 
              accept=".pdf"
              {...register("resume", { required: "Resume is required" })} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            
            <div className="flex flex-col items-center justify-center gap-2">
              {resumeFile && resumeFile.length > 0 ? (
                // File Selected State
                <div className="flex items-center gap-3 text-white bg-[#1b17ff]/10 px-4 py-2 rounded-lg border border-[#1b17ff]/30">
                  <FileText size={20} className="text-[#1b17ff]" />
                  <span className="font-mono text-sm">{resumeFile[0].name}</span>
                  <Check size={16} className="text-green-400 ml-2" />
                </div>
              ) : (
                // Default State
                <>
                  <UploadCloud className="h-8 w-8 text-gray-500 group-hover:text-[#1b17ff] transition-colors" />
                  <p className="text-sm text-gray-400 group-hover:text-white transition-colors">
                    <span className="text-[#1b17ff] font-bold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-600">PDF up to 5MB</p>
                </>
              )}
            </div>
          </label>
          {errors.resume && <span className="text-red-500 text-xs flex items-center gap-1"><AlertCircle size={10} /> {errors.resume.message}</span>}
        </div>
      </div>

      {/* 4. Submit Action */}
      <button 
        disabled={isSubmitting}
        className="w-full py-5 bg-[#1b17ff] text-white font-bold rounded-lg hover:bg-[#1b17ff]/90 hover:shadow-[0_0_20px_rgba(27,23,255,0.4)] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" />
            <span className="font-mono tracking-widest">TRANSMITTING...</span>
          </>
        ) : (
          <>
            <span className="font-mono tracking-widest">INITIATE APPLICATION</span> 
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>

      <p className="text-center text-xs text-gray-600 font-mono mt-4">
        By initializing, you agree to our radical transparency policy.
      </p>

    </form>
  );
}

// Helper UI Component for Label + Error
function InputGroup({ label, children, error }: { label: string; children: React.ReactNode; error?: { message?: string } }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <label className="text-xs font-mono text-[#1b17ff] uppercase tracking-wider">{label}</label>
        {error && <span className="text-red-500 text-xs flex items-center gap-1 font-mono"><AlertCircle size={10} /> {error.message}</span>}
      </div>
      {children}
    </div>
  );
}