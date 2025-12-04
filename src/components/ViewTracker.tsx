"use client";

import { useEffect, useState, useRef } from "react";
import { Eye } from "lucide-react";

interface ViewTrackerProps {
  slug: string;
}

export function ViewTracker({ slug }: ViewTrackerProps) {
  const [views, setViews] = useState<number | null>(null);
  
  // 1. The Safety Lock
  // usage of useRef persists values between renders without triggering a re-render
  const hasFetched = useRef(false);

  useEffect(() => {
    // 2. The Guard Clause
    // If we have already fetched, STOP immediately.
    if (hasFetched.current) return;

    // 3. Lock it down
    hasFetched.current = true;

    const trackView = async () => {
      try {
        const res = await fetch("/api/views", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug }),
        });

        if (res.ok) {
          const data = await res.json();
          setViews(data.views);
        }
      } catch (error) {
        console.error("Tracking error:", error);
      }
    };

    trackView();
    
  }, [slug]); // Dependencies look correct, but useRef makes it double-safe

  if (views === null) return <div className="h-4 w-8 bg-white/5 rounded animate-pulse mt-4" />;

  return (
    <div className="flex justify-center items-center gap-2 mt-4 text-xs font-mono text-gray-500">
      <Eye size={14} className="text-[#1b17ff]" />
      <span>{views.toLocaleString()} views</span>
    </div>
  );
}