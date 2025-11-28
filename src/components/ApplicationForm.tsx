"use client";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { UploadCloud, ArrowRight, Check, AlertCircle, FileText, Loader2, Info } from "lucide-react";
import { useState} from "react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  university: string;
  course: string;
  year: string;
  transport: string;
  club: string;
  role: string;
  linkedin: string;
  portfolio: string;
  essay: string;
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

  // WATCHERS: Real-time tracking
  const resumeFile = watch("resume");
  const essayContent = watch("essay", ""); // Default to empty string

  // LOGIC: Word Count Calculator
  // Splits by whitespace and filters out empty strings to prevent double counting spaces
  const wordCount = essayContent.trim().length === 0 
    ? 0 
    : essayContent.trim().split(/\s+/).filter(Boolean).length;
    
  const isOverLimit = wordCount > 500;

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'resume') formData.append(key, value[0]);
      else formData.append(key, value as string);
    });

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Transmission failed");

      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      
    } catch (error) {
      console.error(error);
      alert("Error submitting application. Please try again.");
    }
  };

  if (isSuccess) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-panel p-12 rounded-2xl text-center max-w-2xl mx-auto border-[#1b17ff]/30">
        <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
          <Check size={40} />
        </div>
        <h3 className="text-3xl font-bold text-white mb-4">Transmission Received.</h3>
        <p className="text-gray-400 text-lg leading-relaxed mb-8">
          Your profile is now in our system. <br/>
          If you match the Founding Cohort profile, expect a ping via WhatsApp or Email within 48 hours.
        </p>
        <button onClick={() => window.location.href = '/'} className="px-8 py-3 bg-[#0a1128] border border-white/10 rounded-lg text-white hover:border-[#1b17ff] transition-all font-mono text-sm">
          RETURN TO BASE
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12 max-w-3xl mx-auto glass-panel p-8 md:p-12 rounded-2xl relative overflow-hidden">
      
      {/* Decorative Top Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#1b17ff] to-transparent" />

      {/* SECTION 1: IDENTITY */}
      <div className="space-y-6">
        <h3 className="flex items-center gap-2 text-[#1b17ff] font-mono text-xs uppercase tracking-widest mb-6 border-b border-white/5 pb-2">
          <span className="w-2 h-2 bg-[#1b17ff] rounded-sm"></span> 
          01 // Identity Protocol
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputGroup label="Full Name" error={errors.name}>
            <input {...register("name", { required: "Name is required" })} className="prism-input" placeholder="e.g. Darrance Beh" />
          </InputGroup>
          
          <InputGroup label="Personal Email" error={errors.email}>
            <input {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })} className="prism-input" placeholder="e.g. darrance@gmail.com" />
          </InputGroup>

          <InputGroup label="Contact Number (WhatsApp)" error={errors.phone}>
            <div className="relative">
              <input 
                {...register("phone", { 
                  required: "Number is required",
                  pattern: {
                    // Allows: +60 12-345 6789, 0123456789, 6012-345-6789
                    value: /^[+]?[\d\s-]{10,15}$/, 
                    message: "Invalid format. Use: +60 12-345 6789"
                  }
                })} 
                // UX Tweak: Block non-numeric keys immediately
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(/[^0-9+\-\s]/g, '');
                }}
                className={`prism-input ${errors.phone ? 'border-red-500 focus:border-red-500' : ''}`}
                placeholder="+60 12-345 6789" 
                type="tel" // Triggers numeric keypad on mobile
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-500 font-mono pointer-events-none">
                MSG ONLY
              </span>
            </div>
          </InputGroup>

          <InputGroup label="LinkedIn URL" error={errors.linkedin}>
            <input {...register("linkedin", { required: "LinkedIn is required" })} className="prism-input" placeholder="https://linkedin.com/in/..." />
          </InputGroup>
        </div>
      </div>

      {/* SECTION 2: BACKGROUND */}
      <div className="space-y-6">
        <h3 className="flex items-center gap-2 text-[#1b17ff] font-mono text-xs uppercase tracking-widest mb-6 border-b border-white/5 pb-2">
          <span className="w-2 h-2 bg-[#1b17ff] rounded-sm"></span> 
          02 // Academic & Background
        </h3>
        
        <InputGroup label="Current University / Employer" error={errors.university}>
          <input {...register("university", { required: "Required" })} className="prism-input" placeholder="e.g. Sunway University / Working at Google" />
        </InputGroup>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputGroup label="Course of Study" error={errors.course}>
            <input {...register("course", { required: "Required" })} className="prism-input" placeholder="e.g. BSc (Hons) Computer Science" />
          </InputGroup>
          
          <InputGroup label="Year of Study" error={errors.year}>
            <input {...register("year", { required: "Required" })} className="prism-input" placeholder="e.g. Year 3 Semester 1" />
          </InputGroup>
        </div>

        <InputGroup label="Investment Club / Society Affiliation" error={errors.club}>
          <input {...register("club")} className="prism-input" placeholder="e.g. Sunway Business Investment Society - Vice President (Leave blank if N/A)" />
        </InputGroup>
      </div>

      {/* SECTION 3: LOGISTICS */}
      <div className="space-y-6">
        <h3 className="flex items-center gap-2 text-[#1b17ff] font-mono text-xs uppercase tracking-widest mb-6 border-b border-white/5 pb-2">
          <span className="w-2 h-2 bg-[#1b17ff] rounded-sm"></span> 
          03 // Feasibility Check
        </h3>
        
        <InputGroup label="Transport to Sunway / KL" error={errors.transport}>
          <div className="space-y-3">
             <select {...register("transport", { required: "Please select an option" })} className="prism-input appearance-none cursor-pointer">
              <option value="">Select status...</option>
              <option value="No Challenge">No Challenge (I am based in Sunway/KL/Subang)</option>
              <option value="Minor Challenge">Minor Challenge (I live far but can travel)</option>
              <option value="Major Challenge">Major Challenge (I rely on public transport/Grab)</option>
              <option value="Remote Only">Remote Only (I am not in KL/Selangor)</option>
            </select>
            <div className="flex gap-2 items-start bg-[#1b17ff]/5 p-3 rounded border border-[#1b17ff]/10">
              <Info size={14} className="text-[#1b17ff] mt-0.5 shrink-0" />
              <p className="text-[10px] text-gray-400 leading-relaxed">
                This does NOT affect candidacy. We are primarily virtual, but physical meetups happen in Sunway/KL. This helps us plan logistics.
              </p>
            </div>
          </div>
        </InputGroup>
      </div>

      {/* SECTION 4: THE SCREENING */}
      <div className="space-y-6">
        <h3 className="flex items-center gap-2 text-[#1b17ff] font-mono text-xs uppercase tracking-widest mb-6 border-b border-white/5 pb-2">
          <span className="w-2 h-2 bg-[#1b17ff] rounded-sm"></span> 
          04 // The Screening Protocol
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputGroup label="Target Role" error={errors.role}>
            <select {...register("role", { required: "Role is required" })} className="prism-input appearance-none cursor-pointer">
              <option value="">Select vector...</option>
              <option value="quant">Quantitative Researcher (Alpha)</option>
              <option value="dev">Quant Developer (Alpha)</option>
              <option value="analyst">Investment Analyst (Alpha)</option>
              <option value="media">Media & Brand (Ops)</option>
              <option value="ops">Strategy & Ops (Ops)</option>
              <option value="ambassador">Campus Ambassador (Ops)</option>
              <option value="general">General Pool</option>
            </select>
          </InputGroup>

          <InputGroup label="GitHub / Portfolio Link" error={errors.portfolio}>
            <input {...register("portfolio")} className="prism-input" placeholder="Optional but recommended" />
          </InputGroup>
        </div>

        {/* --- MOVED: RESUME UPLOAD NOW COMES BEFORE ASSESSMENT --- */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-[#1b17ff] uppercase tracking-wider">Resume / CV (PDF)</label>
          <label className="prism-upload-zone relative block">
            <input 
              type="file" 
              accept=".pdf"
              {...register("resume", { required: "Resume is required" })} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            
            <div className="flex flex-col items-center justify-center gap-2">
              {resumeFile && resumeFile.length > 0 ? (
                <div className="flex items-center gap-3 text-white bg-[#1b17ff]/10 px-4 py-2 rounded-lg border border-[#1b17ff]/30">
                  <FileText size={20} className="text-[#1b17ff]" />
                  <span className="font-mono text-sm">{resumeFile[0].name}</span>
                  <Check size={16} className="text-green-400 ml-2" />
                </div>
              ) : (
                <>
                  <UploadCloud className="h-8 w-8 text-gray-500 group-hover:text-[#1b17ff] transition-colors" />
                  <p className="text-sm text-gray-400 group-hover:text-white transition-colors">
                    <span className="text-[#1b17ff] font-bold">Click to upload</span> PDF
                  </p>
                </>
              )}
            </div>
          </label>
          {errors.resume && <span className="text-red-500 text-xs flex items-center gap-1"><AlertCircle size={10} /> {errors.resume.message}</span>}
        </div>

        {/* --- ASSESSMENT --- */}
        <InputGroup label="The Assessment" error={errors.essay}>
          <div className="space-y-4">
            <div className="text-xs text-gray-400 font-mono bg-[#0a1128] border border-white/10 p-4 rounded-lg leading-relaxed">
              <strong className="text-white">Prompt:</strong> Produce a MAX 500-word response covering the following points: <br/>
              <ul className="list-disc pl-4 mt-2 space-y-1 text-gray-500">
                <li>What sparked your interest in Prism Lake?</li>
                <li>Support your role selection (e.g., using your experiences, passion, interest, etc...)</li>
                <li>What is one characteristic or skill that defines who you are?</li>
                <li>What do you expect to gain and contribute during your first 6 months at Prism Lake?</li>
                <li>Do you personally invest? If so, describe your strategy, markets, and time horizon.</li>
              </ul>
            </div>
            
            <div className="relative">
              <textarea 
                {...register("essay", { 
                  required: "This field is required", 
                  // WORD COUNT VALIDATION LOGIC
                  validate: (value) => {
                    const count = value.trim().split(/\s+/).filter(Boolean).length;
                    if (count > 500) return "Word limit exceeded (Max 500 words)";
                    if (count < 50) return "Response too short (Min 50 words)";
                    return true;
                  }
                })} 
                className={`prism-input min-h-[250px] resize-y ${isOverLimit ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Begin transmission..." 
              />
              
              {/* WORD COUNTER INDICATOR */}
              <div className={`absolute bottom-3 right-3 text-[10px] font-mono px-2 py-1 rounded bg-black/40 backdrop-blur-sm border transition-colors ${isOverLimit ? 'text-red-400 border-red-500/50' : 'text-gray-500 border-white/10'}`}>
                WORDS: <span className={isOverLimit ? "font-bold" : "text-white"}>{wordCount}</span> / 500
              </div>
            </div>
          </div>
        </InputGroup>

      </div>

      {/* SECTION 5: SUBMIT */}
      <div className="pt-6 border-t border-white/5">
        <button 
          disabled={isSubmitting || isOverLimit} // Prevent submit if over limit
          className="w-full py-5 bg-[#1b17ff] text-white font-bold rounded-lg hover:bg-[#1b17ff]/90 hover:shadow-[0_0_20px_rgba(27,23,255,0.4)] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" />
              <span className="font-mono tracking-widest">ENCRYPTING & SENDING...</span>
            </>
          ) : (
            <>
              <span className="font-mono tracking-widest">INITIATE APPLICATION</span> 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
        <p className="text-center text-[10px] text-gray-600 font-mono mt-4">
          By applying, you consent to our data processing for recruitment purposes.
        </p>
      </div>

    </form>
  );
}

// Helper UI Component
function InputGroup({ 
  label, 
  children, 
  error 
}: { 
  label: string; 
  children: React.ReactNode; 
  error?: { message?: string } 
}) {
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